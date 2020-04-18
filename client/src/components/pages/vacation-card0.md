import React, { Component } from "react";
import { VacsModel } from "../models/vacs-model";
import { Unsubscribe } from "redux";
import { store } from "../redux/store";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import "./vacations.css";
import { UserModel } from "../models/user-model";

const PORT = process.env.PORT || 3012;

interface VacationState {
  vacations: VacsModel[];
  user: UserModel;
  vacsFollowed: VacsModel[];
}

export class VacationCard extends Component<any, VacationState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      vacations: store.getState().vacations,
      user: store.getState().user,
      vacsFollowed: store.getState().vacsFollowed
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState({ vacations: store.getState().vacations });
      this.setState({ user: store.getState().user });
      this.setState({ vacsFollowed: store.getState().vacsFollowed });
    });
  }
  public componentWillUnmount = () => {
    this.unsubscribe();
  };
  public render(): JSX.Element {
    return (
      <Card id={this.props.id}>
        <img
          className="image-card-top"
          src={`/assets/images/${this.props.picFileName}`}
        />
        <Card.Body>
          <Card.Title>{this.props.destination}</Card.Title>
          <Card.Text>{this.props.description}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Portal leaves on : {this.props.startDate}
          </ListGroup.Item>
          <ListGroup.Item>Costs :{this.props.price} $</ListGroup.Item>
          <ListGroup.Item>Time ends on : {this.props.endDate}</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}
