/* eslint-disable */
import React, { Component } from 'react';
import PercentageBar from './percentage-bar';
//var request = require('request');
var $ = require('jquery');
import { merge, reduce, map, pick } from 'lodash';

const App = React.createClass({
    getInitialTeamModel() {
        return {
            goals: 0,
            possession: 50,
            shotsOnTarget: 0,
            shotsBlocked: 0,
            shotsOffTarget: 0,
            fouls: 0,
            yellowCards: 0,
            redCards: 0,
            penalties: 0,
            corners: 0,
            crosses: 0,
            turnOvers: 0,
            //passCompletions: 0,
            nonAttackingFreekicks: 0,
            attackingFreekicks: 0,
            attackingPasses: 0,
            bigChances: 0,
            divingSaves: 0
        }
    },

    getInitialState() {
        return {
            home: this.getInitialTeamModel(),
            away: this.getInitialTeamModel(),
            weights: {
                goals: 10,
                possession: 1,
                shotsOnTarget: 4,
                shotsBlocked: 1,
                shotsOffTarget: 2,
                fouls: -1, // should we get rid of those? we already have freeKicks
                redCards: -10, // yellow card?
                yellowCards: -5,
                penalties: 3,
                corners: 2,
                crosses: 1,
                turnOvers: -5,
                attackingFreekicks: 2,
                //passCompletions: 1, percentage, like possession, but cumulative
                nonAttackingFreekicks: 1,
                attackingPasses: 1,
                bigChances: 10,
                divingSaves: -4
            },
            points: {
                home: 0,
                away: 0
            },
            totals: {
                home: 50,
                away: 50
            },
            scenarioName: "unset"
        };
    },

    getAnotherTeam(teamName) {
        return (teamName === 'home') ? 'away' : 'home';
    },

    changeActionValueForTeam(action, team, value) {
        const currentValue = this.state[team][action];
        const newValue = currentValue + value;

        if (newValue >= 0) {
            let updatedTeamActionValue = { [team]: { [action]: newValue }};
            if (action === 'possession') {
                let anotherTeamValue = 100 - newValue;
                updatedTeamActionValue = { [team]: { [action]: newValue }, [this.getAnotherTeam(team)]: { [action]: anotherTeamValue } };
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

            const updatedTeamPressure =  this.updatedPressureObjForBothTeams(homePressure, awayPressure);
            const newState = merge({}, this.state, updatedTeamActionValue, updatedTeamPressure);

            this.setState(newState);
        }
    },

    changeActionValuesForBothTeams(updatedState, action) {
        let weights = updatedState.weights;
        let homeValue = updatedState.home[action] * weights[action]
        let awayValue = updatedState.away[action] * weights[action]
        let updatedTeamActionValue = { 'home': { [action]: homeValue }, ['away']: { [action]: awayValue } };
        return updatedTeamActionValue;
    },

    changeWeightValue(action, value) {
        const currentValue = this.state.weights[action];
        const newValue = currentValue + value;

        if (newValue >= 0) {
            let updatedWeightValue = { weights: {[action]: newValue }};
            let updatedState = merge({}, this.state, updatedWeightValue);

            let homePressure = this.calculatePressureForBothTeams(updatedState)[0];
            let awayPressure = this.calculatePressureForBothTeams(updatedState)[1];
            console.log(homePressure, awayPressure)
            const updatedTeamPressure = this.updatedPressureObjForBothTeams(homePressure, awayPressure);

            const newState = merge({}, this.state, updatedState, updatedTeamPressure);
            this.setState(newState);
        }
    },

    calculatePressureForTeam(updatedState, team) {
        let weights = updatedState.weights;
        return reduce(updatedState[team], function(result, v, k) {
            return result + v * weights[k];
        }, 0);
    },

    calculatePressureForBothTeams(updatedState) {
        let teams = pick(updatedState, ['home', 'away']);
        let that = this;

        return map(teams, function(v, k) {
            return that.calculatePressureForTeam(updatedState, k);
        });

    },

    updatedPressureObjForBothTeams(homePressure, awayPressure) {
        let totalPressure = homePressure + awayPressure;
        let homePerc = (totalPressure === 0) ? this.state.totals.home : 100 * homePressure/totalPressure;
        let awayPerc = (totalPressure === 0) ? this.state.totals.away : 100 * awayPressure/totalPressure;
        console.log(homePressure, awayPressure);
        return {
              points: { 'home' : homePressure, 'away': awayPressure},
              totals: { 'home' : homePerc, 'away': awayPerc}
        };
    },

    generateTableRow(action) {
        return (
            <tr>
                <td className="gs-o-table__cell gs-o-table__cell--left">{action.replace(/^[a-z]|[A-Z]/g, function(v, i) { return i === 0 ? v.toUpperCase() : " " + v.toLowerCase(); })}</td>
                <td className="gs-o-table__cell">
                    {this.state.home[action]}
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'home', 1)}>UP</button>
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'home', -1)}>Down</button>
                </td>
                <td className="gs-o-table__cell">
                    {this.state.away[action]}
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'away', 1)}>UP</button>
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'away', -1)}>Down</button>
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

    saveCurrentStateToFile() {
        var path = '/scenarios/' + this.state.scenarioName;
        console.log('http://localhost:3001' + path)
        $.ajax({
            url: 'http://localhost:3001' + path,
            type: 'POST',
            data: JSON.stringify(this.state),
            contentType: 'application/json',
            error: function(xhr, status, err) {
                console.log(status, err.toString());
            }.bind(this)

    });
    },

    setScenarioName(event) {
        let newState = merge({}, this.state, {scenarioName: event.target.value});
        this.setState(newState);
    },

    render() {
        return (
            <div>
                <div>
                    <PercentageBar leftLabel="Home: " rightLabel="Away: " heading={"Pressure"} percentage={true} leftValue={this.state.totals.home} rightValue= {this.state.totals.away} />

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
                    <PercentageBar leftLabel="Home: " rightLabel="Away: " heading={"Pressure"} percentage={true} leftValue={this.state.totals.home} rightValue= {this.state.totals.away} />
                </div>
                <div>
                    <button type="button" onClick={this.saveCurrentStateToFile}>SAVE</button>
                    <label>Scenario:</label>
                    <input type="text" onBlur={this.setScenarioName}/>
                </div>
            </div>
        );
    }
});

export default App;
