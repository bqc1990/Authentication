import React, { Component } from "react";
import Modal from "./Modal";

export default class UserDetail extends Component {
  constructor() {
    super();
    this.state = {
      email: "bao.jason1990@gmail.com",
      firstName: "Qichang",
      lastName: "Bao",
      address: "2980 Ashlyn Pointe",
      address2: "",
      city: "Doraville",
      state: "ga",
      zip: "30340",
      isEdit: false,
      showModal: false,
    };
  }
  handleEdit = (e) => {
    e.preventDefault();
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDelete = (e) => {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  };
  render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <Modal />
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              disabled
              name="email"
              type="email"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">Fisrt Name</label>
              <input
                disabled={!this.state.isEdit}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                disabled={!this.state.isEdit}
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              disabled={!this.state.isEdit}
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address 2</label>
            <input
              disabled={!this.state.isEdit}
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
              value={this.state.address2}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input
                disabled={!this.state.isEdit}
                type="text"
                className="form-control"
                id="inputCity"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State</label>
              <select
                id="inputState"
                disabled={!this.state.isEdit}
                className="form-control"
                value={this.state.state}
                onChange={this.handleChange}
              >
                <option value="">Choose...</option>
                <option value="ga">GA</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input
                disabled={!this.state.isEdit}
                type="text"
                className="form-control"
                id="inputZip"
                value={this.state.zip}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="d-flex ">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleEdit}
            >
              {this.state.isEdit ? "Done" : "Edit"}
            </button>
            <button
              className="btn btn-danger ml-auto"
              data-toggle="modal"
              data-target="#deleteModal"
              onClick={this.handleDelete}
            >
              {" "}
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
}
