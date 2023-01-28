import React, { Component } from "react";
import "../../static/styles/Navbar.css";
import Logo from "../../static/images/logo.png";
import Insta from "../../static/images/instagram.png";
import Twitter from "../../static/images/twitter.png";
import Paypal from "../../static/images/paypal.png";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="footer-block">
        <div className="container" style={{ padding: 0 }}>
          <div
            className={"nav-logo float-left"}
            style={{ display: "inline-block" }}
          >
            <div className="nav-container">
              <a href="#title" className="me-4">
                <img src={Logo} style={{ height: 20 }} />
              </a>
              <a href="https://www.instagram.com/robin.lee.002/" className="me-2">
                <img src={Insta} style={{ height: 25 }} />
              </a>
              <a href="https://twitter.com/Alex_Tang0" className="me-2">
                <img src={Twitter} style={{ height: 25 }} />
              </a>
              <a href="#title" className="me-2">
                <img src={Paypal} style={{ height: 25 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
