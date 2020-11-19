import React, { Component } from "react";

export default class SignIn extends Component {
  render() {
    return (
      <div className="mt-4">
        <form>
          <div className="form-group">
            <label for="email-id">Email or username</label>
            <input
              type="email"
              className="form-control"
              id="email-id"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label for="password-id">Password</label>
            <input type="password" class="form-control" id="password-id" />
          </div>

          <button type="submit" className="btn btn-success btn-md btn-block">
            SIGN IN
          </button>
        </form>
      </div>
    );
  }
}