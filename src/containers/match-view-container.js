/* eslint-disable */
import React, { Component } from 'react';
import PercentageBar from '../components/percentage-bar';
import jquery from 'jquery';

const MatchViewContainer = React.createClass({
    
    render() {
        console.log(this.props);
        const style = {color: 'peru'};

        return (
            <div>
                <h1>Hello, match view container!</h1>
                <PercentageBar leftLabel="Home: " rightLabel="Away: " heading={"Pressure"} percentage={true}
                               leftValue={50} rightValue={50}/>
            </div>
        );
    }
});


export default MatchViewContainer;
