import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';

class PastDetails extends Component {
    
    render() {
        const roastData = [this.props.roastData];
        const selectedRoast = roastData[0];
        console.log(selectedRoast);
        // data to render the line chart
        // const chartData = {
        //     labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",],
        //     datasets: [
        //         {
        //             label: ${roastData}
        //         }
        //     ]
        // }

        if (roastData[0].length !== 0){
            
            return (
                <div className="HistTableWrapper col s-8">
                    <div className="row past-chart-wrapper">
                        {/* <Line
                        data={chartData} /> */}
                    </div>
                    <div className="row past-table-wrapper">
                        <table className="striped centered bordered past-table">
                            <thead>
                                <tr>
                                    <th rowSpan="2">Coffee Name</th>
                                    <th colSpan="2">Turn</th>
                                    <th colSpan="2">Charge</th>
                                    <th colSpan="2">Color Change</th>
                                    <th colSpan="2">First Crack</th>
                                    <th colSpan="2">Drop</th>
                                </tr>
                                <tr>
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
                                </tr>
                            </thead>
                            <tbody>
                                {roastData
                                ?
                                roastData.map(data => (
                                    <tr key="selectedRoastRow">
                                        <td key="{data.name}">{data.name}</td>
                                        <td key="{data.charge.time}">{data.charge.time}</td>
                                        <td key="{data.charge.temp}">{data.charge.temp}</td>
                                        <td key="{data.turn.time}">{data.turn.time}</td>
                                        <td key="{data.turn.temp}">{data.turn.temp}</td>
                                        <td key="{data.change.time}">{data.change.time}</td>
                                        <td key="{data.change.temp}">{data.change.temp}</td>
                                        <td key="{data.first.time}">{data.first.time}</td>
                                        <td key="{data.first.temp}">{data.first.temp}</td>
                                        <td key="{data.drop.time}">{data.drop.time}</td>
                                        <td key="{data.drop.temp}">{data.drop.temp}</td>
                                    </tr>
                                ))
                                :
                                <tr><td></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

        else {
            return(
                <h2>Select A roast to see details</h2>
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
