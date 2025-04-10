import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(UserContext);

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
