import React from "react";
import { connect } from "react-redux";
import { signIn, isAuthenticated } from "authenticare/client";

import { signedIn } from "../actions/auth";

import config from "../config";

class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleClick = () => {
    const { username, password } = this.state;
    return signIn({ username, password }, { baseUrl: config.baseApiUrl }).then(
      (token) => {
        if (isAuthenticated()) {
          this.props.signedIn(token);
          this.props.history.push("/");
        }
        return null;
      }
    );
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <h2>Sign in</h2>
        <div>
          <div>Username:</div>
          <input
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <div>Password:</div>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />

          <button type="button" onClick={this.handleClick}>
            Sign in
          </button>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = { signedIn };

export default connect(null, mapDispatchToProps)(SignIn);
