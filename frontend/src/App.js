import logo from "./logo.svg";
import { HelmetProvider } from "react-helmet-async";
import "./static/styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Footer from "./components/Navbar/Footer.jsx"

function App() {
  const helmetContext = {};
  return (
    <div className="App">
      <HelmetProvider context = {helmetContext}>
        <Navbar />
        <Home />
        <Footer />
      </HelmetProvider>
    </div>
  );
}

export default App;
