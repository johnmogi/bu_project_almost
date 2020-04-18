import { createStore } from "redux";
import { AppState } from "./appState";
import { Reducer } from "./reducer";

export const store = createStore(Reducer.reduce, new AppState());
