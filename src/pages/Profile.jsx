import React from 'react';
import { useServices } from '../context/ServiceContext';
import { User, Mail, Phone, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_VERSION } from '../constants/version';

const Profile = () => {
    const { user } = useServices();

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-gray-500">Please log in to view your profile.</p>
                    <Link to="/login" className="text-indigo-600 font-bold hover:underline mt-4 inline-block">
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    const userDetails = [
        {
            icon: User,
            label: 'Full Name',
            value: user.user_metadata?.full_name || 'Not provided',
        },
        {
            icon: Mail,
            label: 'Email Address',
            value: user.email || 'Not provided',
        },
        {
            icon: Phone,
            label: 'Phone Number',
            value: user.user_metadata?.phone || user.phone || 'Not provided',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Home
                </Link>

                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-lg">
                            {(user.user_metadata?.full_name || user.email)?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                {user.user_metadata?.full_name || 'User'}
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <Shield className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                                    Verified Account
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
                            Account Details
                        </h2>
                        <div className="space-y-4">
                            {userDetails.map((detail, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                        <detail.icon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                                            {detail.label}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {detail.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* App Info */}
                <div className="text-center text-xs text-gray-400">
                    <p>Helpzy v{APP_VERSION}</p>
                    <p className="mt-1">Your data is securely stored and encrypted.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
