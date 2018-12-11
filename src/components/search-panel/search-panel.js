import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    term: ""
  };
  onChangeSearch = e => {
    const term = e.target.value;
    console.log(e.target.value);
    this.setState({ term });
    this.props.onChangeSearch(term);
  };
  onSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
          onChange={this.onChangeSearch}
          value={this.state.term}
        />
      </form>
    );
  }
}
