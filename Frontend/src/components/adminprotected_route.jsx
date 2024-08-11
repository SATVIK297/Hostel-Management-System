// AdminProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const currentAdmin = useSelector((state) => state.admin.currentAdmin);

  return currentAdmin ? children : <Navigate to="/admin" />;
};

export default AdminProtectedRoute;
