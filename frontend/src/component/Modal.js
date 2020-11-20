import React, { Component } from "react";
import Axios from "axios";

export default class Modal extends Component {
  deleteUser = () => {};
  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="deleteModalLabel">
                  DELETE USER
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Are you absolutely sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  NEVER MIND
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.deleteUser}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
