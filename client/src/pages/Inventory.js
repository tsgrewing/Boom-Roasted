import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InvTable from "../components/Inventory";
import Navbar from "../components/Navbar";


class Inventory extends Component {

  render() {

    return (
      <>
      <Navbar />
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Current Inventory</b>
            </h4>
          </div>
          <InvTable />

        </div>
      </>
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
