import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";

class EditBtn extends Component {

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

  updateCoffee (e) {
console.log(e.target.value)
    e.preventDefault();
    axios.delete(`/api/coffees/${e.target.value}`)
        .then((res) => {
            console.log(res)
      });
    
  };

  render() {
    return (
    <>
        <button className="btn-floating btn-small waves-effect waves-light green modal-trigger" data-target={"modal"+this.props.coffee._id}><i className="far fa-edit"></i></button>
        {/* modal to confirm */}
        <div
            ref={Modal => {
                this.Modal = Modal;
            }}
            id={"modal"+this.props.coffee._id}
            className="modal"
        >

          <div className="modal-content">
            <div className="row">
                <h3>Editing {this.props.coffee.name}</h3>
                <form className="col s12" onSubmit={this.updateCoffee}>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="prefix fas fa-tag"></i>
                        <input id="newName" type="text" className="validate" name="name" defaultValue={this.state.name} onChange={this.onChange} />
                        <label htmlFor="newName">Coffee Name</label>
                    </div>
                    <div className="input-field col s6">
                        <i className="prefix fas fa-shapes"></i>
                        <input id="newProcess" type="text" className="validate" name="process" defaultValue={this.state.process} onChange={this.onChange} />
                        <label htmlFor="newProcess">Process</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <i className="prefix fas fa-globe"></i>
                        <input id="newCountry" type="text" className="validate" name="country" defaultValue={this.state.country} onChange={this.onChange} />
                        <label htmlFor="newCountry">Country</label>
                    </div>
                    <div className="input-field col s4">
                    <i className="prefix fas fa-weight-hanging"></i>
                        <input id="newWeight" type="text" className="validate" name="weight" defaultValue={this.state.weight} onChange={this.onChange} />
                        <label htmlFor="newWeight">Weight in pounds</label>
                    </div>
                    <div className="input-field col s4">
                        <i className="prefix fas fa-dollar-sign"></i>
                        <input id="newCost" type="text" className="validate" name="cost" defaultValue={this.state.cost} onChange={this.onChange} />
                        <label htmlFor="newCost">Cost per pound</label>
                    </div>
                </div>
                </form>
                <div className="row">
                <div className="col s6 center-align">
                    <button className="center-align btn waves-effect waves-light modal-close green" type="submit" onClick={this.updateCoffee} name="action">Submit
                    <i className="far fa-save"></i>
                    </button>
                </div>
                <div className="col s6 center-align">
                    <button className="center-align btn waves-effect waves-light modal-close red" type="submit" onClick={e => e.preventDefault()} name="action">Cancel
                    <i className="far fa-window-close"></i>
                    </button>
                </div>
                </div>
            </div>
          </div>
        </div>
    </>
    );
  }
};

export default EditBtn;