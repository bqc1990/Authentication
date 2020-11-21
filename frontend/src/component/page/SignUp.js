import React, { Component } from "react";
import Axios from "axios";
import Error from "../Error";
export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      repeat_password: "",
      name: "",
      error_message: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://192.168.1.96:5000/api/user/sign-up", {
      username: this.state.username,
      password: this.state.password,
      repeat_password: this.state.repeat_password,
      name: this.state.name,
    })
      .then((res) => {
        alert(
          `${this.state.name}, sign up successfully. redirect to sign in page`
        );
        window.location = "/sign-in";
      })
      .catch((err) => {
        this.setState({ error_message: err.response.data.msg });
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClearError = (e) => {
    this.setState({ error_message: "" });
  };

  render() {
    return (
      <div className="mt-4">
        <form onSubmit={this.handleSubmit}>
          {this.state.error_message ? (
            <Error
              error_message={this.state.error_message}
              clearError={this.handleClearError}
            />
          ) : null}

          <div className="form-group">
            <label htmlFor="email-id">What's your email or username?</label>
            <input
              required
              type="email"
              name="username"
              className="form-control"
              id="email-id"
              aria-describedby="emailHelp"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="name">What should we call you?</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Create a password</label>
            <input
              required
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeat_password">Confirm your password</label>
            <input
              required
              type="password"
              name="repeat_password"
              className="form-control"
              id="repeat_password"
              value={this.state.repeat_password}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success btn-md btn-block">
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}
