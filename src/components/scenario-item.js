import React, { Component } from 'react';

const ScenarioItem = React.createClass({
    render() {
        var scenario = this.props.scenario;

        return (
            <div>
                <p>{scenario.home.goals}</p>
                <button type="button" onClick={this.loadScenario}>LOAD Moment</button>
            </div>
        );
    }
});

export default ScenarioItem;


