import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ adminOnly = false }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && (!currentUser.isAdmin || !currentUser.otpVerified)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const AdminRoute = () => <ProtectedRoute adminOnly />;