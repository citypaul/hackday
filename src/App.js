import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PercentageBar from './percentage-bar';
import { merge, reduce } from 'lodash';

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
            }
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
            const pressure = this.calculatePressure(stateUpdatedWithActionValue, team);

            let homePressure, awayPressure;

            if (team === 'home') {
                homePressure = pressure;
                awayPressure = this.calculatePressure(stateUpdatedWithActionValue, 'away');
            } else {
                homePressure = this.calculatePressure(stateUpdatedWithActionValue, 'home');
                awayPressure = pressure;
            }
            console.log(homePressure, awayPressure);

            let totalPressure = homePressure + awayPressure;
            let homePerc = (totalPressure === 0) ? this.state.totals.home : 100 * homePressure/totalPressure;
            let awayPerc = (totalPressure === 0) ? this.state.totals.away : 100 * awayPressure/totalPressure;
            const updatedTeamPressure = {  points: { 'home' : homePressure, 'away': awayPressure}, totals: { 'home' : homePerc, 'away': awayPerc} };
            const newState = merge({}, this.state, updatedTeamActionValue, updatedTeamPressure);

            this.setState(newState);
        }
    },

    changeWeightValue(action, value) {
        const currentValue = this.state.weights[action];
        const newValue = currentValue + value;

        if (newValue >= 0) {
            let updatedWeightValue = { weights: {[action]: newValue }};
            let newState = merge({}, this.state, updatedWeightValue);
            this.setState(newState);
            this.calculatePressure(newState);
        }
    },

    calculatePressure(updatedState, team) {
        let weights = this.state.weights;
        return reduce(updatedState[team], function(result, v, k) {
            console.log(v + ' multiplied by ' + weights[k])
            return result + v * weights[k];
        }, 0);
    },

    generateTableRow(action) {
        return (
            <tr>
                <td>{action.replace(/^[a-z]|[A-Z]/g, function(v, i) { return i === 0 ? v.toUpperCase() : " " + v.toLowerCase(); })}</td>
                <td>
                    {this.state.home[action]}
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'home', 1)}>UP</button>
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'home', -1)}>Down</button>
                </td>
                <td>
                    {this.state.away[action]}
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'away', 1)}>UP</button>
                    <button type="button" onClick={this.changeActionValueForTeam.bind(this, action, 'away', -1)}>Down</button>
                </td>
                <td>
                    {this.state.weights[action]}
                    <button type="button" onClick={this.changeWeightValue.bind(this, action, 1)}>UP</button>
                    <button type="button" onClick={this.changeWeightValue.bind(this, action, -1)}>Down</button>
                </td>
            </tr>
        );
    },

    generateTableBody() {
        return (
            <tbody>
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
                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Home</th>
                            <th>Away</th>
                            <th>Weights</th>
                        </tr>
                    </thead>
                    {this.generateTableBody()}
                </table>
                <div>
                    <PercentageBar leftLabel="Home: " rightLabel="Away: " heading={"Pressure"} percentage={true} leftValue={this.state.totals.home} rightValue= {this.state.totals.away} />
                </div>
            </div>
        );
    }
});

export default App;
