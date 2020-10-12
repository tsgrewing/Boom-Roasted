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

    componentDidMount() {
        console.log(this.props)
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.labels.length > this.state.eventCount) {
          const addEvent = this.state.eventCount + 1;
          console.log(addEvent)
          this.setState({
            labels: nextProps.labels,
            points: nextProps.points,
            shouldRedraw: true,
            eventCount: addEvent
          });
        }
        else{
            this.setState({shouldRedraw: false})
            console.log(this.props)
        }
      }

    render() {
        console.log(this.state)
        let chartDetails = {
            labels: this.props.labels,
            datasets: [
                {
                    label: this.props.name,
                    fill: false,
                    lineTension: .25,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.points                    
                }
            ],
        }

        return (
            <>

            <Line
             data={chartDetails}
             redraw={this.state.shouldRedraw} 
             /> 
</>
        )
    }
}

export default RoastChart;