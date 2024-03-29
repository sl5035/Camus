/* eslint-disable quotes */
/* eslint-disable react/state-in-constructor */

import React, { Component } from "react";
import "../../static/styles/Home.css";
import "../../static/styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Chevron from "../../static/images/chevron.png";

class Title extends Component {
  state = {};

  render() {
    return (
      <div id="title">
        <div className="nav-block" />
        <div className="title-block">
          <div className="container title">
            <h1 style={{ fontSize: 45, marginBottom: 0 }} className="bolder">
              Temporary Title
            </h1>
            <h2 style={{ fontSize: 25, marginTop: 10 }} className="mb-3">
              Temporary Subtitle
            </h2>
            <a href="#body">
              <button className="my-5 btn-primary" type="button">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="bolder me-2">Get Started</div>
                  <img src={Chevron} style={{ height: 15 }} alt="" />
                </div>
              </button>
            </a>
          </div>
        </div>
        <div className="second-block mb-5" />
      </div>
    );
  }
}

export default Title;
