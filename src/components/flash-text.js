import React from 'react';
import classNames from 'classnames';

const FlashText = React.createClass({
    displayName: "FlashText",


    render: function () {
        let flashTextClasses = classNames(
            'flash-text',
            {
                'flash-text--active': this.props.type,
                'flash': this.props.type==='goal'
            }
        );


        return (
            <div className={flashTextClasses}><p className="gel-pica"> {this.props.type.toUpperCase()} {this.props.text}</p></div>
        );
    }
});

export default FlashText;
