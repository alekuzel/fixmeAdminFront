import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [statusOptions] = useState(['Active', 'Suspended', 'Inactive']);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3006/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEditClick = (admin) => {
    setEditingAdmin(admin);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3006/admins/${editingAdmin.id}`, editingAdmin);
      setEditingAdmin(null);
      fetchAdmins(); // re-fetch the data after saving
    } catch (error) {
      console.error('Error saving admin:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp /> {/* Side navigation */}
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Admins</h2>
            <div className="row">
              {admins.map((admin, index) => (
                <div key={admin.id} className="col-md-4 mb-4">
                  <div className="card">
                  <img 
  src={admin.image ? `http://localhost:3006/images/${admin.image}` : '/images/default-avatar.png'}
  className="card-img-top img-fluid rounded-circle mx-auto mt-3"
  alt="Admin"
  style={{ width: '100px', height: 'auto' }}
/>
                    <div className="card-body">
                      {editingAdmin && editingAdmin.id === admin.id ? (
                        <>
                          <input value={editingAdmin.firstName} onChange={(e) => setEditingAdmin({ ...editingAdmin, firstName: e.target.value })} />
                          <input value={editingAdmin.lastName} onChange={(e) => setEditingAdmin({ ...editingAdmin, lastName: e.target.value })} />
                          <input value={editingAdmin.email} onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })} />
                          <input value={editingAdmin.role} onChange={(e) => setEditingAdmin({ ...editingAdmin, role: e.target.value })} />
                          <input value={editingAdmin.username} onChange={(e) => setEditingAdmin({ ...editingAdmin, username: e.target.value })} />
                          <select value={editingAdmin.status} onChange={(e) => setEditingAdmin({ ...editingAdmin, status: e.target.value })}>
                            {statusOptions.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                            ))}
                          </select>
                          <button style={{ backgroundColor: 'green', color: 'white', borderRadius: '10px', padding: '5px 10px', marginRight: '5px' }} onClick={handleSaveClick}>Save</button>
                        </>
                      ) : (
                        <>
                          <h5 className="card-title">{`${admin.firstName} ${admin.lastName}`}</h5>
                          <p className="card-text">{admin.email}</p>
                          <p className="card-text"><strong>Role:</strong> {admin.role}</p>
                          <p className="card-text"><strong>Username:</strong> {admin.username}</p>
                          <p className="card-text">
                            <strong>Status:</strong>{' '}
                            <span style={{ color: admin.status === 'Active' ? 'green' : (admin.status === 'Suspended' ? 'red' : 'blue') }}>
                              {admin.status}
                            </span>
                          </p>
                          <button style={{ backgroundColor: 'green', color: 'white', borderRadius: '10px', padding: '5px 10px', border: 'none', boxShadow: 'none' }} onClick={() => handleEditClick(admin)}>Edit</button>
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
    </div>
  );
};

export default Admin;
