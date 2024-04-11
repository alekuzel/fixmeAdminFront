import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to the backend
      const response = await axios.post('/api/register', { username, password, role });
      // Redirect to the login page after successful registration
      navigate('/'); // Use navigate function to navigate to the login page
    } catch (error) {
      setError('Failed to register. Please try again.'); // Handle registration error
    }
  };

  return (
    <div className="container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;


//Manage admin images 
//AND Role-Based Access Control (RBAC)
//RBAC also to report