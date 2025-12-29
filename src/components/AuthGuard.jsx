import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';

const AuthGuard = ({ children }) => {
    const { user, loading } = useServices();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        // Pass the current location to the login page via state
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthGuard;
