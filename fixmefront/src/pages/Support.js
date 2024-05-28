import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const SupportPage = () => {
  const [supportAdmins, setSupportAdmins] = useState([]);
  const [editingSupport, setEditingSupport] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [statusOptions] = useState(['', 'active', 'suspended', 'inactive']);

  useEffect(() => {
    fetchSupportAdmins();
  }, []);

  const fetchSupportAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3006/admins/support');
      const updatedSupportAdmins = response.data.map((admin) => {
        const formattedDate = admin.lastLogin && admin.lastLogin !== '0000-00-00 00:00:00'
          ? new Date(admin.lastLogin).toLocaleString()
          : 'Never';
        return {
          ...admin,
          lastLogin: formattedDate
        };
      });
      setSupportAdmins(updatedSupportAdmins);
    } catch (error) {
      console.error('Error fetching support admins:', error);
    }
  };

  const handleEditClick = (admin) => {
    setEditingSupport(admin);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3006/admins/${editingSupport.id}`, editingSupport);
      setEditingSupport(null);
      fetchSupportAdmins(); // re-fetch the data after saving
    } catch (error) {
      console.error('Error saving support admin:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/admins/${id}`);
      fetchSupportAdmins(); // re-fetch the data after deleting
    } catch (error) {
      console.error('Error deleting support admin:', error);
    }
  };

  const handleInputChange = (e, key) => {
    setEditingSupport({ ...editingSupport, [key]: e.target.value });
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Apply filter only if a status filter is selected
  const filteredSupportAdmins = statusFilter ? supportAdmins.filter(admin => admin.status === statusFilter) : supportAdmins;

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10" style={{ paddingLeft: '300px' }}>
          <Header />
          <main>
            <h2>Support Admins</h2>
            <div>
              <label>Status:</label>
              <select value={statusFilter} onChange={handleStatusFilterChange}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
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
                {filteredSupportAdmins.map((admin) => (
                  <tr key={admin.id}>
                    <td>
                      <img
                         src={admin.image ? `http://localhost:3006/images/${admin.image}` : '/images/default-avatar.png'}
                        alt="Support Admin"
                        className="img-fluid rounded-circle"
                        style={{ maxWidth: '50px', margin: '0 auto' }}
                      />
                    </td>
                    <td>
                      {editingSupport && editingSupport.id === admin.id ? (
                        <>
                          <input value={editingSupport.firstName} onChange={(e) => handleInputChange(e, 'firstName')} />
                          <input value={editingSupport.lastName} onChange={(e) => handleInputChange(e, 'lastName')} />
                        </>
                      ) : (
                        `${admin.firstName} ${admin.lastName}`
                      )}
                    </td>
                    <td>
                      {editingSupport && editingSupport.id === admin.id ? (
                        <input value={editingSupport.email} onChange={(e) => handleInputChange(e, 'email')} />
                      ) : (
                        admin.email
                      )}
                    </td>
                    <td>
                      {editingSupport && editingSupport.id === admin.id ? (
                        <select value={editingSupport.role} onChange={(e) => handleInputChange(e, 'role')}>
                          <option value="admin">Admin</option>
                          <option value="support">Support</option>
                        </select>
                      ) : (
                        admin.role
                      )}
                    </td>
                    <td>
                      {editingSupport && editingSupport.id === admin.id ? (
                        admin.username // Username field is not editable
                      ) : (
                        admin.username
                      )}
                    </td>
                    <td>
                      {editingSupport && editingSupport.id === admin.id ? (
                        <input value={editingSupport.phoneNumber} onChange={(e) => handleInputChange(e, 'phoneNumber')} />
                      ) : (
                        admin.phoneNumber
                      )}
                    </td>
                    <td style={{ color: admin.status === 'active' ? 'green' : (admin.status === 'suspended' ? 'blue' : 'red') }}>
                      {editingSupport && editingSupport.id === admin.id ? (
                        <select value={editingSupport.status} onChange={(e) => handleInputChange(e, 'status')}>
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
                      {editingSupport && editingSupport.id === admin.id ? (
                        <button className="btn btn-success" onClick={handleSaveClick}>Save</button>
                      ) : (
                        <button className="btn btn-primary" onClick={() => handleEditClick(admin)}>Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
