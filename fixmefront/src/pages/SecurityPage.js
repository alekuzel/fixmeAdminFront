import React, { useState, useEffect } from 'react';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const SecurityPage = () => {
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3006/loginAttempts').then(response => response.json()),
      fetch('http://localhost:3006/admins').then(response => response.json())
    ]).then(([loginAttemptsData, adminsData]) => {
      setLoginAttempts(loginAttemptsData);
      setAdmins(adminsData);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log('selectedAdmin', selectedAdmin);
  }, [selectedAdmin]); // Add this useEffect here

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleCloseModal = () => {
    setSelectedAdmin(null);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Security Page</h2>
            {!isLoading && (
              <table className="table table-striped table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Login Attempt Time</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAttempts.map((attempt, index) => {
                    const admin = admins.find(admin => admin.id === attempt.adminID);
                    
                    let date = 'N/A';
                    if (typeof attempt.attemptTime === 'string') {
                      date = new Date(attempt.attemptTime).toLocaleString();
                    }
      
                    return (
                      <tr key={index}>
                        <td onClick={() => handleAdminClick(admin)} style={{ cursor: 'pointer' }}>{`${admin?.firstName} ${admin?.lastName}`}</td>
                        <td>{date}</td>
                        <td>{attempt.ipAddress}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {selectedAdmin && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Admin Details</h5>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {`${selectedAdmin.firstName} ${selectedAdmin.lastName}`}</p>
                <p><strong>Email:</strong> {selectedAdmin.email}</p>
                <p><strong>Phone Number:</strong> {selectedAdmin.phoneNumber}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityPage;
