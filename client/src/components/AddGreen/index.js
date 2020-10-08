import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class AddGreen extends Component {

  constructor() {
      super();
      this.state= {
        name: "", 
        process: "",
        country: "", 
        weight: "",
        cost: ""
      }
  };

  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  onChangeName(e) {
      this.setState({name:e.target.value})
  };
  onChangeProcess(e) {
      this.setState({process:e.target.value})
  };
  onChangeCountry(e) {
      this.setState({country:e.target.value})
  };
  onChangeWeight(e) {
      this.setState({weight:e.target.value})
  };
  onChangeCost(e) {
      this.setState({cost:e.target.value})
  };

  addCoffee = async() => {

  };

  render() {
    return (
        <div>
            {/* add green link to open model with add green form */}
            <a className="waves-effect waves-light modal-trigger" data-target="modal1">
            <p className="valign-wrapper center-align">Add Coffee<span className="material-icons green-text ">add_circle</span></p>
            </a>

            {/* modal with add green form */}
            <div
                ref={Modal => {
                    this.Modal = Modal;
                }}
                id="modal1"
                className="modal"
            >
              <div className="modal-content">
                <div className="row">
                    <h3>Add New Coffee</h3>
                    <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">local_offer</i>
                            <input id="newName" type="text" className="validate" onChange={this.onChangeName.bind(this)} />
                            <label for="newName">Coffee Name</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix">category</i>
                            <input id="newProcess" type="text" className="validate" onChange={this.onChangeProcess.bind(this)} />
                            <label for="newProcess">Process</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <i className="fas fa-ship"></i>
                            <input id="newCountry" type="text" className="validate" onChange={this.onChangeCountry.bind(this)} />
                            <label for="newCountry">Country</label>
                        </div>
                        <div className="input-field col s4">
                        <i className="fas fa-weight-hanging"></i>
                            <input id="newWeight" type="text" className="validate" onChange={this.onChangeWeight.bind(this)} />
                            <label for="newWeight">Weight in pounds</label>
                        </div>
                        <div className="input-field col s4">
                            <i className="material-icons prefix">attach_money</i>
                            <input id="newCost" type="text" className="validate" onChange={this.onChangeCost.bind(this)} />
                            <label for="newCost">Cost per pound</label>
                        </div>
                    </div>
                    </form>
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.addCoffee.bind(this)}>Submit
                    <i className="material-icons right">add_box</i>
                    </button>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

AddGreen.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps)(AddGreen);
