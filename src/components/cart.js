import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

class Cart extends Component {
  state = {
    cart: [],
    total: 0,
    price: 0
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
      .then(response => this.setState({ total: response.data[0].Total || 0 }))
      .catch(err => console.error(err));
  };

  getPriceIndividual(ISBN) {
    fetch(`https://bookstore-server-t12.herokuapp.com/carts/price?ISBN=${ISBN}`)
      .then(response => response.json())
      .then(response => this.setState({ price: response.data }))
      .catch(err => console.error(err));
    return <span>{this.state.price}</span>;
  }

  deleteCart = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/carts/delete/all")
      .then(response => response.json())
      .then(response => this.setState({ cart: response.data, total: 0 }))
      .catch(err => console.error(err));
  };

  completePurchase = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/cart/checkout")
      .then(response => response.json())
      .then(this.deleteCart)
      .catch(err => console.error(err));
  };

  updateCartAdd(ISBN) {
    fetch(
      `https://bookstore-server-t12.herokuapp.com/carts/update/add?ISBN=${ISBN}`
    )
      .then(() => window.location.reload(true))
      .catch(err => console.error(err));
  }

  updateCartDelete(cart) {
    cart.Cart_Quantity > 0
      ? fetch(
          `https://bookstore-server-t12.herokuapp.com/carts/update/delete?ISBN=${cart.ISBN}`
        )
          .then(() => window.location.reload(true))
          .catch(err => console.error(err))
      : fetch(
          `https://bookstore-server-t12.herokuapp.com/carts/update/remove?ISBN=${cart.ISBN}`
        )
          .then(() => window.location.reload(true))
          .catch(err => console.error(err));
  }

  renderCart = ({ Book, ISBN, Cart_Quantity }) => (
    <div key={ISBN}>
      <Card bg="dark" className="py-1">
        <Card.Body variant="dark">
          <b>Book: </b> {Book} <br />
          <b>ISBN: </b> {ISBN} <br />
          <b>Quantity: </b> {Cart_Quantity} &nbsp;
          <Button
            size="sm"
            onClick={this.updateCartAdd.bind(this, ISBN)}
            variant="success"
          >
            +
          </Button>
          &nbsp;
          {(Cart_Quantity > 0 && (
            <Button
              size="sm"
              onClick={this.updateCartDelete.bind(this, {
                ISBN,
                Cart_Quantity
              })}
              variant="danger"
            >
              -
            </Button>
          )) || (
            <Button
              size="sm"
              onClick={this.updateCartDelete.bind(this, {
                ISBN,
                Cart_Quantity
              })}
              variant="danger"
            >
              Remove
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );

  renderTotal(total) {
    return (
      <span style={{ fontSize: 20 }}>
        <b>Total: </b> ${total}
      </span>
    );
  }

  render() {
    document.body.style = "background: #343A40";
    const { cart, total } = this.state;
    return (
      <div className="bg-dark text-white">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-center">
          <Card bg="dark" className="m-2 w-75" style={{ maxWidth: 700 }}>
            <Card.Body className="d-flex">
              {cart.length !== undefined && (
                <div>{cart.map(this.renderCart)}</div>
              )}
            </Card.Body>
            <Card.Footer className="px-4 d-flex justify-content-between">
              <span className="d-flex align-items-center">
                {this.renderTotal(total)}
              </span>
              {/* <Button className="m-3" onClick={this.deleteCart} variant="danger">
              Delete Contents
            </Button> */}
              {console.log(cart.length === 0)}
              {cart.length !== 0 && (
                <Link to="/checkout">
                  <Button className="m-3" variant="success">
                    Checkout
                  </Button>
                </Link>
              )}
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default Cart;
