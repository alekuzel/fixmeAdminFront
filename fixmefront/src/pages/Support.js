import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const SupportPage = () => {
  const [supportAdmins, setSupportAdmins] = useState([]);
  const [editingSupport, setEditingSupport] = useState(null);

  const fetchSupportAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3006/admins/support');
      setSupportAdmins(response.data);
    } catch (error) {
      console.error('Error fetching support users:', error);
    }
  };

  useEffect(() => {
    fetchSupportAdmins();
  }, []);

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
      console.error('Error deleting support user:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Support Admins</h2>
            <div className="row">
              {supportAdmins.map((admins, index) => (
                <div className="col-md-4" key={admins.id}>
                  <div className="card mb-4">
                    <img
                      src={admins.image || '/images/default-avatar.png'}
                      alt="Support User"
                      className="card-img-top img-fluid rounded-circle"
                      style={{ maxWidth: '50px', margin: '0 auto' }}
                    />
                    <div className="card-body">
                      {editingSupport && editingSupport.id === admins.id ? (
                        <form style={{ borderRadius: '10px', backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
                          <input value={editingSupport.firstName} onChange={(e) => setEditingSupport({ ...editingSupport, firstName: e.target.value })} />
                          <input value={editingSupport.lastName} onChange={(e) => setEditingSupport({ ...editingSupport, lastName: e.target.value })} />
                          <input value={editingSupport.email} onChange={(e) => setEditingSupport({ ...editingSupport, email: e.target.value })} />
                          <input value={editingSupport.phoneNumber} onChange={(e) => setEditingSupport({ ...editingSupport, phoneNumber: e.target.value })} />
                          <input value={editingSupport.role} onChange={(e) => setEditingSupport({ ...editingSupport, role: e.target.value })} />
                          <input value={editingSupport.status} onChange={(e) => setEditingSupport({ ...editingSupport, status: e.target.value })} />
                          <input value={editingSupport.username} onChange={(e) => setEditingSupport({ ...editingSupport, username: e.target.value })} />
                        </form>
                      ) : (
                        <>
                          <h5 className="card-title">{admins.firstName} {admins.lastName}</h5>
                          <p className="card-text">{admins.email}</p>
                          <p className="card-text">{admins.phoneNumber}</p>
                          <p className="card-text">{admins.role}</p>
                          <p className="card-text">{admins.status}</p>
                          <p className="card-text">{admins.username}</p>
                        </>
                      )}
                      {editingSupport && editingSupport.id === admins.id && (
                        <div>
                          <button style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '10px', padding: '5px 10px', marginRight: '5px', border: 'none' }} onClick={handleSaveClick}>Save</button>
                          <button style={{ backgroundColor: '#f44336', color: 'white', borderRadius: '10px', padding: '5px 10px', border: 'none' }} onClick={() => handleDeleteClick(admins.id)}>Delete</button>
                        </div>
                      )}
                      {!editingSupport && (
                        <button style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '10px', padding: '5px 10px', border: 'none', boxShadow: 'none' }} onClick={() => handleEditClick(admins)}>Edit</button>
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

export default SupportPage;
