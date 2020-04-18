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

const PORT = process.env.PORT || 3012;

interface vacationState {
  vacs: VacsModel[];
  vacId: string;
  user: PublicUserModel;
  ServerData: ServerData;
  vacsFollowed: VacsModel[];
}
export class Vacations extends Component<any, vacationState> {
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
  public async componentDidMount() {
    // fetch vacation:
    fetch(`http://localhost:${PORT}/api/vacations`)
      .then(res => res.json())
      .then(vacs => this.setState({ vacs }))
      .catch(err => alert(err.message));

    // fetch followed:
    const id = this.state.user.userID;
    fetch(`http://localhost:${PORT}/api/follow/${id}`)
      .then(res => res.json())
      .then(vacsFollowed => this.setState({ vacsFollowed }))
      .catch(err => alert(err.message));
  }
  componentDidUpdate = () => {
    const vacationId = this.props.match.params.vacId;
    if (vacationId !== this.state.vacId) {
      this.componentDidMount();
    }
  };
  public render(): JSX.Element {
    return (
      <div className="vacations row">
        {this.state.vacs.map(v => (
          <Col sm={1} md={2} xl={4} key={v.vacationID}>
            {/* <Col className="card col-4" className={classes.root}> */}
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
