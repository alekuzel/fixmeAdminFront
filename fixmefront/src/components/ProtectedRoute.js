import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const id = localStorage.getItem('id');

  if (!id) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;