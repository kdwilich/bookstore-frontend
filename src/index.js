import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import "./index.css";
import App from "./App";
import Counters from "./components/counters";
import Cart from "./components/cart";
import NotFound from "./components/notfound";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/cart" component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)


ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
