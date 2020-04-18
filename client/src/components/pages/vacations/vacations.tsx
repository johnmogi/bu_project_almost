import * as React from "react";
import { Component } from "react";
import { VacCard } from "./vacs-card";

// import axios from "axios";
import { ServerData } from "../../models/credentials-model";

//redux
// import { Action } from "../../redux/action";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { VacsModel } from "../../models/vacs-model";
import { PublicUserModel } from "../../models/user-model";

import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

const PORT = process.env.PORT || 3012;

interface vacationState {
  vacs: VacsModel[];
  user: PublicUserModel;
  vacsFollowed: VacsModel[];
}
export class Vacations extends Component<any, vacationState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      user: store.getState().user,
      vacs: store.getState().vacations,
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
  public async componentDidMount() {
    // fetch vacation:
    fetch(`http://localhost:${PORT}/api/vacations`)
      .then(res => res.json())
      .then(vacs => this.setState({ vacs }))
      .catch(err => toast.error(err.message));

    // fetch followed:
    if (this.state.user) {
      const id = this.state.user.userID;
      fetch(`http://localhost:${PORT}/api/auth/followed-vacs/${id}`)
        .then(res => res.json())
        .then(vacsFollowed => this.setState({ vacsFollowed }))
        .catch(err => toast.error(err.message));
    }

    //  const vacsFollowed= this.getState().vacsFollowed

    // if (this.state.vacsFollowed.length !== 0) {

    // let vacs = this.state.vacs.find(price => price > 777);
    // console.log(vacs);

    // }
    // vacs.push(this.state.vacsFollowed)
    // const followvacs = [];

    //     for (let i = 0; i < this.state.vacsFollowed.length; i++) {
    //       const index = vacs.findIndex((v) => v.vacationID === this.state.vacsFollowed[i].vacationID);
    //       const vacation = vacs[index];
    //       vacation.follow = true;
    //       vacs.splice(index, 1);
    //       vacs.unshift(vacation);
    //       this.setState({ vacs: vacs });
    //     }
    this.resortVacs()


  }
  private resortVacs = () => {

  }
  public render(): JSX.Element {
    return (
      <div className="vacations row">
        {this.state.vacs.map(v => (
          <Col sm={1} md={2} xl={4} key={v.vacationID}>
            <VacCard
              vacationID={v.vacationID}
              id={v.vacationID}
              description={v.description}
              destination={v.destination}
              picFileName={v.picFileName}
              startDate={v.startDate}
              endDate={v.endDate}
              price={v.price}
            />
          </Col>
        ))}
      </div>
    );
  }
}
