import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import NotFound from "./components/notfound";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

//TODO: Add confirmation of book being added to cart (toast message)
//TODO: Delete specific book and update tables in cart
//TODO: Make - button turn to remove item button when Qt=1, when delete pressed remove specific item
//TODO: Payment/Checkout page where user can input things from payment table
//TODO: Have input forms that update both payment and orders database with same information when user finalizes info
//TODO: Make cart page not look like shit
//TODO: After checkout display order summary, potentially with toast
//TODO: Make login page that verifies user

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
