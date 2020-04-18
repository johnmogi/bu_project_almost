import React, { Component, ChangeEvent } from "react";
import { UserModel, NewUserModel } from "../../models/user-model";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
// import { Unsubscribe } from "redux";

const PORT = process.env.PORT || 3012;

interface SignState {
  users: UserModel[];
  newUser: NewUserModel;
}

export class Register extends Component<any, SignState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      newUser: new NewUserModel()
    };
  }
  public componentDidMount(): void {
    fetch(`http://localhost:${PORT}/api/auth/users`)
      .then(response => response.json())
      .then(users => this.setState({ users }))
      .catch(err => toast.error(err.message));
  }

  private setName = (args: ChangeEvent<HTMLInputElement>) => {
    const firstName = args.target.value;
    const newUser = { ...this.state.newUser };
    newUser.firstName = firstName;
    this.setState({ newUser });
  };

  private setLName = (args: ChangeEvent<HTMLInputElement>) => {
    const lastName = args.target.value;
    const newUser = { ...this.state.newUser };
    newUser.lastName = lastName;
    this.setState({ newUser });
  };

  private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
    const userName = args.target.value;
    const newUser = { ...this.state.newUser };
    newUser.userName = userName;
    this.setState({ newUser });
  };

  private setUserPassword = (args: ChangeEvent<HTMLInputElement>) => {
    const password = args.target.value;
    const newUser = { ...this.state.newUser };
    newUser.password = password;

    this.setState({ newUser });
  };

  private addUserForm = () => {
    const user = this.state.newUser;

    if (!user.firstName || !user.lastName || !user.password) {
      toast.error("Make sure to fill all fields, check again");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state.newUser)
    };
    fetch(`http://localhost:${PORT}/api/auth/register`, options)
      .then(response => response.json())
      .then(user => toast.success("You have successfully registered"))
      .catch(err => toast.error(err));
    this.props.history.push("/login");
  };

  render() {
    return (
      <Container className="register">
        <h2> New here? Welcome aboard...</h2>
        <form autoComplete="off">
          <Form.Group>
            <Form.Control
              required
              id="firstName"
              placeholder="Enter Your Name"
              onChange={this.setName}
              value={this.state.newUser.firstName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              id="LastName"
              placeholder="Enter Your Family Name"
              onChange={this.setLName}
              value={this.state.newUser.lastName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              id="userName"
              placeholder="Set Desired User Name"
              onChange={this.setUserName}
              value={this.state.newUser.userName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              id="password"
              placeholder="Set Desired Password"
              onChange={this.setUserPassword}
              value={this.state.newUser.password}
            />
          </Form.Group>
          <Button
            onClick={this.addUserForm}
            className="primary btn btn-primary"
          >
            Sign me up, Scottie!
          </Button>
        </form>
      </Container>
    );
  }
}
