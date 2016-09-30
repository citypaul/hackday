import React from 'react';
import {Line} from 'react-chartjs';
import { merge, round } from 'lodash';

import classNames from 'classnames';

const LineChart = React.createClass({
    displayName: "LineChart",
    getInitialState() {
       return {
           homeData: [],
           awayData: []
       }
    },

    updateChartData(homeVal, awayVal) {
        this.state.homeData.push(homeVal);
        this.state.awayData.push(awayVal);
    },

    render: function() {
        this.updateChartData(this.props.home, this.props.away);

        const chartData =  {
        labels: [],
        datasets: [{
                label: "Home",
                fillColor: "rgba(0,152,80,0.2)",
                strokeColor: "rgba(0,152,80,1)",
                pointColor: "rgba(0,152,80,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(0,152,80,1)",
                data: this.state.homeData
            },
            {
                label: "Away",
                fillColor: "rgba(122,178,226,0.2)",
                strokeColor: "rgba(122,178,226,1)",
                pointColor: "rgba(122,178,226,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(122,178,226,1)",
                data: this.state.awayData
            }]
        };
        const chartOptions = {};

        return <Line data={chartData} options={chartOptions} width="1280" height="250" />

    }
});

export default LineChart;
