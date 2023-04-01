import React, { Component } from "react";

export default class UserList extends Component {
  render() {
    const { users, loading } = this.props;
    return (
      <>
        {!loading ? (
          <>
            {users.length >= 1 && (
              <div className="list__item" style={{ marginTop: "1rem" }}>
                <span>Username</span>
                <span>Name</span>
              </div>
            )}
            <ul className="list">
              {users.map((user) => {
                return (
                  <li key={user.id} className="list__item">
                    <span>{user.username}</span> <span>{user.name}</span>
                  </li>
                );
              })}
            </ul>
            <div className="warning">
              {users.length < 1 && "User can not be found!"}
            </div>
          </>
        ) : (
          <div className="loading"> loading... </div>
        )}
      </>
    );
  }
}
