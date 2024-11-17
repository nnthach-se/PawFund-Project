import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const role = JSON.parse(localStorage.getItem('userRoles'));
    const isAdmin = role?.includes('ADMIN');

    return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;