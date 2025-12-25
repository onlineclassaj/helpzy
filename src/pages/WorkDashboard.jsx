import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import { Navigate } from 'react-router-dom';
import { Briefcase, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import MySentQuotes from '../components/MySentQuotes';
import { ALL_SUB_CATEGORIES } from '../constants/categories';

const WorkDashboard = () => {
    const { user, services, loading } = useServices();

    console.log('WorkDashboard: Render', { loading, user: user?.id, servicesCount: services?.length });
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Filter for Marketplace Feed
    const filteredServices = (services || []).filter(service => {
        if (!service) return false;
        const matchesSearch = (service.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.description || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || service.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const allCategories = Array.isArray(ALL_SUB_CATEGORIES) ? ALL_SUB_CATEGORIES : ['All'];
    const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'quotes'

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative"
        >
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -z-10 animate-blob"></div>

            {/* Tab Navigation */}
            <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-[24px] border border-gray-100 mb-12 w-fit mx-auto sm:mx-0 premium-shadow">
                <button
                    onClick={() => setActiveTab('browse')}
                    className={`py-3 px-8 text-sm font-black transition-all rounded-[18px] flex items-center gap-2 ${activeTab === 'browse'
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    <Search className="w-4 h-4" />
                    Browse Jobs
                </button>
                <button
                    onClick={() => setActiveTab('quotes')}
                    className={`py-3 px-8 text-sm font-black transition-all rounded-[18px] flex items-center gap-2 ${activeTab === 'quotes'
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    <Briefcase className="w-4 h-4" />
                    My Sent Quotes
                </button>
            </div>

            {activeTab === 'browse' ? (
                /* Marketplace Feed Section */
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
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
            ) : (
                /* My Sent Quotes Section */
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        Sent Quotes History
                    </h2>
                    <MySentQuotes />
                </motion.div>
            )}
        </motion.div>
    );
};

export default WorkDashboard;
