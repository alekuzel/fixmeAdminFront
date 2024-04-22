import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const SupportUserPage = () => {
  const [supportUsers, setSupportUsers] = useState([]);

  useEffect(() => {
    const fetchSupportUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3006/users/support');
        setSupportUsers(response.data);
      } catch (error) {
        console.error('Error fetching support users:', error);
      }
    };

    fetchSupportUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Support Users</h2>
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
                  {supportUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <img 
                          src={user.image || '/images/default-avatar.png'} 
                          alt="Support User" 
                          className="img-fluid rounded-circle" 
                          style={{ maxWidth: '50px' }}
                        />
                      </td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.role}</td>
                      <td>{user.username}</td>
                      <td>{user.lastLogin}</td>
                      <td>{user.lastLoginIP}</td>
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

export default SupportUserPage;