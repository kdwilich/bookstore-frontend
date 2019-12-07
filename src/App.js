import React, { Component } from "react";
import "./App.css";

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

  renderBooks = ({ ISBN, title }) => <div key={ISBN}>{title}</div>;

  render() {
    const { books } = this.state;
    return (
      <div className="App App-header">
        <div>{books.map(this.renderBooks)}</div>
      </div>
    );
  }
}

export default App;
