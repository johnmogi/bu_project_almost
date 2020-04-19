import React, { Component, ChangeEvent } from "react";
import axios from "axios";

import "./add-vacation.css";

import { newFileVacModel } from "../../models/new-file-model";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { toast } from "react-toastify";
import { VacsModel } from "../../models/vacs-model";
import { UserModel } from "../../models/user-model";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";

const PORT = process.env.PORT || 3012;

interface VacationsState {
  vacation: VacsModel;
  user: UserModel;
  vac: VacsModel[];
}

export class EditVacation extends Component<any, VacationsState> {
  private fileInput: HTMLInputElement;

  private unsubscribe: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      vacation: new VacsModel(),
      user: store.getState().user,
      vac: []
    };
    this.unsubscribe = store.subscribe(() => {
      this.setState({ user: store.getState().user });
    });
  }
  public componentWillUnmount = () => {
    this.unsubscribe();
  };

  public async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      fetch(`http://localhost:${PORT}/api/vacations/${id}`)
        .then(res => res.json())
        .then(vac => this.setState({ vac }))
        .catch(err => toast.error(err.message));
    } catch (err) {
      toast.error(err.message);
    }
  }
  private setDestination = (args: ChangeEvent<HTMLInputElement>) => {
    const destination = args.target.value;
    const vacation = { ...this.state.vacation };
    vacation.destination = destination;
    this.setState({ vacation });
  };
  private setDescription = (args: ChangeEvent<HTMLInputElement>) => {
    const description = args.target.value;
    const vacation = { ...this.state.vacation };
    vacation.description = description;
    this.setState({ vacation });
  };

  private setPicture = (args: ChangeEvent<HTMLInputElement>) => {
    const picFileName = args.target.files[0];
    const vacation = { ...this.state.vacation };
    vacation.picFileName = picFileName;
    this.setState({ vacation });
  };

  private imageUpload = async () => {
    const vacation = { ...this.state.vacation };
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", vacation.picFileName);

      const optionsImg = {
        method: "POST",
        body: formData
      };

      fetch(`http://localhost:${PORT}/api/auth/file`, optionsImg)
        .then(res => res.json())
        .then(image => resolve(image))
        .catch(err => reject(err));
    });
  };

  private setStartDate = (args: ChangeEvent<HTMLInputElement>) => {
    const startDate = args.target.value;
    const vacation = { ...this.state.vacation };
    vacation.startDate = startDate;
    this.setState({ vacation });
  };
  private setEndDate = (args: ChangeEvent<HTMLInputElement>) => {
    const endDate = args.target.value;
    const vacation = { ...this.state.vacation };
    vacation.endDate = endDate;
    this.setState({ vacation });
  };
  private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
    const price = args.target.value;
    const vacation = { ...this.state.vacation };
    vacation.price = price;
    this.setState({ vacation });
  };
  private validateForm = async () => {
    if (!this.state.vacation.picFileName) {
      toast.error("image is missing, try again");
      return;
    }

    if (
      !this.state.vacation.description ||
      !this.state.vacation.destination ||
      !this.state.vacation.endDate ||
      !this.state.vacation.picFileName ||
      !this.state.vacation.price ||
      !this.state.vacation.startDate
    ) {
      toast.error(
        "one of the add vacations fields appears to be missing, please check again."
      );
      return;
    }

    await this.imageUpload();
    await this.addVacForm();
  };

  private addVacForm = async () => {
    const myFormData = new FormData();
    myFormData.append("destination", this.state.vacation.destination);
    myFormData.append("description", this.state.vacation.description);
    myFormData.append("price", this.state.vacation.price.toString());
    myFormData.append("startDate", this.state.vacation.startDate.toString());
    myFormData.append("endDate", this.state.vacation.endDate.toString());
    myFormData.append("picFileName", this.state.vacation.picFileName);

    await axios.post<newFileVacModel>(
      `http://localhost:${PORT}/api/vacations`,
      myFormData
    );
  };

  render() {
    return (
      <div className="add-vacation">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Description</th>
              <th>Price</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>PicFileName</th>

              <th>Add</th>
            </tr>
          </thead>
          {this.state.vac.map(v => (
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    type="text"
                    placeholder={v.destination}
                    onChange={this.setDestination}
                  />
                </td>
                <td>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      required
                      rows="1"
                      placeholder={v.description}
                      onChange={this.setDescription}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    required
                    placeholder={v.price}
                    onChange={this.setPrice}
                  />
                </td>
                <td>
                  <Form.Control
                    type="date"
                    required
                    onChange={this.setStartDate}
                  />
                </td>
                <td>
                  <Form.Control
                    type="date"
                    required
                    onChange={this.setEndDate}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    required
                    onChange={this.setPicture}
                    accept="image/*"
                    ref={fi => (this.fileInput = fi)}
                  />

                  <button type="button" onClick={() => this.fileInput.click()}>
                    Select Product Image
                  </button>
                </td>
                <td>
                  <Button variant="outline-success" onClick={this.validateForm}>
                    Save Vacation
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  }
}
