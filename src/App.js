import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import cart_img from "./assets/images/cart.png";
import Link from "react-router-dom/Link";

class App extends Component {
  state = {
    books: [],
    book: {
      title: "asdf",
      ISBN: 12341523477
    }
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = _ => {
    fetch("https://bookstore-server-t12.herokuapp.com/books")
      .then(response => response.json())
      .then(response => this.setState({ books: response.data }))
      .catch(err => console.error(err));
  };

  addBookToCart(book) {
    fetch(
      `https://bookstore-server-t12.herokuapp.com/carts/add?AccountID=170693&cartID=1&Book=${book.title}&ISBN=${book.ISBN}&Cart_Quantity=1`
    ).catch(err => console.error(err));
  }

  renderBooks = ({
    ISBN,
    title,
    Authors,
    Publisher,
    price,
    edition,
    Stock
  }) => (
    <div key={ISBN}>
      <Card bg="dark" className="m-2" style={{ width: "18rem" }}>
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
            <b>Stock: </b>
            {Stock} <br />
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between">
            <span className="px-2 d-flex align-items-center">
              <b>${price}</b>
            </span>
            <Button
              onClick={this.addBookToCart.bind(this, { ISBN, title })}
              variant="info"
            >
              Add to cart
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );

  render() {
    document.body.style = "background: #343A40";
    const { books } = this.state;
    return (
      <div className="p-3 d-flex flex-column bg-dark text-white">
        <div className="d-flex justify-content-between">
          <div className="header">Bookstore</div>
          <Link to="/cart">
            <Button variant="info">Cart</Button>
          </Link>
        </div>
        {/* <div className="d-flex flex-wrap">{books.map(this.renderBooks)}</div> */}
        <div className="d-flex flex-wrap">{books.map(this.renderBooks)}</div>
      </div>
    );
  }
}

export default App;
