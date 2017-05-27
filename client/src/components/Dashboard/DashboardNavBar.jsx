import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/Login';
import '../../styles/Main.css';


class DashNav extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <nav className="dash-nav">
        <div className="dash-nav-items">
          <button><Link to="/dashboard">Home</Link></button>
          <button><Link to="/dashboard/class">Classes</Link></button>
        </div>
        <div className="search-container">
          {/*<select className="filter-bar">*/}
            {/*<option />*/}
            {/*<option />*/}
            {/*<option />*/}
            {/*<option />*/}
          {/*</select>*/}
          <form>
            <input className="nav-search" placeholder="   search . . ." type="text" />
          </form>
        </div>
        <button id="dash-logout"><Link onClick={() => { this.props.dispatch(logoutUser()); }} to="/">Logout</Link></button>
      </nav>
    );
  }
}


export default DashNav;
