import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavigationComp() {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();

  return (
    <div className="col-lg-2 bg-dark text-white vh-100">
      <ul className="nav flex-column">
        <li className="nav-item">
          {/* Add 'active' class to the Link if it matches the current location */}
          <Link to="/support" className={`nav-link ${location.pathname === '/support' ? 'active' : ''}`}>Support</Link>
        </li>
        <li className="nav-item">
          <Link to="/admins" className={`nav-link ${location.pathname === '/admins' ? 'active' : ''}`}>Admins</Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>Users</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}>Registration</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationComp;
