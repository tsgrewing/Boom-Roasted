import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Messages from "../components/Messages";
import Navbar from "../components/Navbar";

class Social extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="row mainRow">
          <div className="mainWrapper socialWrapper col s10 offset-s1 center-align">
            <Messages />
          </div>
        </div>
      </>
    );
  }
}

Social.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Social);
