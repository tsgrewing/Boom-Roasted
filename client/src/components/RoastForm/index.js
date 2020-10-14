import React, { Component } from "react";

class RoastForm extends Component {
  render() {
    return (
      <>
        {!this.props.finished ? (
          <div className="col s6">
            <fieldset>
              <legend>Roast Event</legend>
              <form id="roastEventsForm" onSubmit={this.props.cancelSubmit}>
                <div className="row center-align">
                  <div className="input-field col s6">
                    <label htmlFor="eventTemp">Event Temp</label>
                    <input
                      type="number"
                      className="col s-12"
                      // value={this.props.currentTemp}
                      onChange={this.props.tempChange}
                      name="eventTemp"
                    ></input>
                  </div>

                  <div className="btnCol col s6 center-align input-field">
                    <div className="row center-align">
                      {this.props.turn === 0 ? (
                        <button
                          className="eventBtn waves-effect waves-light btn "
                          type="button"
                          value="turn"
                          onClick={(e) => {
                            const event = e.target.value;
                            const time = this.props.getTime();
                            this.props.eventSubmit(event, time);
                          }}
                        >
                          Turn
                        </button>
                      ) : this.props.change === 0 ? (
                        <button
                          className="eventBtn waves-effect waves-light btn  "
                          type="button"
                          value="change"
                          onClick={(e) => {
                            const event = e.target.value;
                            const time = this.props.getTime();
                            this.props.eventSubmit(event, time);
                          }}
                        >
                          Color Change
                        </button>
                      ) : this.props.first === 0 ? (
                        <button
                          className="eventBtn waves-effect waves-light btn "
                          type="button"
                          value="first"
                          onClick={(e) => {
                            const event = e.target.value;
                            const time = this.props.getTime();
                            this.props.eventSubmit(event, time);
                          }}
                        >
                          First Crack
                        </button>
                      ) : (
                        <button
                          className="eventBtn waves-effect waves-light btn "
                          type="button"
                          value="drop"
                          onClick={(e) => {
                            const event = e.target.value;
                            const time = this.props.getTime();
                            this.props.stop();
                            this.props.reset();
                            this.props.eventSubmit(event, time);
                          }}
                        >
                          Drop
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        ) : (
          <div className="col s-6 center-align valign-center">
            <fieldset>
              <legend>Submit Roast</legend>
              <button
                type="button"
                className="waves-effect waves-light btn"
                onClick={this.props.saveRoast}
              >
                Save Roast
              </button>
            </fieldset>
          </div>
        )}
      </>
    );
  }
}


export default RoastForm;