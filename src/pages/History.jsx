import React from 'react';
import { useServices } from '../context/ServiceContext';
import { Link } from 'react-router-dom';
import { List, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';

const History = () => {
    const { user, services, loading } = useServices();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Filter for completed services owned by the user
    const completedServices = services.filter(service =>
        service &&
        user &&
        service.user_id === user.id &&
        service.status === 'completed'
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 relative"
        >
            <Link to="/hire" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-2 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Active Requests
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    Completed History
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedServices.length > 0 ? (
                    completedServices.map((service) => (
                        <div key={service.id} className="relative group">
                            <div className="absolute inset-0 bg-gray-100/50 rounded-2xl md:rounded-3xl -z-10" />
                            <div className="opacity-75 hover:opacity-100 transition-opacity">
                                <ServiceCard service={service} isOwner={true} />
                            </div>
                            <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-emerald-200">
                                <CheckCircle className="w-3 h-3" />
                                Completed
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center glass-card rounded-[32px]">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 mb-2 font-medium">No completed orders yet.</p>
                        <p className="text-sm text-gray-400">Accepted quotes will appear here.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default History;
