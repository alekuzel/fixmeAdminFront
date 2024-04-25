import React, { useState, useEffect } from 'react';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const SecurityPage = () => {
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3006/loginAttempts')
      .then(response => response.json())
      .then(data => setLoginAttempts(data));

    fetch('http://localhost:3006/admins')
      .then(response => response.json())
      .then(data => setAdmins(data));
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp /> {/* Side navigation */}
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Security Page</h2>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Lastname</th>
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
                    <td>{admin?.firstName}</td>
                    <td>{admin?.lastName}</td>
                    <td>{date}</td>
                    <td>{attempt.ipAddress}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;