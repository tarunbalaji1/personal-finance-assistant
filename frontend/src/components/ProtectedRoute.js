// File Path: src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the component they were trying to access
  return children;
};

export default ProtectedRoute;