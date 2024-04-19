import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory
  const [adminInfo, setAdminInfo] = useState(null); // State to store admin info

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3006/admin/login', { username, password });
      // Handle successful login
      console.log('Login successful', response.data);
      // Extract admin ID and token from response data and set them in state
      const id = response.data.admin.id;
      console.log('response', id );
      setAdminInfo({ id});
      // Store the token in local storage for future requests
    
    
      localStorage.setItem('id', id);
      // Redirect to dashboard
      navigate(`/dashboard`);
    } catch (error) {
      // Handle login error
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <h2>Login Fixmeapp Admin Dashboard</h2>
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
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
}

export default Login;


//image upload
//logout
//navigation to all pages
//footer
//header