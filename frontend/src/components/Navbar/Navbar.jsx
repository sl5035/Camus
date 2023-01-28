import React, { Component, useState } from "react";
import "../../static/styles/Navbar.css";
import Logo from "../../static/images/logo.png";
import { render } from "@testing-library/react";

const Navbar = () => {
  const [shadow, setShadow] = useState(false);
  const changeShadow = () => {
    if (window.scrollY >= 80) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  window.addEventListener("scroll", changeShadow);

  return (
    <div
      className={shadow ? "nav-block sticky nav-shadow" : "nav-block sticky"}
      style={{ justifyContent: "space-between" }}
    >
      <div className="container" style={{padding: 0}}>
        <div
          className={shadow ? "nav-logo float-left" : "nav-logo"}
          style={{ display: "inline-block" }}
        >
          <div className="nav-container">
            <a href="#title" className="me-2">
              <img src={Logo} style={{ height: 20 }} />
            </a>
            <div style={{ color: "white", fontWeight: 900, fontSize: 'large' }}>
              <b>{shadow ? "Temporary Title" : null}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingRight: 30 }}>
        <div className="nav-menu">
          <button className="btn-signin me-2">
            <span className="bolder">Sign in</span>
          </button>
          <button className="btn-signup">
            <span className="bolder">Sign up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
