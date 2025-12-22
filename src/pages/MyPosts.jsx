import React from 'react';
import { useServices } from '../context/ServiceContext';
import ServiceCard from '../components/ServiceCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MyPosts = () => {
    const { services, user, loading } = useServices();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Please Log In</h2>
                    <p className="text-gray-600 mb-4">You need to be logged in to view your posts.</p>
                    <Link to="/login" className="text-indigo-600 font-medium hover:underline">Go to Login</Link>
                </div>
            </div>
        );
    }

    // Filter services where user_id matches current authenticated user ID
    const myServices = services.filter(service =>
        service.user_id === user.id
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Posted Services</h1>
                    <p className="text-gray-500 mt-1">Manage your requests and review quotes.</p>
                </div>

                {myServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myServices.map(service => (
                            <ServiceCard key={service.id} service={service} isOwner={true} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-gray-400 text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-medium text-gray-900">No active posts</h3>
                        <p className="text-gray-500 mt-2 mb-6">You haven't posted any service requests yet.</p>
                        <Link
                            to="/post-service"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Post a Service
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPosts;
