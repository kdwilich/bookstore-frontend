import React, { Component } from "react";
import Card, { CardSubtitle } from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Cart extends Component {
  state = {
    cart: [],
    total: 0
  };

  componentDidMount() {
    this.getCart();
    this.getPriceTotal();
  }

  getCart = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/carts")
      .then(response => response.json())
      .then(response => this.setState({ cart: response.data }))
      .catch(err => console.error(err));
  };

  getPriceTotal = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/carts/total_price")
      .then(response => response.json())
      .then(response => this.setState({ total: response.data[0].total || 0 }))
      .catch(err => console.error(err));
  };

  deleteCart = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/carts/delete/all")
      .then(response => response.json())
      .then(response => this.setState({ cart: response.data, total: 0 }))
      .catch(err => console.error(err));
  };

  updateCartAdd(ISBN) {
    fetch(
      `https://bookstore-server-t12.herokuapp.com/carts/update/add?ISBN=${ISBN}`
    )
      .then(() => window.location.reload(true))
      .catch(err => console.error(err));
  }

  updateCartDelete(ISBN) {
    fetch(
      `https://bookstore-server-t12.herokuapp.com/carts/update/delete?ISBN=${ISBN}`
    )
      .then(() => window.location.reload(true))
      .catch(err => console.error(err));
  }

  renderCart = ({ Book, ISBN, Cart_Quantity }) => (
    <div key={ISBN}>
      <b>Book: </b>
      {Book} <br />
      <b>ISBN: </b>
      {ISBN} <br />
      <b>Quantity: </b>
      {Cart_Quantity} <br />
      <Button onClick={this.updateCartAdd.bind(this, ISBN)} variant="success">
        +
      </Button>
      {Cart_Quantity > 0 && (
        <Button
          onClick={this.updateCartDelete.bind(this, ISBN)}
          variant="warning"
        >
          -
        </Button>
      )}
    </div>
  );

  renderTotal(total) {
    console.log(total);
    return (
      <div>
        <b>Total: </b> ${total}
      </div>
    );
  }

  render() {
    const { cart, total } = this.state;
    return (
      <div>
        <a href="/" style={{ textDecoration: "none", fontSize: "25px" }}>
          Back
        </a>
        <Button onClick={this.deleteCart} variant="danger">
          Delete Contents
        </Button>
        {cart.length !== undefined && <div>{cart.map(this.renderCart)}</div>}
        {this.renderTotal(total)}
      </div>
    );
  }
}

export default Cart;
