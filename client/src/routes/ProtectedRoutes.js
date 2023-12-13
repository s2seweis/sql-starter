import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the token is present in local storage
  const token = localStorage.getItem('token');

  // Check if the user is logged in based on the presence of the token
  const isAuthorized = !!token;

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
