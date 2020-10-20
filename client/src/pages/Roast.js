import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CurrentRoast from "../components/CurrentRoast";
import Navbar from "../components/Navbar";

class Roast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.auth.user.id,
    };
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="row mainRow">
          <CurrentRoast user={this.state.user} />
        </div>
      </>
    );
  }
}

Roast.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Roast);
