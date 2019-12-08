import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import cart_img from "./assets/images/cart.png";
import Image from "react-bootstrap/Image";

class App extends Component {
  state = {
    books: [],
    book: {
      name: "asdf",
      ISBN: 12341523477
    },
    cart: []
  };

  componentDidMount() {
    this.getBooks();
    this.getCart();
  }

  getBooks = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/books")
      .then(response => response.json())
      .then(response => this.setState({ books: response.data }))
      .catch(err => console.error(err));
  };

  getCart = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/carts")
      .then(response => response.json())
      .then(response => this.setState({ cart: response.data }))
      .catch(err => console.error(err));
  };

  addBookToCart = _ => {
    const { book } = this.state;
    fetch(
      `https://bookstore-server-t12.herokuapp.com/carts/add?AccountID=170693&cartID=1&Book=${book.name}&ISBN=${book.ISBN}&Cart_Quantity=1`
    )
      .then(console.log(book))
      .then(this.getCart)
      .catch(err => console.error(err));
  };

  renderBooks = ({ ISBN, title, Authors, Publisher, price, edition }) => (
    <Card className="m-2" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {title}, {edition} Edition
        </Card.Title>
        <Card.Text>
          <b>Author: </b>
          {Authors} <br />
          <b>Publisher: </b>
          {Publisher} <br />
          <b>ISBN: </b>
          {ISBN} <br />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between">
          <span className="px-2 d-flex align-items-center">
            <b>${price}</b>
          </span>
          <Button
            key={ISBN}
            onClick={this.setState(
              { book: { name: { title }, ISBN: { ISBN } } },
              () => this.addBookToCart
            )}
            variant="info"
          >
            Add to cart
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );

  renderCart = ({ Book, ISBN }) => (
    <div>
      <div>Book: {Book}</div>
      <div>ISBN: {ISBN}</div>
      <br />
    </div>
  );

  render() {
    const { books, cart } = this.state;
    return (
      <div className="p-3 d-flex flex-column">
        {/* <Button variant="info">Info</Button> */}
        <div className="d-flex justify-content-between">
          <div className="header">Bookstore</div>
          <a href="cart" style={{ textDecoration: "none", fontSize: "25px" }}>
            Cart
            <img width="25px" height="25px" src={cart_img} />
          </a>
        </div>
        {/* <div className="d-flex flex-wrap">{cart.map(this.renderCart)}</div> */}
        <div className="d-flex flex-wrap">{books.map(this.renderBooks)}</div>
      </div>
    );
  }
}

export default App;
