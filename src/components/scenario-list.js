import React, { Component } from 'react';
import ScenarioItem from './scenario-item';

const ScenarioList = React.createClass({
    getScenarioItem(scenario, index) {
        return (
            <ScenarioItem key={index} scenario={scenario}/>
        );
    },

    getScenarioItems() {
        return this.props.scenarios.map(function (scenario, index) {
            return this.getScenarioItem(scenario, index);
        }.bind(this));
    },

    render() {
        var scenarioItems = this.getScenarioItems();
        return (
            <div>
                { scenarioItems }
            </div>
        );
        //the button belongs elsewhere methinks...
        //return (
        //
        //);
    }
});

export default ScenarioList;


