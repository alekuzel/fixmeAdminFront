import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'darkgray',
    color: 'white',
    padding: '1rem 0',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        
        <div className="row">
          <div className="col-12 text-center mt-3">
            <small>&copy; 2024 Fixmeapp. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
