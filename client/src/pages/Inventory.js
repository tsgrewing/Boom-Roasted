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
        <div className="row mainRow">
          <div className="mainWrapper col s10 offset-s1 center-align">
            <h4>
              <b>Current Inventory</b>
            </h4>
          <InvTable />
          </div>

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
