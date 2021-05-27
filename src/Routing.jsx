import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import MemoryGame from "./pages/Memory-Game";

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/memory-game">
          <MemoryGame />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
