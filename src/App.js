import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import cart_img from "./assets/images/cart.png";

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

  renderBooks = ({ ISBN, title, Authors, Publisher, price, edition }) => (
    <div key={ISBN}>
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
    const { books } = this.state;
    return (
      <div className="p-3 d-flex flex-column">
        <div className="d-flex justify-content-between">
          <div className="header">Bookstore</div>
          <a href="cart" style={{ textDecoration: "none", fontSize: "25px" }}>
            Cart
            <img width="25px" height="25px" src={cart_img} />
          </a>
        </div>
        {/* <div className="d-flex flex-wrap">{books.map(this.renderBooks)}</div> */}
        <div className="d-flex flex-wrap">{books.map(this.renderBooks)}</div>
      </div>
    );
  }
}

export default App;
