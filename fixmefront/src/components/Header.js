import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const loggedIn = localStorage.getItem('id');

  // Define inline style for the header with z-index
  const headerStyle = {
    zIndex: 1,
    width: '100%', // Full width
    position: 'relative', // Required for z-index to take effect
    backgroundColor: 'darkgray', // Maintain the dark background
    color: 'white',
    padding: '1.5rem 0' // Same as py-3 in Bootstrap
  };

  return (
    <header className="col-lg-10" style={headerStyle}>
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
