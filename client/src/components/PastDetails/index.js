import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';
import "chartjs-adapter-moment";
import axios from "axios";


class PastDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: this.props.notes
        }
        this.handleSave = this.handleSave.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
          this.setState({
            notes: nextProps.notes
          });
        }
      }

    handleSave(e) {
        e.preventDefault();
        axios.put(`/api/roasts/${this.props.roastData._id}`, {notes: this.state.notes})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    
    render() {
        const roastData = [this.props.roastData];
        const selectedRoast = roastData[0];
        if (roastData[0].length !== 0){
            // data to render the line chart
            const chartData = {
                datasets: [
                    {
                        label: selectedRoast.name,
                        fill: false,
                        lineTension: 0.25,
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
            const chartOptions = {
                scales: {
                    ticks: {
                        min:"0:00",
                        source: 'data'
                    },
                    xAxes: [{
                        ticks: {
                            beginAtZero: true

                            },
                        type: 'time',
                        distribution: 'linear',
                        time: {
                            parser:"mm:ss",
                            // max:"16:00",
                            // min: "0:00",
                            unit: 'minute',
                            displayFormats: {
                                minute: "mm:ss"
                            }
                        }
                    }]
                }
            }
            
            return (
                <div className="HistTableWrapper col s8">
                    {/* chart to display the roast curve of the selected batch */}
                    <div className="row past-chart-wrapper">
                        <Line
                        data={chartData}
                        options={chartOptions} />
                    </div>
                    <div className="row past-table-wrapper">
                        <table className="col s12 centered bordered past-table">
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
                            </thead>
                                {/* Mapping isn't needed for a single roast, but will come in handy for future development. Eventually add a comparison feature that would display two datasets */}
                                {
                                roastData.map(data => (
                                    <tbody key="detailTable">
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
                                    <tr>
                                        <th key="notes">Notes</th>
                                        <td key="noteArea" colSpan="6">
                                        {selectedRoast.notes &&
                                        <form key="noteForm" onSubmit={ this.handleSave }>
                                            {/* Notes container to view and add tasting/general notes */}
                                            <textarea type="text" name="roast-notes" id="roast-notes" value={ this.state.notes } style={{resize: "none"}} 
                                            onChange={e => {
                                                this.setState({ notes: e.target.value})
                                            }} ></textarea>
                                            <button type="submit" className="waves-effect waves-light btn" >save</button>
                                            </form>
                                        }
                                        </td>
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
