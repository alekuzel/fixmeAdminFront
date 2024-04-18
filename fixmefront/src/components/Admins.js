//Admin.js REWRITE

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupportPage = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3006/admins/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container">
      <h2>Admins</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Username</th>
              <th>Last Login</th>
              <th>Last Login IP</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admins, index) => (
              <tr key={admins.id}>
                <td>{index + 1}</td>
                <td>{admins.firstName}</td>
                <td>{admins.lastName}</td>
                <td>{admins.email}</td>
                <td>
                  <img src={admins.image} alt="Admin" className="img-fluid rounded-circle" style={{ maxWidth: '50px' }} />
                </td>
                <td>{admins.phoneNumber}</td>
                <td>{admins.role}</td>
                <td>{admins.username}</td>
                <td>{admins.lastLogin}</td>
                <td>{admins.lastLoginip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportPage;
