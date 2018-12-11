import React, { Component } from "react";

export default class AddItems extends Component {
  state = {
    label: ""
  };
  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({ label: "" });
  };
  render() {
    return (
      <form className="item-app-form d-flex " onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="What nids  to by done"
          value={this.state.label}
        />
        <button
          className="btn btn-outline-secondary btn-sm float-right"
          onChange={this.onLabelChange}
        >
          <label>AddItems</label>
        </button>
      </form>
    );
  }
}
