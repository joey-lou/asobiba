import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Games from "./components/games";
import Header from "./components/Header";
import Tools from "./components/tools";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/notes">Notes</Route>
        <Route path="/tools">
          <Tools />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
function Home() {
  return <h2>Home</h2>;
}
