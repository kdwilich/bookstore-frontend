import React, { Component } from 'react';
import Card from "react-bootstrap/Card";

class Cart extends Component {
  state = {
    cart: []
  };

  componentDidMount() {
    this.getCart();
    console.log(this.state.cart, this.state.books)
  }

  getCart = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/carts")
      .then(response => response.json())
      .then(response => this.setState({ cart: response.data }))
      .catch(err => console.error(err));
  };

  renderCart = ({ Book, ISBN, Cart_Quantity }) => (
    <div key={ISBN}>
      <Card className="m-2" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {Book}
          </Card.Title>
          <Card.Text>
            <b>ISBN: </b>
            {ISBN} <br />
            <b>Quantity: </b>
            {Cart_Quantity} <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  render() {
    const { cart } = this.state;
    return (
      <div>
        <a href="/" style={{ textDecoration: "none", fontSize: "25px" }}>
          Back
        </a>
        <div className="d-flex flex-wrap">{cart.map(this.renderCart)}</div>
      </div>
    );
  }
}

export default Cart;