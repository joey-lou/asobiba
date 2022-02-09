import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Calculator from "./calculator";

const BASE_PATH = "/tools";

function Tools() {
  return (
    <Switch>
      <Route path={`${BASE_PATH}/calculator`}>
        <Calculator />
      </Route>
      <Route exact path={`${BASE_PATH}`}>
        Tools Home
      </Route>
    </Switch>
  );
}

export default Tools;
