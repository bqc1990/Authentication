import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">
          <img
            src="/img/brand512.png"
            width="30"
            height="30"
            alt="logo"
            loading="lazy"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link className="nav-link" to="/">
                HOME <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/About">
                ABOUT
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <Link className="nav-link" to="/sign-in">
                SIGN IN <span class="sr-only"></span>
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/sign-up">
                SIGNUP
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
