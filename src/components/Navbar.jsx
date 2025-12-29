import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { LogOut, User } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import { APP_VERSION } from '../constants/version';

const Navbar = () => {
    const { user, logout } = useServices();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 sm:top-4 left-0 sm:left-1/2 sm:-translate-x-1/2 z-[100] w-full sm:w-[calc(100%-2rem)] max-w-5xl transition-all duration-300">
            <div className="glass-card sm:rounded-[24px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between premium-shadow border-b sm:border border-gray-100">
                <div className="flex items-center gap-4 sm:gap-8">
                    <Link to="/" className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-2 group">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 premium-gradient rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform text-sm sm:text-lg font-black">
                            H
                        </div>
                        <span className="hidden xs:block">Helpzy</span>
                        <span className="text-[8px] sm:text-[10px] font-black bg-indigo-50 text-indigo-600 px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg">v{APP_VERSION}</span>
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {user ? (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">
                                    {user.user_metadata?.full_name || 'Premium User'}
                                </span>
                                <span className="text-[10px] font-bold text-gray-400">VERIFIED PROFESSIONAL</span>
                            </div>
                            <NotificationCenter />
                            <div className="hidden xs:block w-[1px] h-5 bg-gray-200 mx-1"></div>
                            {/* Profile Icon - Now clickable */}
                            <Link
                                to="/profile"
                                className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-100 hover:bg-indigo-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-gray-200 hover:border-indigo-200 transition-colors"
                                title="View Profile"
                            >
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                            </Link>
                            <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>
                            <button
                                onClick={handleLogout}
                                className="w-9 h-9 sm:w-11 sm:h-11 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-xl sm:rounded-2xl flex items-center justify-center"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    ) : (
                        location.pathname !== '/login' && (
                            <Link to="/login">
                                <button className="bg-gray-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-black transition-all font-bold text-xs sm:text-sm premium-shadow">
                                    Sign In
                                </button>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
