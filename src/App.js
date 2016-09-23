import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PercentageBar from './percentage-bar';
import { merge, capitalize } from 'lodash';

const App = React.createClass({
    getInitialState() {
        return {
            home: {
                goals: 0,
                possession: 50,
                shotsOnTarget: 0,
                shotsOffTarget: 0,
                fouls: 0,
                redCards: 0,
                penalties: 0,
                corners: 0,
                crosses: 0,
                passCompletions: 0,
                freeKicks: 0
            },
            away: {
                goals: 0,
                possession: 50,
                shotsOnTarget: 0,
                shotsOffTarget: 0,
                fouls: 0,
                redCards: 0,
                penalties: 0,
                corners: 0,
                crosses: 0,
                passCompletions: 0,
                freeKicks: 0
            },
            weights: {
                goals: 10,
                possession: 1,
                shotsOnTarget: 1,
                shotsOffTarget: 1,
                fouls: 2,
                redCards: 3,
                penalties: 4,
                corners: 3,
                crosses: 2,
                passCompletions: 1,
                freeKicks: 1
            },
            totals: {
                home: 50,
                away: 50
            }
        };
    },

    changeActionValueForTeam(action, team, value) {
        const currentValue = this.state[team][action];
        const newValue = currentValue + value;

        if (newValue >= 0) {
            let updatedTeamActionValue = { [team]: { [action]: newValue }};
            let newState = merge({}, this.state, updatedTeamActionValue);
            this.setState(newState);
            this.calculatePressure(newState);
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

    calculatePressure(newState) {
        let total = 0;
        console.log('xxxx');
        console.log('keys: ', Object.keys(newState.weights));
        Object.keys(newState.home).forEach(function(key){
            const value = newState.home[key];
            console.log('value: ', value);
            console.log('smeg: ', Object.keys(newState.weights[key]));

            total += (value * Object.keys(newState.weights[key]));
            console.log('total: ', total);
        }.bind(this));
        this.setState({totals: {home:  total}});
    },

    generateTableRow(action) {
        return (
            <tr>
                <td>{capitalize(action)}</td>
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
                    <PercentageBar leftLabel={this.state.totals.home} rightLabel={"Away Team"} heading={"Pressure"} percentage={true} leftValue={this.state.totals.home} rightValue= {45.75} />
                </div>
            </div>
        );
    }
});

export default App;
