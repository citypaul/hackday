import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PercentageBar from './percentage-bar';
import { merge, reduce } from 'lodash';

const App = React.createClass({
    getInitialState() {
        return {
            home: {
                goals: 0,
                possession: 0/*,
                shotsOnTarget: 0,
                shotsOffTarget: 0,
                fouls: 0,
                redCards: 0,
                penalties: 0,
                corners: 0,
                crosses: 0,
                passCompletions: 0,
                freeKicks: 0*/
            },
            away: {
                goals: 0,
                possession: 0
                /*,
                shotsOnTarget: 0,
                shotsOffTarget: 0,
                fouls: 0,
                redCards: 0,
                penalties: 0,
                corners: 0,
                crosses: 0,
                passCompletions: 0,
                freeKicks: 0*/
            },
            weights: {
                goals: 10,
                possession: 5/*,
                shotsOnTarget: 1,
                shotsOffTarget: 1,
                fouls: 2,
                redCards: 3,
                penalties: 4,
                corners: 3,
                crosses: 2,
                passCompletions: 1,
                freeKicks: 1*/
            },
            points: {
                home: 0,
                away: 0
            },
            totals: {
                home: 0,
                away: 0
            }
        };
    },

    changeActionValueForTeam(action, team, value) {
        const currentValue = this.state[team][action];
        const newValue = currentValue + value;

        if (newValue >= 0) {
            const updatedTeamActionValue = { [team]: { [action]: newValue }};
            const pressure = this.calculatePressure(updatedTeamActionValue, team);

            let homePressure, awayPressure;
            console.log(team==='home')
            if (team === 'home') {
                console.log('home pressure' + pressure + 'away pressure' + this.state.totals['away'])
                homePressure = pressure;
                awayPressure = this.state.points['away'];

            } else {
                homePressure = this.state.points['home'];
                awayPressure = pressure;
            }
            console.log(homePressure, awayPressure)
            let totalPressure = homePressure + awayPressure;
            let homePerc = 100 * homePressure/totalPressure;
            let awayPerc = 100 * awayPressure/totalPressure;
            let updatedTeamPressure = {  points: { 'home' : homePressure, 'away': awayPressure}, totals: { 'home' : homePerc, 'away': awayPerc} };
            const newState = merge({}, this.state, updatedTeamActionValue, updatedTeamPressure);

            console.log(newState)
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

    calculatePressure(actionValueObject, team) {
        let weights = this.state.weights;

        return reduce(actionValueObject[team], function(result, v, k) {
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
                {this.generateTableRow('possession')}
                {this.generateTableRow('fouls')}
                {this.generateTableRow('redCards')}
                {this.generateTableRow('penalties')}
                {this.generateTableRow('crosses')}
                {this.generateTableRow('passCompletions')}
                {this.generateTableRow('freeKicks')}
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
