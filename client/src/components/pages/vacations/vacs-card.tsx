import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./vacations.css";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";

import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
// import { Action } from "../../redux/action";

import { VacsModel } from "../../models/vacs-model";
import { PublicUserModel } from "../../models/user-model";
import { ServerData } from "../../models/credentials-model";
// const PORT = process.env.PORT || 3012;

interface vacationState {
  vacs: VacsModel[];
  vacId: string;
  user: PublicUserModel;
  ServerData: ServerData;
  vacsFollowed: VacsModel[];
}

export class VacCard extends Component<any, vacationState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      ServerData: new ServerData(),
      user: store.getState().user,
      vacs: [],
      vacId: "",
      vacsFollowed: store.getState().vacsFollowed
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState({ user: store.getState().user });
      this.setState({ vacs: store.getState().vacations });
      this.setState({ vacsFollowed: store.getState().vacsFollowed });
    });
  }
  public componentWillUnmount = () => {
    this.unsubscribe();
  };

  // CMPDMNT
  // const vacationId = this.props.match.params.vacId;
  // this.setState({ vacId: vacationId });

  public getUserFollowedVacs = (props: any) => {
    const id = this.props.vacationID;
    const user = this.state.user.userID;
    toast(id + user);
  };

  public render(): JSX.Element {
    return (
      <Card key={this.props.vacationID}>
        {this.state.user &&
          this.state.user.role === "User" &&
          !this.props.follow && (
            <input
              type="checkbox"
              value={this.props.vacationID}
              onChange={this.getUserFollowedVacs}
            />
          )}

        {this.state.user &&
          this.state.user.role === "User" &&
          this.props.follow && <input type="checkbox" checked></input>}

        <Card.Body>
          <Card.Title>{this.props.destination}</Card.Title>
          <Link to={`/vacations/${this.props.vacationID}`}>
            <Card.Img
              src={`/assets/images/${this.props.picFileName}`}
              alt={this.props.description}
            />
          </Link>
          <Card.Text>
            <ul>
              <li>{this.props.description}</li>
              <li>startDate : {this.props.startDate}</li>
              <li> endDate : {this.props.endDate}</li>

              <li> price :{this.props.price} $</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
