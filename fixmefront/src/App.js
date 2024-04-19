import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change in import
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegPage from './pages/RegPage';
import ConfirmRegistration from './pages/Confirm';
import SupportPage from './pages/Support';
import Admins from './pages/Admins';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/Users';
function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<Login />} /> {/* Use element prop instead of component */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Use element prop instead of component */}
        <Route path="/register" element={<RegPage />} /> {/* Use element prop instead of component */}
        <Route path="/support" element={<SupportPage />} /> {/* Use element prop instead of component */}
        <Route path="/admins" element={<Admins />} /> {/* Use element prop instead of component */}
        <Route path="/confirm" element={<ConfirmRegistration />} /> {/* Use element prop instead of component */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Use element prop instead of component */}
        <Route path="/users" element={<UsersPage />} /> {/* Use element prop instead of component */}
      </Routes>
    </Router>
  );
}

export default App;
