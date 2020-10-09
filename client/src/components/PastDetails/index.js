import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';
import "chartjs-adapter-moment";


class PastDetails extends Component {
    
    render() {
        const roastData = [this.props.roastData];
        const selectedRoast = roastData[0];
        
        
        if (roastData[0].length !== 0){
            // data to render the line chart
            const chartData = {
                labels: [selectedRoast.charge.time, selectedRoast.turn.time, selectedRoast.change.time, selectedRoast.first.time, selectedRoast.drop.time],
                datasets: [
                    {
                        label: selectedRoast.name,
                        fill: false,
                        lineTension: 0.1,
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
                        data: [
                            {x: selectedRoast.charge.time, y: selectedRoast.charge.temp},
                            {x: selectedRoast.turn.time, y: selectedRoast.turn.temp},
                            {x: selectedRoast.change.time, y: selectedRoast.change.temp},
                            {x: selectedRoast.first.time, y: selectedRoast.first.temp},
                            {x: selectedRoast.drop.time, y: selectedRoast.drop.temp},
                        ]                        
                    }
                ],
            };
            
            return (
                <div className="HistTableWrapper col s-8">
                    <div className="row past-chart-wrapper">
                        <Line
                        data={chartData} />
                    </div>
                    <div className="row past-table-wrapper">
                        <table className="col s-8 centered bordered past-table">
                            <thead>
                                <tr>
                                    <th>Coffee Name</th>
                                    <th></th>
                                    <th >Charge</th>
                                    <th >Turn</th>
                                    <th >Color Change</th>
                                    <th >First Crack</th>
                                    <th >Drop</th>
                                </tr>
                                {/* <tr>
                                    <th>Time</th>
                                    <th>Temp</th>
                                    <th>Time</th>
                                    <th>Temp</th>
                                    <th>Time</th>
                                    <th>Temp</th>
                                    <th>Time</th>
                                    <th>Temp</th>
                                    <th>Time</th>
                                    <th>Temp</th>
                                </tr> */}
                            </thead>
                            
                                {
                                roastData.map(data => (
                                    <tbody>
                                    <tr key="selectedRoastRow">
                                        <th rowSpan="2" key="{data.name}">{data.name}</th>
                                        <th key="time">Time</th>
                                        <td key="{data.charge.time}">{data.charge.time}</td>
                                        <td key="{data.turn.time}">{data.turn.time}</td>
                                        <td key="{data.change.time}">{data.change.time}</td>
                                        <td key="{data.first.time}">{data.first.time}</td>
                                        <td key="{data.drop.time}">{data.drop.time}</td>
                                    </tr>
                                    <tr>
                                        <th key="temp">Temp</th>
                                        <td key="{data.charge.temp}">{data.charge.temp}&deg;F</td>
                                        <td key="{data.turn.temp}">{data.turn.temp}&deg;F</td>
                                        <td key="{data.change.temp}">{data.change.temp}&deg;F</td>
                                        <td key="{data.first.temp}">{data.first.temp}&deg;F</td>
                                        <td key="{data.drop.temp}">{data.drop.temp}&deg;F</td>
                                    </tr>
                                    </tbody>
                                ))
                                }
                            
                        </table>
                    </div>
                </div>
            )
        }

        else {
            return(
                <h4 className="col s-8 ">Select a roast to see details</h4>
            )
        }
    }
}

PastDetails.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(PastDetails);
