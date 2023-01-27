import React, { Component } from "react";
import "../../static/styles/Navbar.css";
import Logo from "../../static/images/logo.png";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="nav-block sticky">
        <a href="#title">
          <img src={Logo} style={{ height: 15 }} />
        </a>
      </div>
    );
  }
}

export default Navbar;
