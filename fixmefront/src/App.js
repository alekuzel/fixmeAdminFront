import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegPage from './pages/RegPage';
import ConfirmRegistration from './pages/Confirm';
import SupportPage from './pages/Support';
import Admins from './pages/Admins';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/Users';
import SecurityPage from './pages/SecurityPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
    <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/register" element={<ProtectedRoute><RegPage /></ProtectedRoute>} />
  <Route path="/confirm" element={<ProtectedRoute><ConfirmRegistration /></ProtectedRoute>} />
  <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
  <Route path="/admins" element={<ProtectedRoute><Admins /></ProtectedRoute>} />
  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
  <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
  <Route path="/security" element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />
</Routes>
    </Router>
  );
}

export default App;
