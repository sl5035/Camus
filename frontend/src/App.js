import React from "react";
import { HelmetProvider } from "react-helmet-async";
import "./static/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Navbar/Footer";

function App() {
  const helmetContext = {};
  return (
    <div className="App">
      <HelmetProvider context={helmetContext}>
        <Navbar />
        <Home />
        <Footer />
      </HelmetProvider>
    </div>
  );
}

export default App;
