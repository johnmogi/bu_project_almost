import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Icon from "react-component-bytesize-icons";

import { PublicUserModel } from "../models/user-model";
import { store } from "../redux/store";
import { Unsubscribe } from "redux";
import "./header.css";
interface MenuState {
  userLogged: boolean;
  user: PublicUserModel;
}

export class Header extends Component<any, MenuState> {
  private unsubscribeStore: Unsubscribe;
  public constructor(props: any) {
    super(props);
    this.state = {
      userLogged: store.getState().userLogged,
      user: store.getState().user
    };
  }

  public componentDidMount(): void {
    this.unsubscribeStore = store.subscribe(() =>
      this.setState({
        userLogged: store.getState().userLogged,
        user: store.getState().user
      })
    );
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="header">
        <Navbar expand="lg">
          <NavLink className="nav-link" to="/" exact>
            <Navbar.Brand>
              <img src="\assets\images\logo.jpg" alt="Travel Time" width="120" />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink className="nav-link" to="/" exact>
                Home
              </NavLink>

              <NavLink className="nav-link" to="/vacations" exact>
                Vacations
              </NavLink>
              {this.state.userLogged && this.state.user.role === "Admin" && (
                <NavLink className="nav-link" to="/stats" exact>
                  Stats
                </NavLink>
              )}
              {this.state.userLogged && this.state.user.role === "Admin" && (
                <NavLink className="nav-link isAdmin" to="/admin" exact>
                  Admin
                </NavLink>
              )}
            </Nav>

            <div className="mr-sm-2">
              {this.state.userLogged && (
                <NavLink to="/logout" exact>
                  Logout
                </NavLink>
              )}
              <span>&nbsp;</span>
              <Badge pill variant="info">
                <Icon name="user" thickness="bold" size="small" />
                {this.state.user
                  ? this.state.user.firstName + " " + this.state.user.lastName
                  : "Guest"}
              </Badge>

              {!this.state.userLogged && (
                <Nav className="flex-column">
                  <NavLink to="/login" exact>
                    Login
                  </NavLink>
                  <NavLink to="/signup" exact>
                    Register
                  </NavLink>
                </Nav>
              )}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
