import React from 'react';
import PercentageBar from './percentage-bar';
import { merge, reduce, map, pick } from 'lodash';

const SnapshotGenerator = React.createClass({
    getInitialState() {
        return this.props.snapshot;
    },

    componentWillReceiveProps (props) {
        this.setState(props.snapshot);
    },

    getAnotherTeam(teamName) {
        return (teamName === 'home') ? 'away' : 'home';
    },

    changeActionValueForTeam(action, team, value) {
        const currentValue = this.state[team][action];
        const newValue = currentValue + value;

        if (newValue >= 0) {
            let updatedTeamActionValue = {[team]: {[action]: newValue}};
            if (action === 'possession') {
                let anotherTeamValue = 100 - newValue;
                updatedTeamActionValue = {
                    [team]: {[action]: newValue},
                    [this.getAnotherTeam(team)]: {[action]: anotherTeamValue}
                };
            }

            const stateUpdatedWithActionValue = merge({}, this.state, updatedTeamActionValue);
            const pressure = this.calculatePressureForTeam(stateUpdatedWithActionValue, team);

            let homePressure, awayPressure;

            if (team === 'home') {
                homePressure = pressure;
                awayPressure = this.calculatePressureForTeam(stateUpdatedWithActionValue, 'away');
            } else {
                homePressure = this.calculatePressureForTeam(stateUpdatedWithActionValue, 'home');
                awayPressure = pressure;
            }

            const updatedTeamPressure = this.updatedPressureObjForBothTeams(homePressure, awayPressure);
            const newState = merge({}, this.state, updatedTeamActionValue, updatedTeamPressure);

            this.setState(newState);
            this.props.onUpdate(newState);
        }
    },

    changeActionValuesForBothTeams(updatedState, action) {
        let weights = updatedState.weights;
        let homeValue = updatedState.home[action] * weights[action]
        let awayValue = updatedState.away[action] * weights[action]
        let updatedTeamActionValue = {'home': {[action]: homeValue}, ['away']: {[action]: awayValue}};
        return updatedTeamActionValue;
    },

    changeWeightValue(action, value) {
        const currentValue = this.state.weights[action];
        const newValue = currentValue + value;

        let updatedWeightValue = {weights: {[action]: newValue}};
        let updatedState = merge({}, this.state, updatedWeightValue);

        let homePressure = this.calculatePressureForBothTeams(updatedState)[0];
        let awayPressure = this.calculatePressureForBothTeams(updatedState)[1];
        console.log(homePressure, awayPressure)
        const updatedTeamPressure = this.updatedPressureObjForBothTeams(homePressure, awayPressure);

        const newState = merge({}, this.state, updatedState, updatedTeamPressure);
        this.setState(newState);
        this.props.onUpdate(newState);

    },

    calculatePressureForTeam(updatedState, team) {
        let weights = updatedState.weights;
        return reduce(updatedState[team], function (result, v, k) {
            return result + v * weights[k];
        }, 0);
    },

    calculatePressureForBothTeams(updatedState) {
        let teams = pick(updatedState, ['home', 'away']);
        let that = this;

        return map(teams, function (v, k) {
            return that.calculatePressureForTeam(updatedState, k);
        });

    },

    updatedPressureObjForBothTeams(homePressure, awayPressure) {
        let totalPressure = homePressure + awayPressure;
        let homePerc = (totalPressure === 0) ? this.state.totals.home : 100 * homePressure / totalPressure;
        let awayPerc = (totalPressure === 0) ? this.state.totals.away : 100 * awayPressure / totalPressure;
        console.log(homePressure, awayPressure);
        return {
            points: {'home': homePressure, 'away': awayPressure},
            totals: {'home': homePerc, 'away': awayPerc}
        };
    },

    generateTableRow(action) {
        return (
            <tr>
                <td className="gs-o-table__cell gs-o-table__cell--left">{action.replace(/^[a-z]|[A-Z]/g, function (v, i) {
                    return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
                })}</td>
                <td className="gs-o-table__cell">
                    {this.state.home[action]}
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'home', 1)}>UP
                    </button>
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'home', -1)}>Down
                    </button>
                </td>
                <td className="gs-o-table__cell">
                    {this.state.away[action]}
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'away', 1)}>UP
                    </button>
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'away', -1)}>Down
                    </button>
                </td>
                <td className="gs-o-table__cell">
                    {this.state.weights[action]}
                    <button type="button" onClick={this.changeWeightValue.bind(this, action, 1)}>UP</button>
                    <button type="button" onClick={this.changeWeightValue.bind(this, action, -1)}>Down</button>
                </td>
            </tr>
        );
    },

    generateTableBody() {
        return (
            <tbody className="gel-long-primer">
            {this.generateTableRow('goals')}
            {this.generateTableRow('shotsOnTarget')}
            {this.generateTableRow('shotsOffTarget')}
            {this.generateTableRow('shotsBlocked')}
            {this.generateTableRow('possession')}
            {this.generateTableRow('fouls')}
            {this.generateTableRow('redCards')}
            {this.generateTableRow('yellowCards')}
            {this.generateTableRow('penalties')}
            {this.generateTableRow('crosses')}
            {this.generateTableRow('nonAttackingFreekicks')}
            {this.generateTableRow('attackingFreekicks')}
            {this.generateTableRow('turnOvers')}
            {this.generateTableRow('attackingPasses')}
            {this.generateTableRow('bigChances')}
            {this.generateTableRow('divingSaves')}
            </tbody>
        );
    },

    render() {
        return (
            <div>
                <div>
                    <PercentageBar leftLabel="Home: " rightLabel="Away: " heading={"Pressure"} percentage={true}
                                   leftValue={this.state.totals.home} rightValue={this.state.totals.away}/>

                    <div className="flash-text flash"><p className="gel-pica">GOAL! Agüero 32"</p></div>
                </div>
                <table className="gs-o-table">
                    <thead className="gs-o-table__head gel-brevier">
                    <tr>
                        <th className="gs-o-table__cell gs-o-table__cell--left">Event</th>
                        <th className="gs-o-table__cell">Home</th>
                        <th className="gs-o-table__cell">Away</th>
                        <th className="gs-o-table__cell">Weights</th>
                    </tr>
                    </thead>
                    {this.generateTableBody()}
                </table>
                <div>
                    <PercentageBar leftLabel="Home: " rightLabel="Away: " heading={"Pressure"} percentage={true}
                                   leftValue={this.state.totals.home} rightValue={this.state.totals.away}/>
                </div>
            </div>
        );
    }
});

export default SnapshotGenerator;
