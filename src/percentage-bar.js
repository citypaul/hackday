import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PercentageRowValue from './percentage-row-value';


const percentageBar = React.createClass({
        displayName: "PercentageRow",

        propTypes: {
            heading: React.PropTypes.string.isRequired,
    percentage: React.PropTypes.bool,
    suffix: React.PropTypes.string,
    leftLabel: React.PropTypes.string.isRequired,
    rightLabel: React.PropTypes.string.isRequired,
    leftValue: React.PropTypes.number.isRequired,
    rightValue: React.PropTypes.number.isRequired
},

/**
 * Ensures that rows cannot be smaller than 8% or larger than 92%, such as
 * when a stat is 20-1
 */
normaliseWidth: function(width) {
    if (width > 92) {
        return 92;
    } else if (width < 8) {
        return 8;
    }

    return width;
},

calculateWidths: function (leftValue, rightValue) {
    if ((leftValue !== 0 && rightValue !== 0)) {
        var leftWidth = this.normaliseWidth((leftValue / (leftValue + rightValue) * 100)),
            rightWidth = this.normaliseWidth((rightValue / (leftValue + rightValue) * 100));

        return {
            home: leftWidth + '%',
            away: rightWidth + '%'
        };
    } else if (leftValue === 0 && rightValue !== 0) {
        return {
            home: '8%',
            away: '92%'
        };
    } else if (rightValue === 0 && leftValue !== 0) {
        return {
            home: '92%',
            away: '8%'
        };
    } else {
        return {
            home: '50%',
            away: '50%'
        };
    }
},

/**
 * Ensures that two percentages never amount to over 100%
 * In this case e.g 49.5 and 50.5 both rounding up the lesser value is lowered
 */
normaliseValues: function(leftValue, rightValue) {
    var left = Math.round(leftValue),
        right = Math.round(rightValue);

    if ((left + right) > 100) {
        if (leftValue < rightValue) {
            left = Math.floor(leftValue);
        } else {
            right = Math.floor(rightValue);
        }
    }

    return {
        home: left,
        away: right
    };
},

getRowValue: function(props, value) {
    return (
        <PercentageRowValue {...props}>{value}</PercentageRowValue>
);
},


getRowValues: function() {
    var rows = [],
        leftValue = this.props.leftValue,
        rightValue = this.props.rightValue,
        widths = this.calculateWidths(leftValue, rightValue),
        values = this.normaliseValues(leftValue, rightValue);

    rows.push(
        this.getRowValue({
            label: this.props.leftLabel,
            suffix: this.props.suffix,
            position: 'left',
            width: widths.home,
            key: rows.length
        }, values.home)
    );
    rows.push(
        this.getRowValue({
            label: this.props.rightLabel,
            suffix: this.props.suffix,
            position: 'right',
            width: widths.away,
            key: rows.length
        }, values.away)
    );

    return rows;
},

render: function() {
    return (
        <dl className="percentage-row" key={this.props.key}>
<dt className="percentage-row-chart__heading gel-pica-bold">{this.props.heading}</dt>
{this.getRowValues()}
</dl>
);
}
});

export default percentageBar;
