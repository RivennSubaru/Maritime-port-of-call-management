// AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import AccessDenied from '../../pages/AccesDenied';

const AdminRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token'); // Vérifie le token
  const role = localStorage.getItem('role') === "admin"; // Vérifie le rôle

  // Vérifie si l'utilisateur est connecté et s'il est administrateur
  if (token && role) {
    return <Element />;
  } else if (token && !role) {
    // Si l'utilisateur est connecté mais n'est pas admin, affiche le message d'accès refusé
    return <AccessDenied />;
  } else {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    return <Navigate to="/connexion" />;
  }
};

export default AdminRoute;
