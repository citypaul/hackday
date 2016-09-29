import React, { Component } from 'react';


const percentagerowvalue = React.createClass({
    displayName: 'PercentageRowValue',

    getDefaultProps: function() {
    return {
        width: '50%',
        suffix: ''
    };
},

propTypes: {
    label: React.PropTypes.string.isRequired,
        position: React.PropTypes.string.isRequired,
        width: React.PropTypes.string.isRequired,
        suffix: React.PropTypes.string
},

render: function () {
    var positionModifierClass = 'percentage-row-chart--' + this.props.position,
        classNames = ['percentage-row-chart', positionModifierClass, 'gel-pica', 'gel-mb+'],
        value = this.props.children + this.props.suffix;

    return (<dd className={classNames.join(' ')} style={{width: this.props.width}} key={this.props.key}>
<span className="vh">{this.props.label}</span>
{value}
</dd>);
}
});

export default percentagerowvalue;
