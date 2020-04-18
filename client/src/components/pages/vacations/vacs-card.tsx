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
const PORT = process.env.PORT || 3012;

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
      vacs: store.getState().vacations,
      vacId: "",
      vacsFollowed: store.getState().vacations
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState({ user: store.getState().user });
      this.setState({ vacs: store.getState().vacations });
      this.setState({ vacsFollowed: store.getState().vacations });
    });
  }
  public componentWillUnmount = () => {
    this.unsubscribe();
  };
  public componentDidMount = () => {
    if (this.state.user) {
      const id = this.state.user.userID
      fetch(`http://localhost:${PORT}/api/auth/followed-vacs/${id}`)
        .then(res => res.json())
        .then(vacsFollowed => this.setState({ vacsFollowed }))
        // .then(vacsFollowed => this.state.vacsFollowed.push(vacsFollowed))
        .catch(err => alert(err));
    }
    const allVacations = [...this.state.vacs];
    const followedVacations = [...this.state.vacsFollowed];
    console.log(allVacations.length)
  };



  private getUserFollowedVacs = () => {

    const vID = +this.props.id;
    const uID = +this.state.user.userID;
    const sendUserFollow = { userID: uID, vacationID: vID };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(sendUserFollow)
    };

    // fetch(`http://localhost:${PORT}/api/auth/follow/`, options)
    //   .then(response => response.json())
    //   .then(vacsFollowed => this.setState({ vacsFollowed }))

    //   .catch(err => alert(err));
  }

  // public getUserFollowedVacs = (props: any) => {
  //   toast(this.state.user.userID)
  //   toast(this)
  //   fetch(`http://localhost:${PORT}/api/auth/followers`)
  //     .then(res => res.json())
  //     .then(vacsFollowed => this.setState({ vacsFollowed }))
  //     .catch(err => alert(err.message));

  // const id = this.props.vacationID;
  // const user = this.state.user.userID;
  // toast(id + user);
  // return new Promise((resolve, reject) => {
  //   const addFollow = { 'userID': user, 'vacationID': id }
  //   const options = {
  //     method: "POST",
  //     headers: {
  //     },
  //     body: addFollow
  //   };
  //   fetch(`http://localhost:${PORT}/api/auth/follow/${id}`)


  // });

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
          <div className="card-text">
            <ul>
              <li>startDate : {this.props.startDate}</li>
              <li> endDate : {this.props.endDate}</li>

              <li> price :{this.props.price} $</li>
              <li>{this.props.description}</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    );
  }
}