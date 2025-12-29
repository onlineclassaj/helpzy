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

    // Determine if header should be fixed (only on home page and service details)
    const isHomePage = location.pathname === '/';
    const isServiceDetails = location.pathname.startsWith('/service/');
    const isLoginPage = location.pathname === '/login';
    const isProfilePage = location.pathname === '/profile';
    const shouldBeFixed = isHomePage || isServiceDetails || isLoginPage || isProfilePage;

    const navClasses = shouldBeFixed
        ? "fixed top-2 sm:top-4 left-0 right-0 z-[100] px-3 sm:px-4 max-w-5xl mx-auto transition-all duration-300"
        : "relative px-3 sm:px-0 w-full mx-auto transition-all duration-300 z-[100] mt-2 sm:mt-0";

    const cardClasses = shouldBeFixed
        ? "glass-card rounded-[24px] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between premium-shadow border-b sm:border border-gray-100"
        : "bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between shadow-sm border-b border-gray-100";

    // Override for Home Page to ensure blur behavior while maintaining masking
    const finalCardClasses = isHomePage
        ? "glass-card rounded-[24px] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between premium-shadow border sm:border-gray-100 z-[100]"
        : cardClasses;

    return (
        <nav className={navClasses}>
            <div className={finalCardClasses}>
                <div className="flex items-center gap-4 sm:gap-8">
                    <Link to="/" className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-2 group">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 premium-gradient rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform text-base sm:text-xl font-black">
                            H
                        </div>
                        {isHomePage && (
                            <>
                                <span className="hidden xs:block">Helpzy</span>
                                <span className="text-[8px] sm:text-[10px] font-black bg-indigo-50 text-indigo-600 px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg">v{APP_VERSION}</span>
                            </>
                        )}
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {user ? (
                        <div className="flex items-center gap-2 sm:gap-3 relative">
                            {isHomePage && (
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">
                                        {user.user_metadata?.full_name || 'Premium User'}
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400">VERIFIED PROFESSIONAL</span>
                                </div>
                            )}
                            <NotificationCenter />
                            <div className="hidden xs:block w-[1px] h-6 bg-gray-200 mx-1"></div>

                            {/* Profile Dropdown for Home Page */}
                            {isHomePage ? (
                                <div className="relative group">
                                    <button
                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-indigo-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-gray-200 hover:border-indigo-200 transition-colors"
                                    >
                                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right z-50">
                                        <div className="py-2">
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <User className="w-4 h-4" />
                                                My Profile
                                            </Link>
                                            <div className="h-[1px] bg-gray-100 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Standard Profile Link for Non-Home Pages
                                <Link
                                    to="/profile"
                                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-indigo-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-gray-200 hover:border-indigo-200 transition-colors"
                                    title="View Profile"
                                >
                                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                                </Link>
                            )}
                        </div>
                    ) : (
                        location.pathname !== '/login' && (
                            <Link to="/login">
                                <button className="bg-gray-900 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl hover:bg-black transition-all font-bold text-xs sm:text-sm premium-shadow">
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
