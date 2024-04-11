import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change in import
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegPage from './components/RegPage';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<Login />} /> {/* Use element prop instead of component */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Use element prop instead of component */}
        <Route path="/register" element={<RegPage />} /> {/* Use element prop instead of component */}
      </Routes>
    </Router>
  );
}

export default App;
