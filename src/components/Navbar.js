import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/lunario_logo.png"
import './styles/Navbar.css';
import GoogleAuth from "./GoogleAuth"

/* This class contains the component Navbar, is the responsible of the authentication
   process with oauth2*/
class Navbar extends React.Component {
  render() {
    return (
      <div className="Navbar">
        <div className="container-fluid">
          <Link className="Navbar__brand" to="/">
            <img className= "Navbar__brand-logo" src={logo} alt="logo"/>
            <span className="fuente1">Lunario</span>
          </Link>
          <GoogleAuth>
            Login
            </GoogleAuth>
        </div>
      </div>
    );
  }
}

export default Navbar;
