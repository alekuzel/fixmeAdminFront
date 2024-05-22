import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusOptions] = useState(['', 'active', 'suspended', 'inactive']);

  const buttonStyle = {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '10px',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
  };

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
        if (uploadResponse.data.imagePath) {
          const updatedAdmin = {
            ...editingAdmin,
            image: uploadResponse.data.imagePath
          };
          setEditingAdmin(updatedAdmin);
          alert(uploadResponse.data.message);
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
        fetchAdmins();
      } catch (error) {
        console.error('Error saving admin:', error);
      }
    }
  };

  const handleImageChange = (file) => {
    setSelectedFile(file);
  };

  const handleInputChange = (e, key) => {
    setEditingAdmin({ ...editingAdmin, [key]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Admins</h2>
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
                  {admins.map((admin) => (
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
