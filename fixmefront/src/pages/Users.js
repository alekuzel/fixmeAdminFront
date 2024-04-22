import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3006/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Users</h2>
            <div className="row">
              {users.map((user, index) => (
                <div className="col-md-4" key={user.id}>
                  <div className="card mb-4">
                    <img 
                      src={user.image || '/images/default-avatar.png'} 
                      alt="User" 
                      className="card-img-top" 
                      style={{ maxWidth: '100px', height: 'auto' }} 
                    />
                    <div className="card-body">
                      <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                      <p className="card-text">{user.email}</p>
                      <p className="card-text">{user.phoneNumber}</p>
                      <p className="card-text">{user.role}</p>
                      <p className="card-text">{user.username}</p>
              
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;