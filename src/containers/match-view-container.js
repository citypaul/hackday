import React, { Component } from 'react';
import PercentageBar from '../components/percentage-bar';
import jquery from 'jquery';
import FootballHeader from '../components/header';

const MatchViewContainer = React.createClass({
    getInitialState() {
        return {
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
        setInterval(this.requestData, 1000);
    },

    render() {
        console.log(this.props);
        const style = {color: 'peru'};

        return (
            <div>
                <FootballHeader homeScore={this.state.home.score} awayScore={this.state.away.score} />
                <PercentageBar leftLabel="Home: " rightLabel="Away: " heading={"Pressure"} percentage={true}
                               leftValue={this.state.home.pressure} rightValue={this.state.away.pressure} />
                <div className="flash-text flash"><p className="gel-pica">GOAL! Agüero 32"</p></div>

            </div>
        );
    }
});


export default MatchViewContainer;
