/* eslint-disable */
import React, { Component } from 'react';
import SnapshotGenerator from './components/snapshot-generator';
import SnapshotList from './components/snapshot-list';
import jquery from 'jquery';

const App = React.createClass({
    getInitialTeamModel() {
        return {
            goals: 0,
            possession: 50,
            shotsOnTarget: 0,
            shotsBlocked: 0,
            shotsOffTarget: 0,
            fouls: 0,
            yellowCards: 0,
            redCards: 0,
            penalties: 0,
            corners: 0,
            crosses: 0,
            turnOvers: 0,
            //passCompletions: 0,
            nonAttackingFreekicks: 0,
            attackingFreekicks: 0,
            attackingPasses: 0,
            bigChances: 0,
            divingSaves: 0
        }
    },

    getInitialScenarioGeneratorModel() {
        return {
            home: this.getInitialTeamModel(),
            away: this.getInitialTeamModel(),
            weights: {
                goals: 10,
                possession: 1,
                shotsOnTarget: 4,
                shotsBlocked: 1,
                shotsOffTarget: 2,
                fouls: -1, // should we get rid of those? we already have freeKicks
                redCards: -10, // yellow card?
                yellowCards: -5,
                penalties: 3,
                corners: 2,
                crosses: 1,
                turnOvers: -5,
                attackingFreekicks: 2,
                //passCompletions: 1, percentage, like possession, but cumulative
                nonAttackingFreekicks: 1,
                attackingPasses: 1,
                bigChances: 10,
                divingSaves: -4
            },
            points: {
                home: 0,
                away: 0
            },
            totals: {
                home: 50,
                away: 50
            },
            scenarioName: "unset"
        };
    },

    getInitialState() {
        return {
            generatorModel: this.getInitialScenarioGeneratorModel(),
            scenarioName: "",
            scenarios: []
        }
    },

    loadScenario(scenarioName) {
        jquery.get("http://localhost:3001/scenarios/" + scenarioName, function (data) {
            this.setState({
                scenarios: data.scenarios
            });
        }.bind(this));
    },

    updateScenarioName(event) {
        this.setState({scenarioName: event.target.value});
        this.loadScenario(event.target.value);
    },

    saveSnapshot() {
        var path = '/scenarios/' + this.state.scenarioName;
        jquery.ajax({
            url: 'http://localhost:3001' + path,
            type: 'POST',
            data: JSON.stringify(this.state.generatorModel),
            contentType: 'application/json',
            error: function(xhr, status, err) {
                console.log(status, err.toString());
            }.bind(this),
            success: function () {
                this.loadScenario(this.state.scenarioName);
            }.bind(this)
        });

    },

    updateGeneratorModel(updatedModel) {
        this.setState({
            generatorModel: updatedModel
        })
    },

    handleLoadSnapshot(snapshot) {
        this.setState({
            generatorModel: snapshot
        });
    },

    render() {
        console.log('calling render!', this.state.generatorModel);
        return (
            <div>
                <SnapshotGenerator snapshot={this.state.generatorModel} onUpdate={this.updateGeneratorModel}/>
                <div>
                    <label>Scenario:</label>
                    <input type="text" value={this.state.scenarioName} onChange={this.updateScenarioName}/>
                </div>
                <button type="button" onClick={this.saveSnapshot}>SAVE SNAPSHOT</button>

                <SnapshotList snapshots={this.state.scenarios} loadSnapshotHandler={this.handleLoadSnapshot}/>
            </div>
        );
    }
});

export default App;
