import React, { Component } from 'react';

const Header = React.createClass({
    render: function () {
        return (
            <div className="match-overview-header match-overview-header--football">
                <section className="fixture fixture--live-session-header">
                    <div className="fixture_date-time-wrapper">
                        <time className="fixture__date gel-minion" datetime="2016-09-28">WED, 28 Sept 2016</time>
                        <span className="fixture__title gel-minion">Champions League -Group C</span>
                    </div>
                    <div className="fixture__wrapper">
                        <span className="fixture__team gel-double-pica fixture__team--home">
                            <span className="fixture__team-name fixture__team-name--home">
                                <span className="fixture__team-name-wrap">
                                    <abbr className="abbr-on fixture__team-name-trunc medium-abbr-off" title="Celtic">
                                        <span>Celtic</span>
                                    </abbr>
                                </span>
                            </span>
                            <span className="fixture__block">
                                <span className="fixture__number fixture__number--home fixture__number--live">{this.props.homeScore}</span>
                            </span>
                        </span>
                        <span className="fixture__team gel-double-pica fixture__team--away">
                            <span className="fixture__team-name fixture__team-name--away">
                                <span className="fixture__team-name-wrap">
                                    <abbr className="abbr-on fixture__team-name-trunc medium-abbr-off" title="Manchester City">
                                        <span>Man City</span>
                                    </abbr>
                                </span>
                            </span>
                            <span className="fixture__block">
                                <span className="fixture__number fixture__number--away fixture__number--live">{this.props.awayScore}</span>
                            </span>
                        </span>
                    </div>
                </section>
            </div>
        )
    }
});

export default Header;