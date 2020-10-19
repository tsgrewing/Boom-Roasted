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
          
            <button className="navbtn hoverable" title="Logout"  onClick={this.onLogoutClick}><i className="fas fa-sign-out-alt white-text"></i></button>
          
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
  