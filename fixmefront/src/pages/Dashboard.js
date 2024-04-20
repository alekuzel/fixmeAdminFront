import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';

function Dashboard() {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();

  return (
    <div>
      <Header />  {/* Add the Header component to the Dashboard page */}
  
    <div className="container-fluid">
      <div className="row">
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
        <div className="col-lg-10">
          <div className="container">
            <h2>Welcome to the dashboard</h2>
            <p>Manage your admin tasks here.</p>
            {/* Add a link to the registration page */}
            <Link to="/register">Register New Admin</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
