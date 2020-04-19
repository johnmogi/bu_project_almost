import * as React from "react";
import { Component } from "react";
import { VacCard } from "./vacs-card";

import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { VacsModel } from "../../models/vacs-model";
import { PublicUserModel } from "../../models/user-model";

import Col from "react-bootstrap/Col";

import { toast } from "react-toastify";

const PORT = process.env.PORT || 3012;

interface vacationState {
  vacs: VacsModel[];
  vacId: string;
  user: PublicUserModel;
  vacsFollowed: VacsModel[];
}
export class Vacations extends Component<any, vacationState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
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

  public componentDidMount() {
    fetch(`http://localhost:${PORT}/api/vacations`)
      .then(res => res.json())
      .then(vacs => this.setState({ vacs }))
      .catch(err => alert(err.message));
    if (store.getState().userLogged && this.state.user.role === "User") {
      const id = store.getState().user.userID;
      fetch(`http://localhost:${PORT}/api/auth/follow/${id}`)
        .then(res => res.json())
        .then(vacsFollowed => this.setState({ vacsFollowed }))
        .catch(err => toast.error(err.message));

      setTimeout(() => {
        this.arrangeVacs();
      }, 1500);
    }
  }

  private arrangeVacs = () => {
    toast.info("arranging your favorite vacations, one moment...");

    const vacs = [...this.state.vacs];
    const vacsFollowed = [...this.state.vacsFollowed];

    for (let i = 0; i < this.state.vacsFollowed.length; i++) {
      const index = vacsFollowed.findIndex(
        v => v.vacationID === vacsFollowed[i].vacationID
      );
      const vacation = vacs[index];
      vacation.follow = true;
      vacs.splice(index, 1);
      vacs.unshift(vacation);
      this.setState({ vacs: vacs });
    }
  };

  public render(): JSX.Element {
    return (
      <div className="vacations row">
        {this.state.vacs.map(v => (
          <Col sm={1} md={2} xl={4} key={v.vacationID}>
            <VacCard
              follow={v.follow}
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
