import React from 'react';
import { Link } from 'react-router-dom';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const SuccessPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10" style={{ paddingLeft: '300px' }}>
          <Header />
        <div className="col-lg-10">
          <div className="container mt-4">
            <h2>Registration form sent.</h2>
            <p>Now check you email and confirm registration.</p>
            <Link to="/login" className="btn btn-primary">Go to Login</Link>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default SuccessPage;
