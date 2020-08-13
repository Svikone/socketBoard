import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "../../shared/history";
import Header from "../main/header/header";
import Friends from "../main/friends/friends";

function main() {
  return (
    <div className="">
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/main/friends" component={Friends} />
        </Switch>
      </Router>
    </div>
  );
}

export default main;
