import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationComp from '../components/NavigationComp';
import Header from '../components/Header';

function ProfilePage() {
  const [adminData, setAdminData] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });
  const loggedInUserId = localStorage.getItem('id');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/admins/${loggedInUserId}`);
        setAdminData(response.data);
        setEditedData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    if (loggedInUserId) {
      fetchAdminData();
    }
  }, [loggedInUserId]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    setUploading(true);
  
    try {
      const response = await axios.post(`http://localhost:3006/admins/${loggedInUserId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploading(false);
      alert(response.data.message);
  
      const adminResponse = await axios.get(`http://localhost:3006/admins/${loggedInUserId}`);
      if (adminResponse.data) {
        setAdminData(adminResponse.data);
      } else {
        console.error('Unexpected server response:', adminResponse.data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
      setUploading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3006/admins/${loggedInUserId}`, editedData);
      setEditing(false);
      const updatedAdminResponse = await axios.get(`http://localhost:3006/admins/${loggedInUserId}`);
      if (updatedAdminResponse.data) {
        setAdminData(updatedAdminResponse.data);
        setEditedData({
          firstName: updatedAdminResponse.data.firstName,
          lastName: updatedAdminResponse.data.lastName,
          phoneNumber: updatedAdminResponse.data.phoneNumber
        });
      } else {
        console.error('Unexpected server response:', updatedAdminResponse.data);
      }
    } catch (error) {
      console.error('Error updating admin data:', error);
      alert('Failed to update admin data');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedData({
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      phoneNumber: adminData.phoneNumber
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationComp />
        <div className="col-lg-10">
          <Header />
          <div className="container mt-4">
            <h2>Profile Page</h2>
            {adminData ? (
              <div className="profile-content">
                <p>ID: {adminData.id}</p>
                {editing ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={editedData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={editedData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={editedData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button className="btn btn-success mr-2" onClick={handleSave}>Save</button>
                    <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                  </div>
                ) : (
                  <div className="profile-details">
                    <p>Name: {adminData.firstName} {adminData.lastName}</p>
                    <p>Email: {adminData.email}</p>
                    <p>Phone: {adminData.phoneNumber}</p>
                    <p>Username: {adminData.username}</p>
                    <p>Role: {adminData.role}</p>
                    <div>
                      <img src={adminData.avatarUrl || '/images/default-avatar.png'} alt="Avatar" className="avatar" />
                      <input type="file" onChange={handleImageChange} />
                      <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                      </button>
                    </div>
                    <button className="btn btn-success" onClick={handleEdit}>Edit</button>
                  </div>
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
