import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailIsEmpty: false,
    passIsEmpty: false,
    exists: 0
  };

  verifyCredentials(user) {
    if (user.email === "") {
      this.setState({ emailIsEmpty: true });
    }
    if (user.password === "") {
      this.setState({ passIsEmpty: true });
    } else if (!user.emailIsEmpty && !user.passIsEmpty) {
      fetch(
        `https://bookstore-server-t12.herokuapp.com/login/verify?email_addr=${user.email}&pass=${user.password}`
      )
        .then(response => response.json())
        .then(response => this.setState({ exists: response.data[0].exsts }))
        .catch(err => console.error(err));
    }
  }

  render() {
    const { email, password, emailIsEmpty, passIsEmpty, exists } = this.state;
    const form = {
      minWidth: "300px",
      width: "25%"
    };
    document.body.style = "background: #343A40";
    return (
      <Form className="bg-dark text-white d-flex justify-content-center align-items-center flex-column p-4">
        <h1>Login</h1>
        <Form.Group controlId="formGridEmail" style={form}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={e => {
              this.setState({ email: e.target.value, emailIsEmpty: false });
            }}
          ></Form.Control>
          {emailIsEmpty && (
            <div className="text-danger">Field Cannot be Empty</div>
          )}
        </Form.Group>
        <Form.Group controlId="formGridPassword" style={form}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => {
              this.setState({ password: e.target.value, passIsEmpty: false });
            }}
          ></Form.Control>
          {passIsEmpty && (
            <div className="text-danger">Field Cannot be Empty</div>
          )}
        </Form.Group>
        <Button
          style={form}
          size="lg"
          variant="primary"
          block
          className="w-25"
          onClick={this.verifyCredentials.bind(this, {
            email,
            emailIsEmpty,
            password,
            passIsEmpty
          })}
        >
          Log In
        </Button>
        {exists === 1 && <Redirect to="/" />}
      </Form>
    );
  }
}

export default Login;
