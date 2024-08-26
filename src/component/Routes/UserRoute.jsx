// UserRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token');

  return token ? <Element /> : <Navigate to="/connexion" />;
};

export default UserRoute;