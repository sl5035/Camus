import React, { Component } from "react";
import "../../static/styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Chevron from "../../static/images/chevron.png";

class Title extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="title-block">
          <div className="container title">
            <h1 style={{ fontSize: 45, marginBottom: 0 }} className="bolder">
              Camus Trading
            </h1>
            <h2 style={{ fontSize: 25, marginTop: 10 }} className="mb-3">
              A Digital Marketplace
            </h2>
            <a href="#body">
            <button className="my-5 btn-primary">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="bolder me-2">Get Started</div>
                <img src={Chevron} style={{ height: 15 }} />
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
