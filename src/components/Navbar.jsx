import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { UserCircle, LogOut, Briefcase, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useServices();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active mode based on current path
    const isWorkMode = location.pathname.startsWith('/work');
    const isHireMode = location.pathname.startsWith('/hire');

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleModeSwitch = (mode) => {
        if (mode === 'hire') navigate('/hire');
        if (mode === 'work') navigate('/work');
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                            Helpzy
                        </Link>
                    </div>

                    {/* Central Mode Toggle - Removed as per user request */}
                    {user && (
                        <div className="flex-1"></div>
                    )}

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full">
                                    <UserCircle className="w-5 h-5 text-indigo-600" />
                                    <span className="font-medium text-sm">{user.user_metadata?.full_name || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-red-600 transition-colors p-2"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            location.pathname !== '/login' && (
                                <Link to="/login">
                                    <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                        Log In / Sign Up
                                    </button>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
