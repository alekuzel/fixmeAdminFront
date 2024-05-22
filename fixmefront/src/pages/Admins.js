import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusOptions] = useState(['Active', 'Suspended', 'Inactive']);
  
  const buttonStyle = {
    backgroundColor: 'green', 
    color: 'white', 
    borderRadius: '10px', 
    padding: '5px 10px', 
    border: 'none',
    cursor: 'pointer', // Add cursor pointer to make it user friendly
  };


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
    setEditingAdmin({...admin});
  };

  const handleSaveClick = async () => {
    if (selectedFile && editingAdmin) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      setUploading(true);
  
      try {
        const uploadResponse = await axios.post(`http://localhost:3006/admins/${editingAdmin.id}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUploading(false);
        alert(uploadResponse.data.message);
        if (uploadResponse.data.imagePath) { // Assume server returns new image path in response
          setEditingAdmin({
            ...editingAdmin,
            image: uploadResponse.data.imagePath // Update editingAdmin with the new image path
          });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
        setUploading(false);
      }
    }
  
    if (editingAdmin) {
      try {
        await axios.put(`http://localhost:3006/admins/${editingAdmin.id}`, editingAdmin);
        setEditingAdmin(null);
        fetchAdmins(); // Re-fetch the data after saving
      } catch (error) {
        console.error('Error saving admin:', error);
      }
    }
  };
  

  const handleImageChange = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Admins</h2>
            <div className="row">
              {admins.map((admin) => (
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
                          <input type="file" onChange={(e) => handleImageChange(e.target.files[0])} />
                          <input value={editingAdmin.firstName} onChange={(e) => setEditingAdmin({ ...editingAdmin, firstName: e.target.value })} />
                          <input value={editingAdmin.lastName} onChange={(e) => setEditingAdmin({ ...editingAdmin, lastName: e.target.value })} />
                          <input value={editingAdmin.email} onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })} />
                          <input value={editingAdmin.role} onChange={(e) => setEditingAdmin({ ...editingAdmin, role: e.target.value })} />
                          <input value={editingAdmin.username} onChange={(e) => setEditingAdmin({ ...editingAdmin, username: e.target.value })} />
                          <select value={editingAdmin.status} onChange={(e) => setEditingAdmin({ ...editingAdmin, status: e.target.value })}>
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <button style={buttonStyle} onClick={handleSaveClick} disabled={uploading}>{uploading ? 'Saving...' : 'Save'}</button>
                        </>
                      ) : (
                        <>
                          <h5 className="card-title">{`${admin.firstName} ${admin.lastName}`}</h5>
                          <p className="card-text">{admin.email}</p>
                          <p className="card-text"><strong>Role:</strong> {admin.role}</p>
                          <p className="card-text"><strong>Username:</strong> {admin.username}</p>
                          <p className="card-text">
                            <strong>Status: </strong>
                            <span style={{ color: admin.status === 'active' ? 'green' : (admin.status === 'suspended' ? 'blue' : 'red') }}>
                              {admin.status}
                            </span>
                          </p>
                          <button style={buttonStyle} onClick={() => handleEditClick(admin)}>Edit</button>
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
