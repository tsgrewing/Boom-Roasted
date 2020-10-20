import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import "chartjs-adapter-moment";
import Timer from "react-compound-timer";
import M from "materialize-css";
import "./style.css";
import RoastChart from "../RoastChart";
import CurrentNotes from "../CurrentNotes";
import StartRoastForm from "../StartRoastForm";
import RoastForm from "../RoastForm";

class CurrentRoast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roastTime: "",
      currentTemp: "",
      batchWeight: 0,
      charge: "",
      turn: 0,
      change: 0,
      first: 0,
      drop: 0,
      notes: "test",
      chartLabels: [],
      chartPoints: [],
      finished: false,
      user: this.props.user,
      inventory: [],
      started: false,
    };
    this.startRoast = this.startRoast.bind(this);
    this.tempChange = this.tempChange.bind(this);
    this.eventSubmit = this.eventSubmit.bind(this);
    this.saveRoast = this.saveRoast.bind(this);
    this.resetState = this.resetState.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  componentDidMount() {
    this.getInventory();
    this.resetState();
    M.AutoInit();
  }

  startRoast(coffeeName, chargeTemp, greenId, batchWeight, invWeight) {
    console.log(greenId);
    this.setState({
      charge: { time: "0:00", temp: chargeTemp },
      name: coffeeName,
      started: true,
      currentTemp: chargeTemp,
      greenId: greenId,
      batchWeight: batchWeight,
      invWeight: invWeight,
    });
    this.updateChart("0:00", chargeTemp);
  }

  tempChange(e) {
    this.setState({
      currentTemp: e.target.value,
      started: true,
    });
  }

  updateNotes(val) {
    this.setState({ notes: val });
    console.log(this.state.notes);
  }

  eventSubmit(event, time) {
    var mins = Math.floor(time / 60000);
    var secs = ((time % 60000) / 1000).toFixed(0);
    const eventTime = mins + ":" + (secs < 10 ? "0" : "") + secs;
    const eventName = event;
    const currentTemp = this.state.currentTemp;
    if (eventName === "drop") {
      this.setState({
        finished: true,
        drop: { time: eventTime, temp: this.state.temp },
      });
    }

    this.setState({ [eventName]: { time: eventTime, temp: currentTemp } });
    this.updateChart(eventTime, currentTemp);
    console.log(this.state);
  }

  updateChart(time, temp) {
    let labels = this.state.chartLabels;
    let points = this.state.chartPoints;
    points.push({ x: time, y: temp });
    labels.push(time);
    this.setState({
      chartLables: labels,
      chartPoints: points,
    });
  }

  cancelSubmit(e) {
    e.preventDefault();
  }

  // save roast and push to database and update weight in inventory
  saveRoast() {
    const {
      name,
      batchWeight,
      invWeight,
      charge,
      turn,
      change,
      first,
      drop,
      notes,
      user,
      greenId,
    } = this.state;
    console.log(user);
    const newWeight = invWeight - batchWeight;
    axios
      .post(`/api/roasts`, {
        name: name,
        weight: batchWeight,
        charge: charge,
        turn: turn,
        change: change,
        first: first,
        drop: drop,
        notes: notes,
        user: user,
      })
      .then((res) => {
        console.log(res);
        axios.put(`/api/coffees/${greenId}`, { weight: newWeight });
        this.resetState();
      });
  }

  // get inventory to use in start roast form
  getInventory = async () => {
    const userInv = this.props.auth.user.id;
    const green = await axios.get(`/api/coffees/${userInv}`);
    this.setState({
      inventory: green.data,
      firstGreenInv: green.data[0].weight,
    });
  };

  // reset state to default values for next roast
  resetState() {
    this.setState({
      greenId: "",
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
      chartLabels: [],
      chartPoints: [],
      finished: false,
      started: false,
      invWeight: 0,
    });
  }

  render() {
    return (
      <div className="mainWrapper col s10 offset-s1 left-align">
        <Timer
          startImmediately={false}
          formatValue={(value) => `${value < 10 ? `0${value}` : value}:`}
        >
          {({ start, stop, getTime, reset }) => (
            <>
              {/* Form to start timer and roast */}
              {!this.state.started ? (
                <StartRoastForm
                  start={start}
                  startRoast={this.startRoast}
                  inventory={this.state.inventory}
                  // initialInvWeight={this.state.initialInvWeight}
                />
              ) : (
                <div className="row">
                  <RoastForm
                    cancelSubmit={this.cancelSubmit}
                    finished={this.state.finished}
                    currentTemp={this.state.currentTemp}
                    tempChange={this.tempChange}
                    turn={this.state.turn}
                    change={this.state.change}
                    first={this.state.first}
                    eventSubmit={this.eventSubmit}
                    stop={stop}
                    reset={reset}
                    getTime={getTime}
                    saveRoast={this.saveRoast}
                  />

                  {/* Form to add Notes to roast */}
                  <CurrentNotes updateNotes={this.updateNotes} />
                </div>
              )}

              {/* Time Display */}
              <div id="timerWrapper" className="row center-align">
                <h4>
                  <Timer.Minutes />
                  <Timer.Seconds
                    formatValue={(value) =>
                      `${value < 10 ? `0${value}` : value}`
                    }
                  />
                </h4>
              </div>

              {/* Roast Curve for current roast, dynamically updated from state */}

              <RoastChart
                labels={this.state.chartLabels}
                points={this.state.chartPoints}
                name={this.state.name}
                start={start}
              />
            </>
          )}
        </Timer>
      </div>
    );
  }
}

CurrentRoast.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CurrentRoast);
