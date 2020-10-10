import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';
import "chartjs-adapter-moment";

class CurrentRoast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            batchName: "",
            roastTime: "",
            currentTemp: 0,
            charge: {},
            turn: {},
            change: {},
            first: {},
            drop: {},
            notes: "",
            chartLabels:[],
            chartDataPoints: []
        }

    };

    tempChange(e) {
        this.setState({currentTemp: e.target.value})
    };

    eventSubmit(e) {
        const eventName = e.target.value;
        let eventObject = { [eventName]: {time: this.state.currentTime, temp: this.state.currentTemp} }
        this.setState({ eventObject })
    }

    cancelSubmit(e) {
        e.preventDefault();
    };

    saveRoast = async () => {
        await axios.post(`/api/roasts`, this.state.roastObject);
    };

    updateNotes(e) {
        this.setState({notes: e.target.value})
    };

    saveNotes(e) {

    }

    render() {

        let chartDetails = {
            labels: this.state.chartLabels,
            datasets: [
                {
                    label: this.state.batchName,
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
                    data: this.state.chartDataPoints                       
                }
            ],
        },

        return (
            <div className="roastWrapper col s-12 left-align">

                {/* Form to start timer and roast */}
                <div className="row">
                    <form id="roastStartForm">

                    </form>
                </div>

                {/* Roast Curve for current roast, dynamically updated from state */}
                <div className="row past-chart-wrapper">
                    <Line
                    data={chartDetails} />
                </div> 

                {/* Form to add events to the roast */}
                <div className="row">
                    <fieldset>
                        <legend>Roast Event</legend>
                            <form id="roastEventsForm" className="col s-3" onSubmit={ this.cancelSubmit }>
                                <div className="row">
                                    <input type="number" className="col s-12" onChange={ this.tempChange }></input>
                                </div>
                                <div className="row">
                                    <button type="button" value="turn" onClick={ this.eventSubmit }>Turn</button>
                                    <button type="button" value="change" onClick={ this.eventSubmit }>Color Change</button>
                                    <button type="button" value="first" onClick={ this.eventSubmit }>First Crack</button>
                                </div>
                            </form>
                    </fieldset>
                    <fieldset>
                        <legend>Notes</legend>
                            <textarea name="roast-notes" value={ this.state.notes } onChange={ this.updateNotes }></textarea>
                            <button type="button" onClick={ this.saveNotes }>Save</button>
                    </fieldset>
                </div>
            </div>
        )
    }
}

CurrentRoast.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(CurrentRoast);
