import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import "chartjs-adapter-moment";
import Timer from "react-compound-timer";
import M from "materialize-css";
import './style.css';
import RoastChart from "../RoastChart";
import CurrentNotes from "../CurrentNotes"
import StartRoastForm from "../StartRoastForm"


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
            notes: "test",
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
        this.updateNotes=this.updateNotes.bind(this);

    };

    componentDidMount (){
        this.getInventory();
        this.resetState();
        M.AutoInit();
    };

    startRoast(coffeeName, chargeTemp) {
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

    updateNotes(val) {
        this.setState({notes: val})
        console.log(this.state.notes)
    }

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
    };

    updateChart(time, temp) {
        let labels = this.state.chartLabels;
        let points = this.state.chartPoints;
        points.push({x: time, y: temp})
        labels.push(time);
        this.setState({
            chartLables: labels,
            chartPoints: points
        });
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

        return (
            <div className="roastWrapper col s-12 left-align">
                <Timer
                          startImmediately={false}
                          formatValue={(value) => `${(value < 10 ? `0${value}` : value)}:`}
                >
                {({ start, stop, getTime, reset }) => (
                <>
                {/* Form to start timer and roast */}
                {!this.state.started 
                ?
                <StartRoastForm 
                    start={start}
                    startRoast={this.startRoast}
                    inventory={this.state.inventory}
                />
                :
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
                <CurrentNotes
                updateNotes={this.updateNotes}
                notes={this.state.notes}
                saveNotes={this.saveNotes} 
                />
            </div>
            }

                {/* Time Display */}
                <div id="timerWrapper" className="row center-align">
                    <h4>
                        <Timer.Minutes />
                        <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
                    </h4>
                </div>

                {/* Roast Curve for current roast, dynamically updated from state */}

                    <RoastChart 
                    labels={this.state.chartLabels}
                    points={this.state.chartPoints} 
                    name = {this.state.name}
                    start= {start}
                    />

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
