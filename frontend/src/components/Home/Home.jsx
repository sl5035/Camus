import React, { Component } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "../../static/styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Title from "./Title.jsx";
import HomeBody from "./HomeBody.jsx";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Helmet>
          <title>Camus</title>
          <meta name="description" content="Camus" />
        </Helmet>
        <Title />
        <HomeBody />
      </div>
    );
  }
}

export default Home;
