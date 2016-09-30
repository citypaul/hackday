import React, { Component } from 'react';
import PercentageBar from '../components/percentage-bar';
import jquery from 'jquery';

const MatchViewContainer = React.createClass({
    getInitialState() {
        return {
            scenarioIndex: 0,
            homeTeam: 50,
            awayTeam: 50
        }
    },

    requestData() {
        let scenarioUrl = 'http://localhost:3001/scenarios/' + this.props.params.scenario + '/' + this.state.scenarioIndex;
        jquery.ajax(scenarioUrl, {
            success: function (data) {
                let newIndex = this.state.scenarioIndex + 1;
                this.setState({
                    scenarioIndex: newIndex,
                    homeTeam: data.totals.home,
                    awayTeam: data.totals.away
                })
            }.bind(this),
            error: function () {

            }
        });
    },

    componentDidMount() {
        setInterval(this.requestData, 2000);
    },

    render() {
        console.log(this.props);
        const style = {color: 'peru'};

        return (
            <div>
                <h1>Hello, match view container!</h1>
                <PercentageBar leftLabel="Home: " rightLabel="Away: " heading={"Pressure"} percentage={true}
                               leftValue={this.state.homeTeam} rightValue={this.state.awayTeam}/>
            </div>
        );
    }
});


export default MatchViewContainer;
