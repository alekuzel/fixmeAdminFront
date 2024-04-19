import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp'; // Import NavigationComp

const SupportPage = () => {
  const [supportAdmins, setSupportAdmins] = useState([]);

  useEffect(() => {
    const fetchSupportAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3006/admins/support');
        setSupportAdmins(response.data);
      } catch (error) {
        console.error('Error fetching support admins:', error);
      }
    };

    fetchSupportAdmins();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp /> {/* Include NavigationComp here */}
        <div className="col-lg-10">
          <div className="container">
            <h2>Support Admins</h2>
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
                  {supportAdmins.map((admins, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
