import { UserModel } from "../models/user-model";
import { VacsModel, NewVacsModel } from "../models/vacs-model";

export class AppState {
  public userLogged: boolean;
  public user: UserModel;
  public vacations: VacsModel[] = [];
  public vacation: NewVacsModel[] = [];
  public vacsFollowed: VacsModel[] = [];
  public vacsFollowers: VacsModel[] = [];
  public arrangedVacs: VacsModel;

  public constructor() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.userLogged = this.user !== null;
  }
}
