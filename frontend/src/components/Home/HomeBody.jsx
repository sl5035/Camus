import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../../static/styles/Home.css";

import TempImg from "../../static/images/tomato.png";
import TempImg2 from "../../static/images/watermelon.png";
import Divider from "../../static/images/divider.png";

class HomeBody extends Component {
  state = {};
  render() {
    return (
      <div id="body">
        <div
          className="container px-5"
          style={{ display: "block", marginLeft: 25 }}
        >
          <div className="d-flex">
            <h3 style={{ float: "left", fontWeight: 900 }}>Popular Products</h3>
          </div>
          <div className="d-flex mt-3">
            {/* very temporary for now, just placeholders, need to create separate card function */}
            <div className="me-5">
              <Card.Img className="d-flex medium-card-size" src={TempImg2} />
              <div className="bolder d-flex pt-2 ps-3">Item Title</div>
              <div className="d-flex ps-3">Item Cost</div>
            </div>
            <div className="me-5">
              <Card.Img className="d-flex medium-card-size" src={TempImg2} />
              <div className="bolder d-flex pt-2 ps-3">Item Title</div>
              <div className="d-flex ps-3">Item Cost</div>
            </div>
            <div className="me-5">
              <Card.Img className="d-flex medium-card-size" src={TempImg2} />
              <div className="bolder d-flex pt-2 ps-3">Item Title</div>
              <div className="d-flex ps-3">Item Cost</div>
            </div>
          </div>
          <div className="d-flex my-3">
            <div className="me-5">
              <Card.Img className="d-flex medium-card-size" src={TempImg2} />
              <div className="bolder d-flex pt-2 ps-3">Item Title</div>
              <div className="d-flex ps-3">Item Cost</div>
            </div>
            <div className="me-5">
              <Card.Img className="d-flex medium-card-size" src={TempImg2} />
              <div className="bolder d-flex pt-2 ps-3">Item Title</div>
              <div className="d-flex ps-3">Item Cost</div>
            </div>
            <div className="me-5">
              <Card.Img className="d-flex medium-card-size" src={TempImg2} />
              <div className="bolder d-flex pt-2 ps-3">Item Title</div>
              <div className="d-flex ps-3">Item Cost</div>
            </div>
          </div>
          <div className="d-flex my-5" style={{justifyContent: 'center'}}>
              <img src={Divider} style={{height: 12}} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeBody;
