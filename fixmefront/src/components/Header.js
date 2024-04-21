import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const loggedIn = localStorage.getItem('id');

  return (
    <header className="col-lg-10 bg-dark text-white py-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          {loggedIn && (
            <div className="col d-flex justify-content-center justify-content-md-end">
              <Link to="/news" className={`text-white text-decoration-none mx-1 ${location.pathname === '/news' ? 'active' : ''}`}>News</Link>
              <Link to="/stats" className={`text-white text-decoration-none mx-1 ${location.pathname === '/stats' ? 'active' : ''}`}>Stats</Link>
              <Link to="/activities" className={`text-white text-decoration-none mx-1 ${location.pathname === '/activities' ? 'active' : ''}`}>Activities</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
