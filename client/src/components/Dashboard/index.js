import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends Component {

  render() {
    const { user } = this.props.auth;
    console.log(this.props.auth);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            {/* <RecentRoasts user={user.id}/>
            <RecentMsg user={user.id}/>
            <RecentInv user={user.id}/> */}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
