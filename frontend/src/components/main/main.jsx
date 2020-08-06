import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "../main/header/header";

function main() {
  return (
    <div className="">
      <Header />
      <BrowserRouter>
        <div className="">
          {/* <Route path="/main/login" component={Header} /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default main;
