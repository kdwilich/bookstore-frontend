import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

// PID, OID, Bstreet, Bcity, Bstate, Bzip, card_info
// AccountID, Total, Cname, Ship_addr, Bill_addr, PID, Date_placed, status, Book_title, ISBN
class Checkout extends Component {
  componentDidMount() {
    // this.getOrders();
  }

  getOrders = _ => {
    fetch("http://localhost:4000/orders")
      .then(response => response.json())
      .then(response => this.setState({ orders: response.data }))
      .catch(err => console.error(err));
  };

  completePurchase = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/cart/checkout")
      .then(response => response.json())
      .then(this.deleteCart)
      .catch(err => console.error(err));
  };

  deleteCart = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/carts/delete/all")
      .then(response => response.json())
      .then(response => this.setState({ cart: response.data, total: 0 }))
      .catch(err => console.error(err));
  };

  render() {
    document.body.style = "background: #343A40";
    return (
      <div className="bg-dark text-light">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
          <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
        </Breadcrumb>
        <Card bg="dark" className="w-50 m-3">
          <Card.Title className="p-3">
            <h1>Order Information</h1>
          </Card.Title>
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email Address"
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="formGridEmail">
                  <Form.Label>Account ID</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Account ID"
                  ></Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Row>
                <Form.Group controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Form.Row>

              <Link to="/">
                <Button
                  className="m-3"
                  variant="primary"
                  onClick={this.completePurchase}
                >
                  Checkout
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Checkout;
