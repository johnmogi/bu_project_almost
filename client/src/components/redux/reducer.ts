import { AppState } from "./appState";
import { ActionType } from "./actionType";
import { Action } from "./action";

export class Reducer {
  public static reduce(oldAppState: AppState, action: Action): AppState {
    const newAppState = { ...oldAppState };

    switch (action.type) {
      case ActionType.Login:
        newAppState.userLogged = true;
        newAppState.user = action.payload;
        sessionStorage.setItem("user", JSON.stringify(newAppState.user));
        break;

      case ActionType.Logout:
        newAppState.userLogged = false;
        newAppState.user = null;
        sessionStorage.removeItem("user");
        break;

      case ActionType.getVacations:
        newAppState.vacations = action.payload;
        break;

      case ActionType.vacsFollowed:
        newAppState.vacsFollowed = action.payload;
        break;
      case ActionType.vacsFollowers:
        newAppState.vacsFollowers = action.payload;
        break;

      case ActionType.addVacation:
        newAppState.vacations.push(action.payload);
        break;
      //need to recheck this:
      case ActionType.updateVacations:
        newAppState.vacsFollowed.push(action.payload);
        break;

      case ActionType.editVacation:
        const index = newAppState.vacations.findIndex(
          v => v.vacationID === action.payload.vacationID
        );
        newAppState.vacations[index] = action.payload;
        break;

      case ActionType.removeVacation:
        const indexToDelete = newAppState.vacations.findIndex(
          v => v.vacationID === action.payload
        );
        newAppState.vacations.splice(indexToDelete, 1);
        break;

      default:
        break;
    }

    return newAppState;
  }
}
