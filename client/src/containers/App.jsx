import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
  }
}

export default App;

