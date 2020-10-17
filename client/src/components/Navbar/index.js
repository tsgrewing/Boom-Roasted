import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logout from "../Logout"
import "./style.css";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.auth.user
    }
  };

  componentDidMount() {
    let sidenav = document.querySelector('#mobile-menu');
    M.Sidenav.init(sidenav, {});
  }

  render() {
    const isLoggedIn = this.props.auth.isAuthenticated;
    return (
      <header>
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper green center">
          <a href="#" data-target="mobile-menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <div class="center hide-on-med-and-down">
          
            <Link to="/dashboard" style={{fontFamily: "monospace"}} className="col navLinkContainer">
            <button className="navbtn" title="Home"><i className="fas fa-home white-text"></i></button>
            </Link>
            
            <Link to="/roast" style={{fontFamily: "monospace"}} className="col navLinkContainer">
            <button className="navbtn" title="Roast"><i className="fas fa-fire white-text"></i></button>
            </Link>
            
            <Link to="/history" style={{fontFamily: "monospace"}} className="col navLinkContainer">
            <button className="navbtn" title="History"><i className="fas fa-history white-text"></i></button>
            </Link>
            
            <Link to="/inventory" style={{fontFamily: "monospace"}} className="col navLinkContainer">
            <button className="navbtn" title="Inventory"><i className="fas fa-boxes white-text"></i></button>
            </Link>
            
            <Link to="/social" style={{fontFamily: "monospace"}} className="col navLinkContainer">
            <button className="navbtn" title="Social"><i className="fas fa-users white-text"></i></button>
            </Link>
            
            {isLoggedIn && <Logout />}
            </div>

          </div>
        </nav>
      </div>
      <ul class="sidenav white-text" id="mobile-menu">
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/roast">Roast</Link></li>
              <li><Link to="/history">Roast History</Link></li>
              <li><Link to="/inventory">Inventory</Link></li>
              <li><Link to="/social">Social</Link></li>

            </ul>
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
