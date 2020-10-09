import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class Roast extends Component {

  render() {

    return (
      <div className="container valign-wrapper main-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Roasting</b>
            </h4>
          </div>
        </div>
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
