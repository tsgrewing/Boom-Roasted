import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CurrentRoast from "../components/CurrentRoast";


class Roast extends Component {
  constructor(props) {
    super(props);
      this.state= {
        user: this.props.auth.user.id,
      }
  }


  render() {

    return (

          <div className="container center-align">
            <CurrentRoast 
            user={this.state.user}/>
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
