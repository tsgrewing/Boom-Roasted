import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import InvTable from "../Inventory";


class AddGreen extends Component {

  constructor() {

      super();
      this.state= {
        name: "", 
        process: "",
        country: "", 
        weight: "",
        cost: "",

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
          this.props.tableUpdate();
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

  onChange = e => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);
  }

  addCoffee = e => {
    e.preventDefault();
    const user = this.props.auth.user.id;
    const {name, process, country, cost, weight} = this.state;
    console.log({ name, process, country, cost, weight, user })
    axios.post("/api/coffees/", { name, process, country, cost, weight, user })
        .then((res) => {
            console.log(res)
      });
    
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
                    <form className="col s12" onSubmit={this.addCoffee}>
                    <div className="row">
                        <div className="input-field col s6">
                            <i class="prefix fas fa-tag"></i>
                            <input id="newName" type="text" className="validate" name="name" onChange={this.onChange} />
                            <label htmlFor="newName">Coffee Name</label>
                        </div>
                        <div className="input-field col s6">
                            <i class="prefix fas fa-shapes"></i>
                            <input id="newProcess" type="text" className="validate" name="process" onChange={this.onChange} />
                            <label htmlFor="newProcess">Process</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <i className="prefix fas fa-globe"></i>
                            <input id="newCountry" type="text" className="validate" name="country" onChange={this.onChange} />
                            <label htmlFor="newCountry">Country</label>
                        </div>
                        <div className="input-field col s4">
                        <i className="prefix fas fa-weight-hanging"></i>
                            <input id="newWeight" type="text" className="validate" name="weight" onChange={this.onChange} />
                            <label htmlFor="newWeight">Weight in pounds</label>
                        </div>
                        <div className="input-field col s4">
                            <i class="prefix fas fa-dollar-sign"></i>
                            <input id="newCost" type="text" className="validate" name="cost" onChange={this.onChange} />
                            <label htmlFor="newCost">Cost per pound</label>
                        </div>
                    </div>
                    </form>
                    <div className="center-align">
                        <button className="center-align btn waves-effect waves-light modal-close" type="submit" onClick={this.addCoffee} name="action">Submit
                        <i className="material-icons right">add_box</i>
                        </button>
                    </div>
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
