import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Snake from "./games/snake";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/games/snake">
          <Snake />
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
