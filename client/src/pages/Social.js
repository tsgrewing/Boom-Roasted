import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Messages from "../components/Messages";

class Social extends Component {

  render() {

    return (
        <div className="row center-align">
          <div className="landing-copy col s10 offset-s1 center-align">
            <Messages />
          </div>
        </div>
    );
  }
}

Social.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Social);
