import React, { Component } from "react";
import { Link } from "react-router-dom";


class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <header>
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link to="/" style={{fontFamily: "monospace"}} className="col s5 brand-logo center black-text">
              <span className="material-icons">local_fire_department</span>
              Boom, Roasted
              <span className="material-icons">local_cafe</span>
            </Link>

          </div>
        </nav>
      </div>
      </header>
    );
  }
};

export default (Navbar);
