import React, { Component } from 'react';
import classNames from 'classnames';


const PercentageRowValue = React.createClass({
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
        myClassNames = classNames('percentage-row-chart', positionModifierClass, 'gel-pica', 'gel-mb+'),
        value = this.props.children + this.props.suffix;

    if (this.props.statusIndicator === 'awayOnTop' &&  this.props.position == 'right') {
        myClassNames = classNames('percentage-row-chart', positionModifierClass, 'gel-pica', 'gel-mb+', 'percentage-row-chart--right-active')
    }

    if (this.props.statusIndicator === 'homeOnTop' &&  this.props.position == 'left') {
        myClassNames = classNames('percentage-row-chart', positionModifierClass, 'gel-pica', 'gel-mb+', 'percentage-row-chart--left-active')
    }

    return (<dd className={myClassNames} style={{width: this.props.width}} key={this.props.key}>
<span className="vh">{this.props.label}</span>
{value}
</dd>);
}
});

export default PercentageRowValue;
