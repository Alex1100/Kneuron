import React, { Component } from 'react';
import Login from '../../components/Logging/Login';
import NavBar from './FrontPageNav';
import { loginUser } from '../../actions/Login';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dispatch, errorMessage, history, isAuthenticated } = this.props;
    console.log(this.props);
    return (
      <div>
        <NavBar />
        <div className="dark-overlay" />
        <div className="web-desc">
          <h1 id="hl-manage">Manage your classroom workflow,</h1>
          <h1 id="hl-track">keep track of student progress,</h1>
          <h1>and much more</h1>
          <p>Kneuron is interactive learning app that looks to remedy classroom disruptions and inefficiency with its seamless and easy to use interface</p>
        </div>
        <div className="front">
          <form className="login">
            <div className="login-top">LOGIN</div>
            <Login
              history={history}
              isAuthenticated={isAuthenticated}
              errorMessage={errorMessage}
              onLoginClick={creds => dispatch(loginUser(creds, history))}
            />
          </form>
        </div>
        hihi
      </div>
    );
  }
}


export default FrontPage;
