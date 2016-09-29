import React from 'react';

const ScenarioItem = React.createClass({
    getInitialState() {
        return {
            snapshot: this.props.snapshot
        };
    },

    loadSnapshot() {
        this.props.loadSnapshotHandler(this.state.snapshot);
    },

    render() {
        return (
            <div>
                <div><pre>{JSON.stringify(this.state.snapshot, null, 2) }</pre></div>
                <button type="button" onClick={this.loadSnapshot}>Load Snapshot</button>
            </div>
        );
    }
});

export default ScenarioItem;


