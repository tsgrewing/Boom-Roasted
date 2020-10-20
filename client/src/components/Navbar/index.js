import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logout from "../Logout";
import "./style.css";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ReactTooltip from "react-tooltip";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.auth.user,
    };
  }

  componentDidMount() {
    let sidenav = document.querySelector("#mobile-menu");
    M.Sidenav.init(sidenav, {});
  }

  render() {
    const isLoggedIn = this.props.auth.isAuthenticated;
    return (
      <header>
        <div className="navbar-fixed green">
          <nav className="z-depth-0">
            <div className="nav-wrapper green center">
              {/* eslint-disable-next-line */}
              <a
                href="#"
                data-target="mobile-menu"
                id="mobileMenuLink"
                className="sidenav-trigger btn-flat show-on-med-and-down"
              >
                <i className="material-icons">menu</i>
              </a>
              <div className="center hide-on-med-and-down">
                <Link
                  to="/dashboard"
                  style={{ fontFamily: "monospace" }}
                  className="col navLinkContainer"
                >
                  <button
                    className="navbtn hoverable waves-effect waves-green"
                    data-tip="Home"
                  >
                    <i className="fas fa-home white-text"></i>
                  </button>
                </Link>

                <Link
                  to="/roast"
                  style={{ fontFamily: "monospace" }}
                  className="col navLinkContainer"
                >
                  <button
                    className="navbtn hoverable waves-effect waves-green"
                    data-tip="Roast"
                  >
                    <i className="fas fa-fire white-text"></i>
                  </button>
                </Link>

                <Link
                  to="/history"
                  style={{ fontFamily: "monospace" }}
                  className="col navLinkContainer"
                >
                  <button
                    className="navbtn hoverable waves-effect waves-green"
                    data-tip="History"
                  >
                    <i className="fas fa-history white-text"></i>
                  </button>
                </Link>

                <Link
                  to="/inventory"
                  style={{ fontFamily: "monospace" }}
                  className="col navLinkContainer"
                >
                  <button
                    className="navbtn hoverable waves-effect waves-green"
                    data-tip="Inventory"
                  >
                    <i className="fas fa-boxes white-text"></i>
                  </button>
                </Link>

                <Link
                  to="/social"
                  style={{ fontFamily: "monospace" }}
                  className="col navLinkContainer"
                >
                  <button
                    className="navbtn hoverable waves-effect waves-green"
                    data-tip="Message Board"
                  >
                    <i className="fas fa-users white-text"></i>
                  </button>
                </Link>

                <ReactTooltip
                className="navToolTip"
                place="bottom"
                type="success"
                />

                {isLoggedIn && <Logout />}
              </div>
            </div>
          </nav>
        </div>
        <ul className="sidenav white-text" id="mobile-menu">
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/roast">Roast</Link>
          </li>
          <li>
            <Link to="/history">Roast History</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/social">Social</Link>
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Navbar);
