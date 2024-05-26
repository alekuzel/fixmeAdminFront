import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [adminStatusFilter, setAdminStatusFilter] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('');
  const [statusOptions] = useState(['', 'active', 'suspended', 'inactive']);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3006/admins');
      const updatedAdmins = response.data.map((admin) => {
        const formattedDate = admin.lastLogin && admin.lastLogin !== '0000-00-00 00:00:00'
          ? new Date(admin.lastLogin).toLocaleString()
          : 'Never';
        return {
          ...admin,
          lastLogin: formattedDate
        };
      });
      setAdmins(updatedAdmins);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEditClick = (admin) => {
    setEditingAdmin({ ...admin }); // Corrected to set the selected admin
  };

  const handleSaveClick = async () => {
    if (editingAdmin) {
      try {
        await axios.put(`http://localhost:3006/admins/${editingAdmin.id}`, editingAdmin);
        setEditingAdmin(null);
        fetchAdmins();
      } catch (error) {
        console.error('Error saving admin:', error);
      }
    }
  };

  const handleInputChange = (e, key) => {
    setEditingAdmin({ ...editingAdmin, [key]: e.target.value });
  };

  const handleAdminStatusFilterChange = (e) => {
    setAdminStatusFilter(e.target.value);
  };

  const filteredAdmins = adminStatusFilter ? admins.filter(admin => admin.status === adminStatusFilter) : admins;

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10" style={{ paddingLeft: '300px' }}>
          <Header />
          <div className="container mt-4">
            <h2>Admins</h2>
            <div>
              <label>Admin Status:</label>
              <select value={adminStatusFilter} onChange={handleAdminStatusFilterChange}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Username</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id}>
                      <td>
                        <img
                          src={admin.image ? `http://localhost:3006/images/${admin.image}` : '/images/default-avatar.png'}
                          className="img-fluid rounded-circle"
                          alt="Admin"
                          style={{ width: '50px', height: 'auto' }}
                        />
                      </td>
                      <td>
                        {editingAdmin && editingAdmin.id === admin.id ? (
                          <>
                            <input 
                              value={editingAdmin.firstName} 
                              onChange={(e) => handleInputChange(e, 'firstName')} 
                            />
                            <input 
                              value={editingAdmin.lastName} 
                              onChange={(e) => handleInputChange(e, 'lastName')} 
                            />
                          </>
                        ) : (
                          `${admin.firstName} ${admin.lastName}`
                        )}
                      </td>
                      <td>
                        {editingAdmin && editingAdmin.id === admin.id ? (
                          <input value={editingAdmin.email} onChange={(e) => handleInputChange(e, 'email')} />
                        ) : (
                          admin.email
                        )}
                      </td>
                      <td>
                        {editingAdmin && editingAdmin.id === admin.id ? (
                          <select value={editingAdmin.role} onChange={(e) => handleInputChange(e, 'role')}>
                            <option value="admin">Admin</option>
                            <option value="support">Support</option>
                          </select>
                        ) : (
                          admin.role
                        )}
                      </td>
                      <td>
                        {editingAdmin && editingAdmin.id === admin.id ? (
                          admin.username // Username field is not editable
                        ) : (
                          admin.username
                        )}
                      </td>
                      <td>
                        {editingAdmin && editingAdmin.id === admin.id ? (
                          <input value={editingAdmin.phoneNumber} onChange={(e) => handleInputChange(e, 'phoneNumber')} />
                        ) : (
                          admin.phoneNumber
                        )}
                      </td>
                      <td style={{ color: admin.status === 'active' ? 'green' : (admin.status === 'suspended' ? 'blue' : 'red') }}>
                        {editingAdmin && editingAdmin.id === admin.id ? (
                          <select value={editingAdmin.status} onChange={(e) => handleInputChange(e, 'status')}>
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          admin.status
                        )}
                      </td>
                      <td>{admin.lastLogin}</td>
                      <td>
                        {editingAdmin && editingAdmin.id === admin.id ? (
                          <button className="btn btn-success" onClick={handleSaveClick}>Save</button>
                        ) : (
                          <button className="btn btn-primary" onClick={() => handleEditClick(admin)}>Edit</button>
                        )}
                      </td>
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

export default Admin;
