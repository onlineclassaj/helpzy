import React from 'react';
import { useServices } from '../context/ServiceContext';
import { Link, Navigate } from 'react-router-dom';
import { PlusCircle, List } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';

const HireDashboard = () => {
    const { user, services, loading } = useServices();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Filter for My Active Requests
    const myServices = services.filter(service =>
        service.user_id === user.id
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
            {/* DEBUG BANNER - REMOVE AFTER VERIFICATION */}
            <div className="bg-red-600 text-white p-4 rounded-xl mb-6 shadow-lg border-4 border-yellow-400">
                <h2 className="text-lg font-black uppercase">⚠️ DEBUG MODE: NEW FEATURES VERSION ⚠️</h2>
                <p className="text-sm font-bold mt-1">If you can see this red box, the push WORKED!</p>
                <div className="flex gap-4 mt-2 text-xs opacity-90">
                    <span>User ID: {user.id.substring(0, 8)}...</span>
                    <span>Posts Found: {myServices.length}</span>
                    <span>Time: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <List className="w-5 h-5 text-indigo-600" />
                    My Active Requests
                </h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            if (window.confirm('This will refresh the app to the latest version. Continue?')) {
                                navigator.serviceWorker.getRegistrations().then(registrations => {
                                    for (let registration of registrations) {
                                        registration.unregister();
                                    }
                                    window.location.reload(true);
                                });
                            }
                        }}
                        className="text-xs text-gray-400 hover:text-indigo-600 transition-colors underline"
                    >
                        Force Update
                    </button>
                    <Link
                        to="/post-service"
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md flex items-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Create New Post
                    </Link>
                </div>
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
    );
};

export default HireDashboard;
