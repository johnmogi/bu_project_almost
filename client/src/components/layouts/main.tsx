import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage";
import { Vacations } from "../pages/vacations/vacations";
import { Admin } from "../pages/auth/admin";
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { NotFound } from "../pages/not-found";
import { StatsGraphs } from "../pages/stats";

import { Logout } from "../pages/auth/logout";
import { EditVacation } from "../pages/auth/edit-vacation";

export class Main extends Component {
  public render() {
    return (
      <div className="main jumbotron">
        <Switch>
          <Redirect to="/home" path="/" exact />
          <Route path="/home" component={Homepage} exact />
          <Route path="/admin/" component={Admin} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/logout" component={Logout} exact />
          <Route path="/stats" component={StatsGraphs} exact />
          <Route path="/signup" component={Register} exact />
          {/* pages */}
          <Route path="/edit-vacation/:id" component={EditVacation} />
          <Route path="/vacations/" component={Vacations} exact />
          <Route path="" component={NotFound} exact />
        </Switch>
      </div>
    );
  }
}
