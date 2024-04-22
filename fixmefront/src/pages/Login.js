import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3006/admin/login', { username, password });
      const id = response.data.admin.id;
      localStorage.setItem('id', id);
      navigate(`/`);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <style>
        {`
          .login-container {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            background-color: white;
          }
          .form-control {
            margin-bottom: 15px;
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .btn-primary {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
          }
          .form-header {
            text-align: center;
            margin-bottom: 20px;
          }
        `}
      </style>
      <div className="login-container">
        <h2 className="form-header">Login to Fixmeapp Admin Dashboard</h2>
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
    </>
  );
}

export default Login;
