import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import ServiceCard from '../components/ServiceCard';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { ALL_SUB_CATEGORIES } from '../constants/categories';

const FindWork = () => {
    const { services, loading } = useServices();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = Array.isArray(ALL_SUB_CATEGORIES) ? ALL_SUB_CATEGORIES : ['All'];

    const filteredServices = (services || []).filter(service => {
        if (!service) return false;
        const matchesSearch = (service.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.description || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-gray-900 mb-4"
                    >
                        Find Work That Fits You
                    </motion.h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Browse hundreds of active service requests and start earning today.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-8 sticky top-20 z-40 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for jobs..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative min-w-[200px]">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Job Listings Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-medium text-gray-900">No jobs found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindWork;
