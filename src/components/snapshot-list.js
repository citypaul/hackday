import React from 'react';
import SnapshotItem from './snapshot-item';

const SnapshotList = React.createClass({
    getScenarioItem(snapshot, index) {
        return (
            <SnapshotItem key={index} snapshot={snapshot} loadSnapshotHandler={this.props.loadSnapshotHandler}/>
        );
    },

    getSnapshotItems() {
        return this.props.snapshots.map(function (snapshot, index) {
            return this.getScenarioItem(snapshot, index);
        }.bind(this));
    },

    render() {
        var snapshotItems = this.getSnapshotItems();
        return (
            <div>
                { snapshotItems }
            </div>
        );
    }
});

export default SnapshotList;


