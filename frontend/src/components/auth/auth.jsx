import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login/login";

function auth() {
  return (
    <BrowserRouter>
      <div className="">
        <Route path="/auth/login" component={Login} />
      </div>
    </BrowserRouter>
  );
}

export default auth;
