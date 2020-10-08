import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";

class Logout extends Component {
    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };
  
    render() {
      return (
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
        >
        Logout
        </button>
      );
    }
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Logout);
  