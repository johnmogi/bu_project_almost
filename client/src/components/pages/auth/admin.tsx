import * as React from "react";
import { Component, SyntheticEvent } from "react";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { VacsModel } from "../../models/vacs-model";
import Icon from "react-component-bytesize-icons";
import "./admin.css";

import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { AddVacation } from "./add-vacation";
import { NavLink } from "react-router-dom";

const PORT = process.env.PORT || 3012;

interface AdminState {
  vacs: VacsModel[];
  editVacs: VacsModel;
}

export class Admin extends Component<any, AdminState> {
  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      vacs: store.getState().vacations,
      editVacs: new VacsModel()
    };

    this.unsubscribe = store.subscribe(() => {
      this.setState({ vacs: store.getState().vacations });
    });
  }

  public async componentDidMount() {
    try {
      if (
        !store.getState().userLogged ||
        store.getState().user.role !== "Admin"
      ) {
        this.props.history.push("/login");
        return;
      }

      fetch(`http://localhost:${PORT}/api/vacations`)
        .then(res => res.json())
        .then(vacs => this.setState({ vacs }))
        .catch(err => toast.error(err.message));
    } catch (err) {
      toast.error(err.message);
    }
  }

  public deleteVac = (args: SyntheticEvent) => {
    const id = +(args.target as HTMLInputElement).value;
    toast.error(id);
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: ""
    };
    fetch(`http://localhost:${PORT}/api/vacations/${id}`, options)
      .then(vacation => toast.warn("vacation " + id + " has been deleted."))
      .catch(err => toast.error(err.message));
  };
  public render() {
    return (
      <div className="admin">
        <AddVacation />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Destination</th>
              <th>Description</th>
              <th>Price</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>PicFileName</th>
              <th>
                <Icon name="edit" thickness="bold" size="small" />
              </th>
              <th>
                <Icon name="trash" thickness="bold" size="small" />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.vacs.map(v => (
              <tr key={v.vacationID}>
                <td>{v.vacationID}</td>
                <td>{v.destination}</td>
                <td>{v.description}</td>
                <td>{v.price}</td>
                <td>{v.startDate}</td>
                <td>{v.endDate}</td>
                <td>{v.picFileName}</td>
                <td className="info">
                  <NavLink
                    className="nav-link"
                    to={`/edit-vacation/${v.vacationID}`}
                  >
                    <input type="checkbox" value={v.vacationID} />
                  </NavLink>
                </td>
                <td className="danger">
                  <input
                    type="checkbox"
                    onClick={this.deleteVac}
                    value={v.vacationID}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
