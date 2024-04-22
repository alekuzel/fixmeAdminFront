import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavigationComp() {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('id');

  const [isHovering, setIsHovering] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('id');
    navigate('/login');
  };

  const logoutButtonStyle = {
    backgroundColor: isHovering ? '#900' : '#c00', // Darker red on hover
    color: 'white',
    border: 'none'
  };

  const containerStyle = {
    zIndex: 3,
    position: 'relative' // Required for z-index to take effect
  };

  return (
    <div className="col-lg-2 bg-dark text-white vh-100" style={containerStyle}>
      <div className="text-center text-md-left">
        <Link to="/" className="text-white text-decoration-none">
          <h1>Fixmeapp</h1>
        </Link>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <i className="fa fa-tachometer-alt" style={{color: '#4CAF50'}}></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/support" className={`nav-link ${location.pathname === '/support' ? 'active' : ''}`}>
            <i className="fa fa-headset" style={{color: '#e84393'}}></i> Support
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admins" className={`nav-link ${location.pathname === '/admins' ? 'active' : ''}`}>
            <i className="fa fa-user-shield" style={{color: '#00BFFF'}}></i> Admins
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>
            <i className="fa fa-users" style={{color: '#FF6347'}}></i> Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}>
            <i className="fa fa-registered" style={{color: '#9B59B6'}}></i> Registration
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
            <i className="fa fa-id-card" style={{color: '#3498DB'}}></i> Profile
          </Link>
        </li>
        {loggedIn && (
          <li className="nav-item">
            <button 
              className="btn nav-link" 
              style={logoutButtonStyle}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out-alt" style={{color: '#E74C3C'}}></i> Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavigationComp;
