import React from 'react';
import { useServices } from '../context/ServiceContext';
import { Link } from 'react-router-dom';
import { PlusCircle, List } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';

const HireDashboard = () => {
    const { user, services, loading } = useServices();
    const [activeTab, setActiveTab] = React.useState('active');

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const myServices = services.filter(service =>
        service &&
        user &&
        service.user_id === user.id &&
        service.status !== 'completed'
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 relative"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 animate-blob"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-xl">
                        <List className="w-6 h-6 text-white" />
                    </div>
                    My Active Requests
                </h2>
                <div className="flex items-center gap-3 self-start lg:self-auto w-full lg:w-auto">
                    {/* History Button - Smaller, Secondary */}
                    <Link
                        to="/history"
                        className="flex-none bg-gray-100 text-gray-600 px-6 py-3 rounded-2xl hover:bg-gray-200 transition-all font-bold text-sm flex items-center justify-center"
                    >
                        History
                    </Link>

                    {/* Create Button - Larger, Primary */}
                    <Link
                        to="/post-service"
                        className="flex-1 lg:flex-none bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all font-bold text-lg premium-shadow flex items-center justify-center gap-2 group"
                    >
                        <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        <span className="whitespace-nowrap">Create New Post</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myServices.length > 0 ? (
                    myServices.map((service) => (
                        <ServiceCard key={service.id} service={service} isOwner={true} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center glass-card rounded-[32px]">
                        <p className="text-gray-500 mb-6 font-medium">You haven't posted any help requests yet.</p>
                        <Link
                            to="/post-service"
                            className="text-indigo-600 font-bold uppercase tracking-widest text-sm hover:text-indigo-700 transition-all flex items-center justify-center gap-2 group"
                        >
                            Start your first post
                            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default HireDashboard;
