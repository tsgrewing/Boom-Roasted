import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout"

class Roast extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <Navbar />
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You're ready to roast
              </p>
            </h4>
          </div>
        </div>
      </div>
      <Logout />
      </div>
    );
  }
}

Roast.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Roast);
