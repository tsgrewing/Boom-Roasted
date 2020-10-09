import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logout from "../Logout"
import "./style.css";


class Navbar extends Component {

  render() {
    const isLoggedIn = this.props.auth.isAuthenticated;
    return (
      <header>
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white center">
            <Link to="/dashboard" style={{fontFamily: "monospace"}} className="col s5 black-text">
            <button className="navbtn" title="Home"><i className="fas fa-home"></i></button>
            </Link>
            <Link to="/roast" style={{fontFamily: "monospace"}} className="col s5 black-text">
            <button className="navbtn" title="Roast"><i className="fas fa-fire"></i></button>
            </Link>
            <Link to="/history" style={{fontFamily: "monospace"}} className="col s5 black-text">
            <button className="navbtn" title="History"><i className="fas fa-history"></i></button>
            </Link>
            <Link to="/inventory" style={{fontFamily: "monospace"}} className="col s5 black-text">
            <button className="navbtn" title="Inventory"><i className="fas fa-boxes"></i></button>
            </Link>
            <Link to="/social" style={{fontFamily: "monospace"}} className="col s5 black-text">
            <button className="navbtn" title="Social"> <i className="fas fa-users"></i></button>
            </Link>
            {isLoggedIn && <Logout />}

          </div>
        </nav>
      </div>
      </header>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth
});

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Navbar);
