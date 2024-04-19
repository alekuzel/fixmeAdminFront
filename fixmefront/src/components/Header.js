import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = localStorage.getItem('id');

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('id');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <header className="container-fluid bg-dark text-white py-3">
      <div className="row align-items-center">
        <div className="col-md-2">
          <Link to="/dashboard" className="text-white text-decoration-none">
            <h1>Fixmeapp</h1>
          </Link>
        </div>
        {loggedIn ? (
          <div className="col-md-8 d-flex justify-content-end">
            <Link to="/news" className={`text-white text-decoration-none mx-3 ${location.pathname === '/news' ? 'active' : ''}`}>News</Link>
            <Link to="/stats" className={`text-white text-decoration-none mx-3 ${location.pathname === '/stats' ? 'active' : ''}`}>Stats</Link>
            <Link to="/activities" className={`text-white text-decoration-none mx-3 ${location.pathname === '/activities' ? 'active' : ''}`}>Activities</Link>
          </div>
        ) : null}
        <div className="col-md-2 d-flex justify-content-end">
          {loggedIn ? (
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
