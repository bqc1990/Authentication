import React, { Component } from "react";
import Axios from "axios";
export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      repeat_password: "",
      name: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://192.168.1.96:5000/api/user/sign-up", {
      username: this.state.username,
      password: this.state.password,
      repeat_password: this.repeat_password,
      name: this.state.name,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="mt-4">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email-id">What's your email or username?</label>
            <input
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
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeat-password">Confirm your password</label>
            <input
              type="password"
              name="repeat_password"
              className="form-control"
              id="repeat-password"
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
