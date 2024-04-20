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
      <div className="row flex-column flex-md-row align-items-center">
        <div className="col-12 col-md-2 text-center text-md-left">
          <Link to="/" className="text-white text-decoration-none">
            <h1>Fixmeapp</h1>
          </Link>
        </div>
        {loggedIn && (
          <div className="col-12 col-md-2 d-flex justify-content-center justify-content-md-end order-3 order-md-2">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        )}
        {loggedIn && (
          <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-center justify-content-md-end align-items-center order-2 order-md-3">
            <Link to="/news" className={`text-white text-decoration-none mx-1 my-1 my-md-0 ${location.pathname === '/news' ? 'active' : ''}`}>News</Link>
            <Link to="/stats" className={`text-white text-decoration-none mx-1 my-1 my-md-0 ${location.pathname === '/stats' ? 'active' : ''}`}>Stats</Link>
            <Link to="/activities" className={`text-white text-decoration-none mx-1 my-1 my-md-0 ${location.pathname === '/activities' ? 'active' : ''}`}>Activities</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
