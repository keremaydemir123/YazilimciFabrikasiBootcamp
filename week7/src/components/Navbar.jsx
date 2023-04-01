import React, { Component } from "react";
import { Link } from "react-router-dom";
import Basket from "./Basket";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <h1>LOGO</h1>
        </Link>
        <Basket />
      </div>
    );
  }
}
