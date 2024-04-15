import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [identifier, setIdentifier] = useState(''); // Changed from username to identifier
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3006/admin/login', { identifier, password }); // Changed from username to identifier
      console.log('Login successful', response.data);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username/email or password'); // Updated error message
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier">Username/Email:</label> {/* Changed from Username to Username/Email */}
          <input
            type="text"
            className="form-control"
            id="identifier" // Changed from username to identifier
            value={identifier} // Changed from username to identifier
            onChange={(e) => setIdentifier(e.target.value)} // Changed from setUsername to setIdentifier
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