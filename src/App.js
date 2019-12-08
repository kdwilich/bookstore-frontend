import React, { Component } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import cart from './assets/images/cart.png'

class App extends Component {
  state = {
    books: []
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

  renderBooks = ({ ISBN, title, Authors, Publisher, price, Stock, year, category, edition }) => (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}, {edition} Edition</Card.Title>
        <Card.Text>
          <b>Author: </b>{Authors} <br />
          <b>Publisher: </b>{Publisher} <br />
          <b>ISBN: </b>{ISBN} <br />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between">
          <span className="px-2 d-flex align-items-center"><b>${price}</b></span>
          <Button variant="info">Add to cart</Button>
        </div></Card.Footer>
    </Card>
  );

  render() {
    const { books } = this.state;
    return (
      <div className="App p-3 d-flex flex-column">
        {/* <Button variant="info">Info</Button> */}
        <div className="d-flex justify-content-between">
          <div className="header">Bookstore</div>
          <a href="cart" style={{ fontSize: '25px' }}>Cart
            <img width="25px" height="25px" src={cart} />
          </a>
        </div>
        <div className="d-flex flex-wrap">{books.map(this.renderBooks)}</div>
      </div>
    );
  }
}

export default App;
