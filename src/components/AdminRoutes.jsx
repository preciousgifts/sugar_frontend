import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';

  return isAuthenticated ? children : <Navigate to='/admin-page' replace />;
};

export default AdminRoute;
