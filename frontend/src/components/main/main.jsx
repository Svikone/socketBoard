import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "../../shared/history";
import Header from "../main/header/header";
import Friends from "../main/friends/friends";
import Board from "../main/board/board";
import Card from "../main/board/card/card";

function main() {
  return (
    <div className="">
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/main/friends" component={Friends} />
          <Route exact path="/main/board" component={Board} />
          <Route exact path="/main/board/:id" component={Card} />
        </Switch>
      </Router>
    </div>
  );
}

export default main;
