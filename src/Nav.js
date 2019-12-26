import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
          {isAuthenticated() ? <Link to="/profile">Profile</Link> : ""}
          </li>
          <li>
              <Link to="/public">Public</Link>
          </li>
          <li>
          {isAuthenticated() ? <Link to="/private">Private</Link> : ""}
          </li>
          <button onClick={isAuthenticated() ? logout : login}>
            {isAuthenticated() ? "logout" : "login"}
          </button>
        </ul>
      </nav>
    );
  }
}

export default Nav;
