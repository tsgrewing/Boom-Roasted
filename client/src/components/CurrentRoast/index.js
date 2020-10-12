import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';
import "chartjs-adapter-moment";
import Timer from "react-compound-timer";
import M from "materialize-css";
import './style.css';
import RoastChart from "../RoastChart";


class CurrentRoast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            roastTime: "",
            currentTemp: '',
            weight: 0,
            charge: '',
            turn: 0,
            change: 0,
            first: 0,
            drop: 0,
            notes: "",
            chartLabels:[],
            chartPoints: [],
            finished: false,
            user: this.props.auth.user.id,
            inventory: [],
            started: false
        }
        this.startRoast=this.startRoast.bind(this);
        this.tempChange=this.tempChange.bind(this);
        this.eventSubmit=this.eventSubmit.bind(this);
        this.saveRoast=this.saveRoast.bind(this);
        this.resetState=this.resetState.bind(this);
    };

    componentDidMount (){
        this.getInventory();
        this.resetState();
        M.AutoInit();
    };

    startRoast(e) {
        console.log(e.target.charge.value)
        const chargeTemp = e.target.charge.value;
        const coffeeName = e.target.name.value
        this.setState({
            charge: {time: "0:00", temp: chargeTemp},
            name: coffeeName,
            started: true,
            currentTemp: chargeTemp
        });
        this.updateChart("0:00", chargeTemp)
    }

    tempChange(e) {
        this.setState({
            currentTemp: e.target.value,
            started: true
        })
    };

    eventSubmit(e, time) {
        var mins = Math.floor(time / 60000);
        var secs = ((time % 60000) / 1000).toFixed(0);
        const eventTime =  mins + ":" + (secs < 10 ? '0' : '') + secs
        const eventName = e.target.value;
        const currentTemp = this.state.currentTemp
        if (eventName === "drop"){
            this.setState({ finished: true,
                            drop: {time: eventTime, temp:this.state.temp} })
        }
        let eventObject = { [eventName]: {time: eventTime, temp: currentTemp} }

        this.setState(
            { [eventName]: {time: eventTime, temp: currentTemp}
            // chartLabels: {...this.state.chartLabels, ...{eventTime}},
            // chartPoints: {...this.state.chartPoints, ...{'x': [eventTime], 'y': [this.state.currentTemp]} }
        });
        this.updateChart(eventTime, currentTemp);
        console.log(eventTime)
    };

    updateChart(time, temp) {
        console.log(time)
        let labels = this.state.chartLabels;
        let points = this.state.chartPoints;
        points.push({x: time, y: temp})
        labels.push(time);
        this.setState({
            chartLables: labels,
            chartPoints: points
        });
        console.log(this.state)

    }

    cancelSubmit(e) {
        e.preventDefault();
    };

    saveRoast = async () => {
        const {name, weight, charge, turn, change, first, drop, notes, user} = this.state;
        await axios.post(`/api/roasts`, { name, weight, charge, turn, change, first, drop, notes, user })
        .then(res => this.resetState());
    };

    getInventory = async () => {
        const userInv = this.props.auth.user.id
        const green = await axios.get(`/api/coffees/${userInv}`);
        this.setState({inventory: green.data})
    }

    resetState() {
        this.setState({
            name: "",
            roastTime: "",
            currentTemp: 0,
            weight: 0,
            charge: {},
            turn: 0,
            change: 0,
            first: 0,
            drop: 0,
            notes: "",
            chartLabels:[],
            chartPoints: [],
            finished: false,
            started: false
        });
    };

    render() {
        let chartDetails = {
            labels: this.state.chartLabels,
            datasets: [
                {
                    label: this.state.name,
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
                    data: this.state.chartPoints                    
                }
            ],
        }
        return (
            <div className="roastWrapper col s-12 left-align">
                <Timer
                          startImmediately={false}
                          formatValue={(value) => `${(value < 10 ? `0${value}` : value)}:`}
                >
                {({ start, stop, getTime, reset }) => (
                <>
                {/* Form to start timer and roast */}
                {!this.state.started &&
                <fieldset className="row">
                    <legend>New Roast</legend>
                    <form className="col s12" id="roastStartForm" 
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.startRoast(e);
                        start();
                    }}>
                    <div className="row">

                    <div className="input-field col s3">

                        <select className="browser-default"  name="name">
                            {
                            this.state.inventory.map(green => 
                                <option key={green.name}>{green.name}</option>)
                            }
                        </select>
                        
                    </div>

                    <div className="input-field col s3">
                        <input type="number"  name="weight" ></input>
                        <label htmlFor="weight">Weight:</label>
                    </div>

                    <div className="input-field col s3">
                        <input type="number"  name="charge"></input>
                        <label htmlFor="charge">Charge Temp:</label>
                    </div>

                    <div className="input-field col s3">
                        <button type="submit" className="waves-effect waves-light btn">Start Roast</button>
                    </div>

                    </div>
                    </form>
                </fieldset>
                }

                {/* Time Display */}
                <div id="timerWrapper" className="row center-align">
                    <h4>
                        <Timer.Minutes />
                        <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
                    </h4>
                </div>

                {/* Roast Curve for current roast, dynamically updated from state */}
                <div className="row current-chart-wrapper">
                    {/* <Line
                    data={chartDetails} 
                    /> */}
                    <RoastChart 
                    labels={this.state.chartLabels}
                    points={this.state.chartPoints} 
                    name = {this.state.name}
                    />
                </div> 

                {/* Form to add events to the roast */}
                <div className="row">

                    {!this.state.finished
                    ?
                    <div className="col s6">
                    <fieldset>
                        <legend>Roast Event</legend>
                            <form id="roastEventsForm" onSubmit={ this.cancelSubmit }>
                                <div className="row center-align">
                                    <div className="input-field col s6">
                                        <label htmlFor="eventTemp">Event Temp</label>
                                    <input type="number" className="col s-12" value={this.state.currentTemp} onChange={ this.tempChange } name="eventTemp"></input>

                                    </div>
                                
                                <div className="btnCol col s6 center-align input-field">
                                    <div className="row center-align">
                                    {(this.state.turn === 0)
                                    ?
                                    <button className="eventBtn waves-effect waves-light btn " type="button" value="turn" 
                                        onClick={(e) => {
                                            const time = getTime();
                                            this.eventSubmit(e, time)
                                        }}
                                    >Turn</button>
                                    :
                                    (this.state.change === 0)
                                    ?
                                    <button className="eventBtn waves-effect waves-light btn  " type="button" value="change" 
                                        onClick={(e) => {
                                            const time = getTime();
                                            this.eventSubmit(e, time)
                                        }}
                                    >Color Change</button>
                                    :
                                    this.state.first === 0
                                    ?
                                    <button className="eventBtn waves-effect waves-light btn " type="button" value="first" 
                                        onClick={(e) => {
                                            const time = getTime();
                                            this.eventSubmit(e, time)
                                        }}
                                    >First Crack</button>
                                    :
                                    <button className="eventBtn waves-effect waves-light btn " type="button" value="drop" 
                                        onClick={(e) => {
                                            const time = getTime();
                                            stop();
                                            reset();
                                            this.eventSubmit(e, time)
                                        }}
                                    >
                                    Drop</button>
                                    }
                                    </div>
                                </div>
                                </div>
                            </form>
                    </fieldset>
                    </div>
                    :
                    <div className="col s-6 center-align valign-center">
                        <fieldset>
                            <legend>Submit Roast</legend>
                            <button type="button" className="waves-effect waves-light btn" onClick={ this.saveRoast }>Save Roast</button>
                        </fieldset>
                    </div>
                    }

                    {/* Form to add Notes to roast */}
                    <div className="col s6">
                    <fieldset>
                        <legend>Notes</legend>
                            <textarea name="notes" value={ this.state.notes } onChange={e=> { this.setState({notes: e.target.notes}) }}></textarea>
                            <div className="row center-align">
                            <button className="waves-effect waves-light btn center-align" type="button" onClick={ this.saveNotes }>Save</button>
                            </div>
                    </fieldset>
                    </div>
                </div>

                </>
                )}
                </Timer>
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
