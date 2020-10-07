import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link to="/" style={{fontFamily: "monospace"}} className="col s5 brand-logo center black-text">
              <span className="material-icons">local_fire_department</span>
              Boom, Roasted
              <span className="material-icons">local_cafe</span>
            </Link>
            <button
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
