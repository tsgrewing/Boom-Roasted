import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CurrentRoast from "../components/CurrentRoast";


class Roast extends Component {



  render() {

    return (

          <div className="container center-align">
            <CurrentRoast />
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
