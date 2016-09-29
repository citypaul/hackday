import React, { Component } from 'react';

const ScenarioItem = React.createClass({
    render() {
        var scenario = this.props.scenario;

        return (
            <div>
                <div><pre>{JSON.stringify(scenario, null, 2) }</pre></div>
                <button type="button" onClick={this.loadScenario}>LOAD Moment</button>
            </div>
        );
    }
});

export default ScenarioItem;


