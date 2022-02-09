import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Snake from "./snake";

const BASE_PATH = "/games";

function Games() {
  return (
    <Switch>
      <Route path={`${BASE_PATH}/snake`}>
        <Snake />
      </Route>
      <Route exact path={`${BASE_PATH}`}>
        Game Home
      </Route>
    </Switch>
  );
}

export default Games;
