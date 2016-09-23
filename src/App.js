import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const App = React.createClass({
    getInitialState() {
        return {
            home: {
                goals: 0
            },
            away: {
                goals: 0
            },
            weights: {
                goals: 10
            }
        };
    },

    changeActionValueForTeam(action, team, value) {
        const currentValue = this.state[team][action];
        const newValue = currentValue + value;

        if (newValue >= 0) {
            this.setState(
                {
                    [team]: {
                        [action]: newValue
                    }
                }
            )
        }
    },

    handleChange(event) {
        this.setState({value: event.target.value});
    },

    render() {
        return (
            <div>
                <form method="GET" id="my_form"></form>

                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Home</th>
                            <th>Away</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Goal</td>
                            <td>
                                {this.state.home.goals}
                                <button type="button" form="my_form" onClick={this.changeActionValueForTeam.bind(this, 'goals', 'home', 1)}>UP</button>
                                <button type="button" form="my_form" onClick={this.changeActionValueForTeam.bind(this, 'goals', 'home', -1)}>Down</button>
                            </td>
                            <td>
                                {this.state.away.goals}
                                <button type="button" form="my_form">UP</button>
                                <button type="button" form="my_form">Down</button>
                            </td>
                            <td>
                                {this.state.weights.goals}
                                <button type="button" form="my_form">UP</button>
                                <button type="button" form="my_form">Down</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    />
            </div>
        );
    }
});

export default App;
