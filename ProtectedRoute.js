import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />
}

export default ProtectedRoute;


/* 
redirects user if he is not authenticated
and make the page be displayed only when logged in
*/