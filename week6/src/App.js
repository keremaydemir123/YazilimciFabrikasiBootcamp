import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import UserList from "./components/UserList";
import SearchInput from "./components/SearchInput";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.filterUsers = this.filterUsers.bind(this);

    this.state = {
      data: [],
      users: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      this.setState({ data: response.data });
      this.setState({ users: response.data });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 2000);
    });
  }

  filterUsers(searchVal) {
    const data = [...this.state.data];
    const filteredUsers = data.filter((obj) => {
      return (
        obj.name.toLowerCase().includes(searchVal) ||
        obj.username.toLowerCase().includes(searchVal)
      );
    });

    this.setState({ users: filteredUsers });
  }

  render() {
    return (
      <main className="App">
        <div className="wrapper">
          <SearchInput onChange={this.filterUsers} />
          <UserList users={this.state.users} loading={this.state.loading} />
        </div>
      </main>
    );
  }
}
