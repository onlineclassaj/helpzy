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
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl">
            <div className="glass-card rounded-[24px] px-6 py-3 flex items-center justify-between premium-shadow">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-2 group">
                        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
                            H
                        </div>
                        Helpzy
                        <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg">V2.1</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">
                                    {user.user_metadata?.full_name || 'Premium User'}
                                </span>
                                <span className="text-[10px] font-bold text-gray-400">VERIFIED PROFESSIONAL</span>
                            </div>
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                            <button
                                onClick={handleLogout}
                                className="w-10 h-10 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-xl flex items-center justify-center"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        location.pathname !== '/login' && (
                            <Link to="/login">
                                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl hover:bg-black transition-all font-bold text-sm premium-shadow">
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
