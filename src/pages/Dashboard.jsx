import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import { Link, Navigate } from 'react-router-dom';
import { Briefcase, Search, PlusCircle, List, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import ServiceCard from '../components/ServiceCard';
import MySentQuotes from '../components/MySentQuotes';

const Dashboard = () => {
    const { user, services } = useServices();
    const [activeTab, setActiveTab] = useState('hire'); // 'hire' or 'work'

    // Filter for Search in Work Mode
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // --- HIRE MODE DATA ---
    const myServices = services.filter(service =>
        service.user_id === user.id
    );

    // --- WORK MODE DATA ---
    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || service.category === categoryFilter;
        // Don't show my own posts in "Find Work" ideally, but for now showing all active
        return matchesSearch && matchesCategory;
    });

    const allCategories = ['All', ...new Set(services.map(s => s.category))];


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Dashboard Toggle Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.user_metadata?.full_name || 'User'}</h1>
                            <p className="text-gray-500 text-sm">What would you like to do today?</p>
                        </div>

                        {/* Toggle Switch */}
                        <div className="bg-gray-100 p-1 rounded-xl flex items-center shadow-inner">
                            <button
                                onClick={() => setActiveTab('hire')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'hire'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                I want to Hire
                            </button>
                            <button
                                onClick={() => setActiveTab('work')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'work'
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Briefcase className="w-4 h-4" />
                                I want to Work
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">

                    {/* --- HIRE MODE --- */}
                    {activeTab === 'hire' && (
                        <motion.div
                            key="hire"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <List className="w-5 h-5 text-indigo-600" />
                                    My Active Requests
                                </h2>
                                <Link
                                    to="/post-service"
                                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md flex items-center gap-2"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Create New Post
                                </Link>
                            </div>

                            {myServices.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {myServices.map(service => (
                                        <ServiceCard key={service.id} service={service} isOwner={true} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm border-dashed">
                                    <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <PlusCircle className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">No requests yet</h3>
                                    <p className="text-gray-500 mt-1 mb-6 max-w-sm mx-auto">Post your first service request to start receiving quotes from professionals.</p>
                                    <Link
                                        to="/post-service"
                                        className="text-indigo-600 font-bold hover:underline"
                                    >
                                        Post a Service Now
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* --- WORK MODE --- */}
                    {activeTab === 'work' && (
                        <motion.div
                            key="work"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* My Sent Quotes Section */}
                            <div className="mb-12">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-emerald-600" />
                                    My Sent Quotes
                                </h2>
                                <MySentQuotes />
                            </div>

                            {/* Marketplace Feed Section */}
                            <div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <Search className="w-5 h-5 text-gray-600" />
                                        Marketplace Feed
                                    </h2>
                                    {/* Search Filters for Feed */}
                                    <div className="flex gap-2">
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        >
                                            {allCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Search jobs..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
                                        />
                                    </div>
                                </div>

                                {filteredServices.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredServices.map(service => (
                                            <ServiceCard key={service.id} service={service} isOwner={false} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">No active jobs found matching your criteria.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default Dashboard;
