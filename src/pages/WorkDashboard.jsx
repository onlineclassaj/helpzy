import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import { Navigate } from 'react-router-dom';
import { Briefcase, Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import MySentQuotes from '../components/MySentQuotes';
import { ALL_SUB_CATEGORIES } from '../constants/categories';

const WorkDashboard = () => {
    const { services, user, loading } = useServices();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeTab, setActiveTab] = useState('marketplace');

    if (!user) return <Navigate to="/login" />;

    const filteredServices = services.filter(service => {
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = !locationSearch ||
            (service.location && service.location.toLowerCase().includes(locationSearch.toLowerCase()));

        // Hide user's own services from marketplace but NOT from My Sent Quotes (which is a different list anyway)
        const isNotOwnService = service.client_id !== user.id;

        return matchesCategory && matchesSearch && matchesLocation && isNotOwnService;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-20 sm:pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center lg:justify-start gap-3">
                            <Briefcase className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
                            Work Dashboard
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">Browse available opportunities or track your quotes</p>
                    </div>

                    <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200 w-full lg:w-fit overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('marketplace')}
                            className={`flex-1 lg:flex-none px-4 sm:px-8 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'marketplace'
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            Marketplace
                        </button>
                        <button
                            onClick={() => setActiveTab('quotes')}
                            className={`flex-1 lg:flex-none px-4 sm:px-8 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'quotes'
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            My Sent Quotes
                        </button>
                    </div>
                </div>

                {activeTab === 'marketplace' ? (
                    <div className="space-y-6">
                        {/* Search and Filters */}
                        <div className="glass-card p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Search Input */}
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search services..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                                    />
                                </div>

                                {/* Location Search */}
                                <div className="relative group">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Filter by city/location..."
                                        value={locationSearch}
                                        onChange={(e) => setLocationSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                                    />
                                </div>

                                {/* Category Select */}
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm sm:col-span-2 lg:col-span-1"
                                >
                                    <option value="All">All Categories</option>
                                    {ALL_SUB_CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Marketplace Feed */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-500 animate-pulse">Loading amazing opportunities...</p>
                            </div>
                        ) : filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {filteredServices.map((service, index) => (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <ServiceCard service={service} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">No services found</h3>
                                <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setLocationSearch(''); setSelectedCategory('All'); }}
                                    className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mt-4">
                        <MySentQuotes />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkDashboard;
            </div >
        </div >
    );
};

export default WorkDashboard;
