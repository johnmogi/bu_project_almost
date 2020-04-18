import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";


import { NavLink } from "react-router-dom";

export class Homepage extends Component {
  public render() {
    return (
      <div className="homepage">
        <h1>Stop the world!</h1>
        <h3>
          We all want to get down...
          <br />
          During these troubled times- there is a conflict in the world...
          <br />
           Since all
          airports are shut down... there can be no vacation for the near future....
        </h3>
        <h5 className="orange">
          But not all hope is gone! thanks to Our genius geeks at "Travel Time Labs" &copy; have invented the time portal
          machine...
        </h5>

        <p>
          Make sure you register for an account so the time "Shenanigens" can
          start
        </p>
        <ButtonGroup className="mr-2" aria-label="First group">
          <NavLink className="nav-link" to="/signup" exact><Button variant="success">Sign up</Button></NavLink>
          <NavLink className="nav-link" to="/login" exact><Button variant="info">Sign in</Button></NavLink>
        </ButtonGroup>




      </div >
    );
  }
}
