import * as React from "react";
import { Component, ChangeEvent } from "react";
import { VacsModel } from "../models/vacs-model";
import { Unsubscribe } from "redux";
import { store } from "../redux/store";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import "./vacations.css";

import { UserModel } from "../models/user-model";
import { toast } from "react-toastify";

const PORT = process.env.PORT || 3012;

interface VacationsState {
  user: UserModel;
  vacs: VacsModel[];
  userLogged: boolean;
  vacsFollowed: VacsModel[];
}

export class Vacations extends Component<any, VacationsState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      user: store.getState().user,
      vacs: store.getState().vacations,
      userLogged: store.getState().userLogged,
      vacsFollowed: store.getState().vacsFollowed
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState({ user: store.getState().user });
      this.setState({ vacs: store.getState().vacations });
      this.setState({ userLogged: store.getState().userLogged });
      this.setState({ vacsFollowed: store.getState().vacsFollowed });
    });
  }

  public async componentDidMount() {
    try {
      fetch(`http://localhost:${PORT}/api/vacations`)
        .then(res => res.json())
        .then(vacs => this.setState({ vacs }))
        .catch(err => toast.error(err.message));
    } catch (err) {
      toast.error(err.message);
    }
    if (store.getState().userLogged) {
      try {
        const id = +this.state.user.userID;
        fetch(`http://localhost:${PORT}/api/auth/follow/${id}`)
          .then(response => response.json())
          .then(vacsFollowed => this.setState({ vacsFollowed }))
          .catch(err => toast.error(err.message));
      } catch (err) {
        toast.error(err.message);
      }
    }
  }

  public addUserFollowedVacs = (args: ChangeEvent<HTMLInputElement>) => {
    if (this.state.userLogged === false) {
      toast.error("Only logged in users can follow vacations");
      return;
    }
    const vacs = [...this.state.vacs];
    const newVacsFollowed = [...this.state.vacsFollowed];

    for (let i = 0; i < this.state.vacsFollowed.length; i++) {
      const index = vacs.findIndex(
        v => v.vacationID === newVacsFollowed[i].vacationID
      );
      const vacation = vacs[index];
      vacation.follow = true;
      vacs.splice(index, 1);
      vacs.unshift(vacation);
      this.setState({ vacs: vacs });
    }
  };
  private getUserFollowedVacs = (args: ChangeEvent<HTMLInputElement>) => {
    if (store.getState().userLogged === false) {
      toast.error("Only logged in users can follow vacations");
      return;
    }
    const vacationID = +args.target.value;
    const userID = +this.state.user.userID;
    console.log(userID);
    const sendInfo = `{ "userID": ${userID}, "vacationID": ${vacationID} }`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(sendInfo)
    };
    // console.log(options);
    fetch(
      `http://localhost:${PORT}/api/auth/follow/${vacationID}/${userID}`,
      options
    )
      .then(response => response.json())
      .then(res => {
        this.state.vacsFollowed.push(res);
        toast("Vacation has been added to follow list");
      })
      .catch(err => console.log(err.message));
  };
  render() {
    return (
      <section className="card0">
        <Row className="vacations justify-content-md-center">
          {this.state.vacs.map(v => (
            <Col sm={1} md={2} xl={4} key={v.vacationID}>
              <Card>
                {this.state.userLogged &&
                  this.state.user.role === "User" &&
                  !this.props.follow && (
                    <input
                      type="checkbox"
                      value={v.vacationID}
                      onChange={this.getUserFollowedVacs}
                    />
                  )}

                {this.state.userLogged &&
                  this.state.user.role === "User" &&
                  this.props.follow && <input type="checkbox" checked></input>}
                <img
                  className="image-card-top"
                  src={`/assets/images/${v.picFileName}`}
                />
                <Card.Body>
                  <Card.Title>{v.destination}</Card.Title>
                  <Card.Text>{v.description}</Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Portal leaves on : {v.startDate}
                  </ListGroup.Item>
                  <ListGroup.Item>Costs :{v.price} $</ListGroup.Item>
                  <ListGroup.Item>Time ends on : {v.endDate}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    );
  }
}
