import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
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
);

//TODO: Add confirmation of book being added to cart (toast message)
//TODO: Delete specific book and update tables in cart
//TODO: Update Quantity if ISBN is already in the cart
//TODO: Payment/Checkout page where user can input things from payment table
//TODO: Make cart page not look like shit

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
