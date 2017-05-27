import React, { Component } from 'react';
import '../../styles/Main.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    const creds = { email: email.value.trim(), password: password.value.trim() };
    this.props.onLoginClick(creds, this.props.history);
  }

  render() {
    return (
      <div>
        <div className="login-input">
          <input
            type="text"
            ref="email"
            className="form-control"
            placeholder="email"
          />
          <input
            type="password"
            ref="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <hr />
        <button onClick={event => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }
}


export default Login;

