import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";

class DeleteGreen extends Component {

//   constructor() {

//       super();
//       this.state= {
//         name: "", 
//         process: "",
//         country: "", 
//         weight: "",
//         cost: "",

//       }
//   };

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

  deleteCoffee (e) {
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
        <button className="btn-floating btn-small waves-effect waves-light red modal-trigger" data-target={"modal"+this.props.coffee}><i className="far fa-trash-alt"></i></button>

        {/* modal to confirm */}
        <div
            ref={Modal => {
                this.Modal = Modal;
            }}
            id={"modal"+this.props.coffee}
            className="modal"
        >
          <div className="modal-content">
            <div className="row">
                <h3>Removing {this.props.coffee.name} from inventory...</h3>
                <br></br>
                <h4>Are you sure? This cannot be undone.</h4>
            </div>
            <div className="row">
            <div className="col s6 center-align">
                <button className="center-align btn waves-effect waves-light modal-close green" type="submit" onClick={this.deleteCoffee} name="action" value={this.props.coffee}>Yes, Delete
                <i className="far fa-trash-alt"></i>
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
    </>
    );
  }
};

export default DeleteGreen;