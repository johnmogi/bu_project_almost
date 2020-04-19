import React, { Component, ChangeEvent } from "react";
import axios from "axios";
import { CredentialsModel } from "../../models/credentials-model";
import { UserModel } from "../../models/user-model";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Unsubscribe } from "redux";

const port = 3012;

interface LoginState {
  credentials: CredentialsModel;
}

export class Login extends Component<any, LoginState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = { credentials: new CredentialsModel() };
    this.unsubscribe = store.subscribe(() => {
      this.setState({ credentials: store.getState().user });
    });
  }

  public render() {
    return (
      <div className="login">
        <h3>You May now Enter the Time travel machine</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Your User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your User Name"
              onChange={this.setUsername}
              value={this.state.credentials.userName || ""}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.setPassword}
              value={this.state.credentials.password || ""}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={this.login}>
            Enter the Time Travel Machine
          </Button>
        </Form>

        <h3>You can also register here: </h3>
        <NavLink to="/signup" exact>
          Register
        </NavLink>
      </div>
    );
  }

  private setUsername = (args: ChangeEvent<HTMLInputElement>) => {
    const username = args.target.value;
    const credentials = { ...this.state.credentials };
    credentials.userName = username;
    this.setState({ credentials });
  };

  private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
    const password = args.target.value;
    const credentials = { ...this.state.credentials };
    credentials.password = password;
    this.setState({ credentials });
  };

  private login = async () => {
    try {
      const response = await axios.post<UserModel>(
        `http://localhost:${port}/api/auth/login`,
        this.state.credentials,
        { withCredentials: true }
      );
      const user = response.data;
      store.dispatch({ type: ActionType.Login, payload: user });
      this.props.history.push("/vacations");
    } catch (err) {
      toast.error(err.response ? err.response.data : err.message);
    }
  };
}
