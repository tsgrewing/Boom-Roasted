import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import "chartjs-adapter-moment";


class RoastChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            labels:this.props.labels,
            points: this.props.points,
            shouldRedraw: false,
            eventCount: 1
        }
    };

    // check to see if there is a new event to add to the chart
    componentWillReceiveProps(nextProps) {
        if(this.props.labels.length > this.state.eventCount) {
          const addEvent = this.state.eventCount + 1;
          this.setState({
            labels: nextProps.labels,
            points: nextProps.points,
            shouldRedraw: true,
            eventCount: addEvent
          });
        }
        else{
            this.setState({shouldRedraw: false})
        }
      }

    render() {
        let chartDetails = {
            labels: this.props.labels,
            datasets: [
                {
                    label: this.props.name,
                    fill: false,
                    lineTension: .25,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(66, 145, 66)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(66, 145, 66)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(66, 145, 66)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: this.props.points                    
                }
            ],
        }

        const chartOptions = {
            scales: {
                ticks: {
                    // min:"0:00",
                    // max: "20:00",
                    source: 'data'
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        min: 100,
                        max: 500
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true

                        },
                    type: 'time',
                    distribution: 'linear',
                    time: {
                        parser:"mm:ss",
                        max:"16:00",
                        min: "0:00",
                        unit: 'minute',
                        displayFormats: {
                            minute: "mm:ss"
                        }
                    }
                }]
            }
        }

        return (
            <div className="row current-chart-wrapper">
                <Line
                data={chartDetails}
                redraw={this.state.shouldRedraw}
                options={chartOptions} 
                /> 
            </div>
        )
    }
}

export default RoastChart;