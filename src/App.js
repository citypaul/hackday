import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const App = React.createClass({
    getInitialState() {
        return {
            goal: {
                home: 0,
                away: 0,
                points: 0
            }
        };
    },

    changeActionValueForTeam(action, team, value) {
        const currentValue = this.state[action][team];
        const newValue = currentValue + value;

        if (newValue >= 0) {
            this.setState(
                {
                    [action]: {
                        [team]: newValue
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
                                {this.state.goal.home}
                                <button type="button" form="my_form" onClick={this.changeActionValueForTeam.bind(this, 'goal', 'home', 1)}>UP</button>
                                <button type="button" form="my_form" onClick={this.changeActionValueForTeam.bind(this, 'goal', 'home', -1)}>Down</button>
                            </td>
                            <td>
                                {this.state.goal.away}
                                <button type="button" form="my_form">UP</button>
                                <button type="button" form="my_form">Down</button>
                            </td>
                            <td>
                                {this.state.goal.points}
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
