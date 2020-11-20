import React, { Component } from "react";
import Axios from "axios";
export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://192.168.1.96:5000/api/user/sign-in", {
      username: this.state.username,
      password: this.state.password,
    })
      .then((res) => {
        console.log(res.data);
        //
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
            <label htmlFor="email-id">Email or username</label>
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
            <label htmlFor="password-id">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password-id"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success btn-md btn-block">
            SIGN IN
          </button>
        </form>
      </div>
    );
  }
}
