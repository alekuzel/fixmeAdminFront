import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';
import Footer from '../components/FooterComp';
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

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
                      className="card-img-top img-fluid rounded-circle"
                      style={{ maxWidth: '50px', margin: '0 auto' }}
                    />
                    <div className="card-body">
                      {editingUser && editingUser.id === user.id ? (
                        <>
                          <input value={editingUser.firstName} onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })} />
                          <input value={editingUser.lastName} onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })} />
                          <input value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                          <input value={editingUser.phoneNumber} onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })} />
                          <input value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} />
                          <input value={editingUser.status} onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })} />
                          <input value={editingUser.username} onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} />
                          <button style={{ backgroundColor: 'green', color: 'white', borderRadius: '10px', padding: '5px 10px', marginRight: '5px' }} onClick={handleSaveClick}>Save</button>
                          <button style={{ backgroundColor: 'red', color: 'white', borderRadius: '10px', padding: '5px 10px' }} onClick={() => handleDeleteClick(user.id)}>Delete</button>
                        </>
                      ) : (
                        <>
                          <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                          <p className="card-text">{user.email}</p>
                          <p className="card-text">{user.phoneNumber}</p>
                          <p className="card-text">{user.role}</p>
                          <p className="card-text">{user.status}</p>
                          <p className="card-text">{user.username}</p>
                          <button style={{ backgroundColor: 'green', color: 'white', borderRadius: '10px', padding: '5px 10px', border: 'none', boxShadow: 'none' }} onClick={() => handleEditClick(user)}>Edit</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UsersPage;