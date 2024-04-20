import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp'; // Import NavigationComp
import Header from '../components/Header';

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
    <div>
      <Header /> {/* Include Header component here */}
   
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
                  {supportAdmins.map((admin, index) => (
                    <tr key={admin.id}>
                      <td>{index + 1}</td>
                      <td>{admin.firstName}</td>
                      <td>{admin.lastName}</td>
                      <td>{admin.email}</td>
                      <td>
                        <img 
                          src={admin.image || '/images/default-avatar.png'} 
                          alt="Support Admin" 
                          className="img-fluid rounded-circle" 
                          style={{ maxWidth: '50px' }}
                        />
                      </td>
                      <td>{admin.phoneNumber}</td>
                      <td>{admin.role}</td>
                      <td>{admin.username}</td>
                      <td>{admin.lastLogin}</td>
                      <td>{admin.lastLoginIP}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SupportPage;
