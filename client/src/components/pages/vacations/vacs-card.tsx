import * as React from "react";
import { Component } from "react";
import "./vacations.css";
import Card from "react-bootstrap/Card";
import ToggleButton from "react-bootstrap/ToggleButton";

import { toast } from "react-toastify";

import { store } from "../../redux/store";
import { Unsubscribe } from "redux";

import { VacsModel } from "../../models/vacs-model";
import { PublicUserModel } from "../../models/user-model";
const PORT = process.env.PORT || 3012;

interface vacationState {
  vacs: VacsModel[];
  vacId: string;
  user: PublicUserModel;

  vacsFollowed: VacsModel[];
}

export class VacCard extends Component<any, vacationState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      user: store.getState().user,
      vacs: store.getState().vacations,
      vacId: "",
      vacsFollowed: store.getState().vacsFollowed
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

  private arrangeVacs = () => {
    toast.info("arranging your favorite vacations, one moment...");

    // const vacs = [...this.state.vacs];
    // const vacsFollowed = [...this.state.vacsFollowed];
    const vacs = store.getState().vacations;
    console.log(vacs);
    // const vacsFollowed = this.state.vacsFollowed;
    // for (let i = 0; i < this.state.vacsFollowed.length; i++) {
    //   const index = vacsFollowed.findIndex(
    //     v => v.vacationID === vacsFollowed[i].vacationID
    //   );
    //   const vacation = vacs[index];
    //   vacation.follow = true;
    //   vacs.splice(index, 1);
    //   vacs.unshift(vacation);
    //   this.setState({ vacs: vacs });
    // }
  };

  private addUserFollowedVacs = () => {
    const vID = +this.props.id;
    const uID = +this.state.user.userID;
    const sendUserFollow = { userID: uID, vacationID: vID };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(sendUserFollow)
    };
    if (store.getState().userLogged && this.state.user.role === "User") {
      fetch(`http://localhost:${PORT}/api/auth/follow/`, options)
        .then(response => response.json())
        .then(vacsFollowed => this.setState({ vacsFollowed }))
        .catch(err => toast.error(err));
      toast.success("you have added this vacation to your favorites");
      this.arrangeVacs();
    }
  };
  private removeUserFollowedVacs = () => {
    const vID = +this.props.id;
    const uID = +this.state.user.userID;
    const sendUserFollow = { userID: uID, vacationID: vID };
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(sendUserFollow)
    };
    toast.warn("you have removed this vacation from your favorites");

    fetch(`http://localhost:${PORT}/api/auth/delete/${uID}/${vID}`, options)
      .then(response => response.json())
      .then(vacsFollowed => this.setState({ vacsFollowed }))
      .catch(err => alert(err));
  };

  public render(): JSX.Element {
    return (
      <Card key={this.props.vacationID}>
        <Card.Body>
          {this.state.user &&
            this.state.user.role === "User" &&
            !this.props.follow && (
              <ToggleButton
                variant="outline-success"
                type="checkbox"
                value="1"
                onChange={this.addUserFollowedVacs}
              >
                Add to Favorites
              </ToggleButton>
            )}
          {/* value={this.props.vacationID} */}
          {this.state.user &&
            this.state.user.role === "User" &&
            this.props.follow && (
              <ToggleButton
                variant="outline-danger"
                type="checkbox"
                defaultChecked
                value="0"
                onChange={this.removeUserFollowedVacs}
              >
                Remove from Favorites
              </ToggleButton>
            )}
          <Card.Title>Destination : {this.props.destination}</Card.Title>
          <div
            className="mask card-image"
            style={{
              backgroundImage: `url(/assets/images/${this.props.picFileName})`
            }}
          ></div>
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
