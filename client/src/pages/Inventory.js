import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logout from "../components/Logout";
import InvTable from "../components/Inventory";
import AddGreen from "../components/AddGreen";

class Inventory extends Component {


  render() {
    const { user } = this.props.auth;

    return (
    <div>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Current Inventory</b>
            </h4>
          </div>
            <InvTable />
            <a className="waves-effect waves-light modal-trigger" href="#modal1">
            <p className="valign-wrapper center-align">Add Coffee<span className="material-icons green-text ">add_circle</span></p>
            </a>
            <div id="modal1" className="modal">
              <div className="modal-content">
              <AddGreen />
              </div>
            </div>
        </div>
      </div>
      <Logout />
    </div>
    );
  }
}

Inventory.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Inventory);
