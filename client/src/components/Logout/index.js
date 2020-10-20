import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";


class Logout extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <>
        <button
          className="navbtn hoverable"
          data-tip="Logout"
          onClick={this.onLogoutClick}
        >
          <i className="fas fa-sign-out-alt white-text"></i>
        </button>
        <ReactTooltip className="navToolTip" place="bottom" type="success" />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Logout);
