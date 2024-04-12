import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [twoFactorEnabled, setTwoFactorAuth] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('password', password);
    formData.append('role', role);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('twoFactorEnabled', twoFactorEnabled);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3006/admins/register', formData);
      navigate('/');
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Existing form fields... */}
        <div className="form-group">
          <label htmlFor="firstName">Name:</label>
          <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select
          className="form-control"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="support">Support</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
      </div>
        <div className="form-group">
          <label htmlFor="twoFactorEnabled">Two Factor Authentication Enabled:</label>
          <input type="checkbox" id="twoFactorEnabled" checked={twoFactorEnabled} onChange={(e) => setTwoFactorAuth(e.target.checked)} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;