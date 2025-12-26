import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { UserCircle, LogOut, Briefcase, User, Bell } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

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
        <nav className="fixed top-0 sm:top-4 left-0 sm:left-1/2 sm:-translate-x-1/2 z-[100] w-full sm:w-[calc(100%-2rem)] max-w-5xl transition-all duration-300">
            <div className="glass-card sm:rounded-[24px] px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between premium-shadow border-b sm:border border-gray-100">
                <div className="flex items-center gap-4 sm:gap-8">
                    <Link to="/" className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-2 group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 premium-gradient rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform text-sm sm:text-base">
                            H
                        </div>
                        <span className="hidden xs:block">Helpzy</span>
                        <span className="text-[8px] sm:text-[10px] font-black bg-indigo-50 text-indigo-600 px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg">V2.2</span>
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
                            <div className="hidden xs:block w-[1px] h-4 bg-gray-200 mx-1"></div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center border border-gray-200">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            </div>
                            <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                            <button
                                onClick={handleLogout}
                                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-lg sm:rounded-xl flex items-center justify-center"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    ) : (
                        location.pathname !== '/login' && (
                            <Link to="/login">
                                <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-black transition-all font-bold text-xs sm:text-sm premium-shadow">
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
