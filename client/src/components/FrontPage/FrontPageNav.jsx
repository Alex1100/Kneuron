import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Main.css';


const NavBar = () => (
  <nav className="front-nav">
    <div className="front-nav-but">
      <button>About Us</button>
      <button><Link to="/signup">Sign Up</Link></button>
    </div>
  </nav>
  );


export default NavBar;
