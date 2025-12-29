import React from 'react';
import { useServices } from '../context/ServiceContext';
import { User, Mail, Phone, Shield, LogOut, Settings, Moon, Globe, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { APP_VERSION } from '../constants/version';

const Profile = () => {
    const { user, logout } = useServices();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [language, setLanguage] = React.useState('ENGLISH (US)');

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Not Signed In</h2>
                    <p className="text-gray-500 mb-8 font-medium">Please sign in to view and manage your profile.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all premium-shadow"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 pb-20 px-4 sm:px-6">
            <div className="max-w-xl mx-auto">
                {/* Profile Header (Centered) */}
                <div className="flex flex-col items-center mb-10 mt-12 sm:mt-16">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-[32px] flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-2xl mb-6 transform hover:scale-105 transition-transform">
                        {(user.user_metadata?.full_name || user.email)?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 tracking-tight">
                        {user.user_metadata?.full_name || 'Premium User'}
                    </h1>
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <Shield className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                            Verified Account
                        </span>
                    </div>
                </div>

                {/* Profile Details (Vertical Layout) */}
                <div className="space-y-4 mb-8">
                    <h2 className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Profile Details</h2>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        {[
                            { icon: User, label: "Full Name", value: user.user_metadata?.full_name || 'Not provided' },
                            { icon: Mail, label: "Email Address", value: user.email || 'Not provided' },
                            { icon: Phone, label: "Phone Number", value: user.user_metadata?.phone || user.phone || 'Not provided' }
                        ].map((item, idx) => (
                            <div key={idx} className={`p-5 flex items-center gap-4 ${idx !== 2 ? 'border-b border-gray-50' : ''}`}>
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-gray-100">
                                    <item.icon className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Settings Section */}
                <div className="space-y-4 mb-10">
                    <h2 className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Preferences</h2>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div
                            className="p-5 flex items-center justify-between border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                    <Moon className={`w-5 h-5 ${isDarkMode ? 'text-indigo-600' : 'text-slate-400'}`} />
                                </div>
                                <span className="text-sm font-bold text-slate-600">Theme (Light/Dark)</span>
                            </div>
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-100'}`}>
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${isDarkMode ? 'left-6' : 'left-1'}`}></div>
                            </div>
                        </div>
                        <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className="text-sm font-bold text-slate-600">Language</span>
                            </div>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="text-xs font-black text-slate-400 bg-transparent border-none focus:ring-0 cursor-pointer"
                            >
                                <option value="ENGLISH (US)">ENGLISH (US)</option>
                                <option value="SPANISH">SPANISH</option>
                                <option value="FRENCH">FRENCH</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="flex flex-col gap-3">
                    <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-slate-600 font-bold hover:bg-slate-50 transition-all">
                        <Key className="w-4 h-4" />
                        Reset Password
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full py-5 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center gap-3 font-black hover:bg-rose-100 transition-all border border-rose-100 shadow-sm shadow-rose-100"
                    >
                        <LogOut className="w-5 h-5" />
                        SIGN OUT
                    </button>
                </div>

                {/* Version Info */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                        Helpzy v{APP_VERSION}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
