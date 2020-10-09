import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RoastHistory from "../components/RoastHistory";


class History extends Component {

  render() {

    return (
      <div className="container valign-wrapper main-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Roast History</b>
            </h4>
          </div>
          <RoastHistory />
        </div>
      </div>
    );
  }
}

History.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(History);
