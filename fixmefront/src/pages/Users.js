import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';
import Footer from '../components/FooterComp';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [statusOptions] = useState(['', 'active', 'suspended', 'inactive']);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3006/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3006/users/${editingUser.id}`, editingUser);
      setEditingUser(null);
      fetchUsers(); // re-fetch the data after saving
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/users/${id}`);
      fetchUsers(); // re-fetch the data after deleting
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (e, key) => {
    setEditingUser({ ...editingUser, [key]: e.target.value });
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Apply filter only if a status filter is selected
  const filteredUsers = statusFilter ? users.filter(user => user.status === statusFilter) : users;

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10" style={{ paddingLeft: '300px' }}>
          <Header />
          <div className="container mt-4">
            <h2>Users</h2>
            <div>
              <label>Status:</label>
              <select value={statusFilter} onChange={handleStatusFilterChange}>
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
                    <th>Username</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Language</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <img
                          src={user.image ? `http://localhost:3006/images/${user.image}` : '/images/default-avatar.png'}
                          className="img-fluid rounded-circle"
                          alt="User"
                          style={{ width: '50px', height: 'auto' }}
                        />
                      </td>
                      <td>
                        {editingUser && editingUser.id === user.id ? (
                          <>
                            <input value={editingUser.firstName} onChange={(e) => handleInputChange(e, 'firstName')} />
                            <input value={editingUser.lastName} onChange={(e) => handleInputChange(e, 'lastName')} />
                          </>
                        ) : (
                          `${user.firstName} ${user.lastName}`
                        )}
                      </td>
                      <td>
                        {editingUser && editingUser.id === user.id ? (
                          <input value={editingUser.email} onChange={(e) => handleInputChange(e, 'email')} />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>{user.username}</td>
                      <td>
                        {editingUser && editingUser.id === user.id ? (
                          <input value={editingUser.phoneNumber} onChange={(e) => handleInputChange(e, 'phoneNumber')} />
                        ) : (
                          user.phoneNumber
                        )}
                      </td>
                      <td style={{ color: user.status === 'active' ? 'green' : (user.status === 'suspended' ? 'blue' : 'red') }}>
                        {editingUser && editingUser.id === user.id ? (
                          <select value={editingUser.status} onChange={(e) => handleInputChange(e, 'status')}>
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          user.status
                        )}
                      </td>
                      <td>
                        {editingUser && editingUser.id === user.id ? (
                          <input value={editingUser.language} onChange={(e) => handleInputChange(e, 'language')} />
                        ) : (
                          user.language
                        )}
                      </td>
                      <td>
                        {editingUser && editingUser.id === user.id ? (
                          <button className="btn btn-success" onClick={handleSaveClick}>Save</button>
                        ) : (
                          <button className="btn btn-primary" onClick={() => handleEditClick(user)}>Edit</button>
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
      <Footer />
    </div>
  );
};

export default UsersPage;
