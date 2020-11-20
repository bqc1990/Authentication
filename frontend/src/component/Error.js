import React, { Component } from "react";

export default class Error extends Component {
  render() {
    return (
      <div className="error-section">
        <span className="error-message">{this.props.error_message}</span>
        <button className="error-button" onClick={this.props.clearError}>
          X
        </button>
      </div>
    );
  }
}
