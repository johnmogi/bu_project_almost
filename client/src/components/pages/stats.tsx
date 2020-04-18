import * as React from "react";
import { Component } from "react";
import { UserModel } from "../models/user-model";
import { VacsModel } from "../models/vacs-model";
import { Unsubscribe } from "redux";
import { store } from "../redux/store";

import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { toast } from "react-toastify";

const PORT = process.env.PORT || 3012;
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

interface statsstate {
  user: UserModel;
  followers: VacsModel[];
  vacsFollowed: VacsModel[];
}

export class StatsGraphs extends Component<any, statsstate> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      user: store.getState().user,
      followers: store.getState().vacsFollowers,
      vacsFollowed: store.getState().vacsFollowed
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState({ user: store.getState().user });
      this.setState({ vacsFollowed: store.getState().vacsFollowed });
      this.setState({ followers: store.getState().vacsFollowers });
    });
  }

  public async componentDidMount() {
    try {
      fetch(`http://localhost:${PORT}/api/auth/followers`)
        .then(res => res.json())
        .then(vacsFollowed => this.setState({ vacsFollowed }))
        .catch(err => toast.error(err.message));
    } catch (err) {
      toast.error(err.message);
    }
    try {
      fetch(`http://localhost:${PORT}/api/auth/followed-vacs`)
        .then(res => res.json())
        .then(followers => this.setState({ followers }))
        .catch(err => toast.error(err.message));
    } catch (err) {
      toast.error(err.message);
    }
  }
  render() {
    return (
      <div className="stats">
        <VictoryChart domainPadding={10}>
          {/* <VictoryAxis
            tickValues={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x / 20}`)}
          /> */}
          <VictoryBar
            data={this.state.vacsFollowed}
            x={`userID`}
            y={"vacationID"}
          />
        </VictoryChart>
        <p>stats</p>
        vacsFollowed: {this.state.vacsFollowed.length}
        {this.state.vacsFollowed.map(v => (
          <p>vacationID: {v.vacationID}</p>
        ))}
        <hr />
        followers: {this.state.followers.length}
        {this.state.followers.map(v => (
          <p>vacationID: {v.vacationID}</p>
        ))}
      </div>
    );
  }
}
