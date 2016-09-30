import React, { Component } from 'react';
import PercentageBar from '../components/percentage-bar';
import FlashText from '../components/flash-text';
import jquery from 'jquery';
import FootballHeader from '../components/header';

const MatchViewContainer = React.createClass({
    getInitialState() {
        return {
            events:  {
                type: "",
                text: ""
            },
            scenarioIndex: 0,
            home: {
                pressure: 50,
                score: 0
            },
            away: {
                pressure: 50,
                score: 0
            }
        }
    },

    requestData() {
        let scenarioUrl = 'http://localhost:3001/scenarios/' + this.props.params.scenario + '/' + this.state.scenarioIndex;
        jquery.ajax(scenarioUrl, {
            success: function (data) {
                let newIndex = this.state.scenarioIndex + 1;
                this.setState({
                    scenarioIndex: newIndex,
                    home: {
                        pressure: data.totals.home,
                        score: data.totals.homeTeamScore
                    },
                    away: {
                        pressure: data.totals.away,
                        score: data.totals.awayTeamScore
                    },
                    events: {
                        type: data.events.type,
                        text: data.events.text
                    }
                })
            }.bind(this),
            error: function (err) {
                this.setState({
                    scenarioIndex: 0
                })
                console.log(err);
            }.bind(this)
        });
    },

    componentDidMount() {
        setInterval(this.requestData, 2000);
    },

    render() {
        return (
            <div>
                <FootballHeader homeScore={this.state.home.score} awayScore={this.state.away.score} />
                <PercentageBar leftLabel="Home: " rightLabel="Away: " percentage={true}
                               leftValue={this.state.home.pressure} rightValue={this.state.away.pressure} />
                <FlashText type={this.state.events.type} text={this.state.events.text} />

            </div>
        );
    }
});


export default MatchViewContainer;
