import React from 'react';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const SecurityPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp /> {/* Side navigation */}
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Security Page</h2>
            {/* Add your security page content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;