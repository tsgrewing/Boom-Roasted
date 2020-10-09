import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PastDetails extends Component {
    
    render() {
        const roastData = this.props.roastData;
        Object.keys(roastData).map(key => ({[key]: roastData[key]}))
        console.log(Object.keys(roastData).map(key => ({[key]: roastData[key]})))
        if (roastData){
            return (
                    
                <div className="HistTableWrapper col s-8">
                    <div className="row past-chart-wrapper">
                        <canvas className="past-chart col s-12">

                        </canvas>
                    </div>
                    <div className="row past-table-wrapper">
                        <table className="striped centered bordered past-table">
                            <thead>
                                <tr>
                                    <th rowspan="2">Coffee Name</th>
                                    <th colspan="2">Charge</th>
                                    <th colspan="2">Turn</th>
                                    <th colspan="2">Color Change</th>
                                    <th colspan="2">First Crack</th>
                                    <th colspan="2">Drop</th>
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
                                {
                            
                            // <tr>
                                    //     <td>{data.charge.time}</td>
                                    //     <td>{data.charge.temp}</td>
                                    //     <td>{data.turn.time}</td>
                                    //     <td>{data.turn.temp}</td>
                                    //     <td>{data.change.time}</td>
                                    //     <td>{data.change.temp}</td>
                                    //     <td>{data.first.time}</td>
                                    //     <td>{data.first.temp}</td>
                                    //     <td>{data.drop.time}</td>
                                    //     <td>{data.drop.temp}</td>
                                    // </tr>
                                
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
