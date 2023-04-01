import React, { Component } from "react";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
    };
  }

  handleInputChange(e) {
    this.setState({ inputVal: e.target.value });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.state.inputVal}
          onChange={(e) => this.handleInputChange(e)}
          className="search__input"
          placeholder="Search Users"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="search__icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    );
  }
}
