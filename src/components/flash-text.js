import React, { Component } from 'react';

const FlashText = React.createClass({
    displayName: "FlashText",

    render: function () {
        return (
            <div className="flash-text flash"><p className="gel-pica"> {this.props.type.toUpperCase()} {this.props.text}</p></div>
        );
    }
});

export default FlashText;
