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

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
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
    );
};

export default WorkDashboard;
