import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { ArrowLeft, User, MessageSquare, Clock, Send } from 'lucide-react';
import QuoteModal from '../components/QuoteModal';

const ServiceDetails = () => {
    const { id } = useParams();
    const { services, user, loading } = useServices();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const service = services.find(s => s.id.toString() === id);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Service Not Found</h2>
                    <Link to="/find-work" className="text-indigo-600 mt-4 inline-block hover:underline">Back to Jobs</Link>
                </div>
            </div>
        );
    }

    // Determine view mode
    // If user is owner
    const isOwner = user && service.user_id === user.id;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Link to={isOwner ? "/my-posts" : "/find-work"} className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    {isOwner ? "Back to My Posts" : "Back to Jobs"}
                </Link>

                {/* Service Info Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 mb-2">
                                {service.category}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h1>
                            <div className="flex items-center text-gray-400 text-sm mb-4">
                                <Clock className="w-4 h-4 mr-1" />
                                Posted on {new Date(service.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        {/* Provider Action Button (if not owner) */}
                        {!isOwner && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center"
                            >
                                Send Quote
                                <Send className="w-5 h-5 ml-2" />
                            </button>
                        )}
                    </div>
                    <div className="prose max-w-none text-gray-600 border-t border-gray-100 pt-6 mt-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="whitespace-pre-wrap">{service.description}</p>
                    </div>
                </div>

                {/* Quotes Section */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isOwner ? "Received Quotes" : "Current Bids"} ({service.quotes.length})
                    </h2>
                </div>

                {service.quotes && service.quotes.length > 0 ? (
                    <div className="grid gap-4">
                        {service.quotes.map((quote, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-indigo-300 transition-colors">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <User className="w-4 h-4 text-gray-500" />
                                            </div>
                                            {/* Hide provider name for non-owners to prevent bias/poaching, or show for transparency? User asked for "View existing quotes". Commonly provider names are hidden or shown. Let's show "Provider" for non-owners. */}
                                            <h4 className="font-bold text-gray-900">
                                                {isOwner ? quote.providerName : `Provider ${index + 1}`}
                                            </h4>
                                            <span className="text-xs text-gray-400 ml-2">
                                                {new Date(quote.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {/* Only owner sees the full message? Or everyone? User said "see ... message so I can compare". Assuming for OWNER comparison. For providers checking competition, maybe just price? Let's show message for transparency as user requested "list of all quotes... message". */}
                                        <div className="flex items-start gap-2 text-gray-600 mt-3 bg-gray-50 p-3 rounded-lg">
                                            <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400" />
                                            <p className="text-sm">{quote.message}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end justify-center min-w-[150px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                        <div className="text-3xl font-bold text-green-600 flex items-center mb-1">
                                            <span className="text-lg mr-0.5">₹</span>
                                            {quote.amount}
                                        </div>
                                        <p className="text-xs text-gray-400 mb-4">Quoted Amount</p>
                                        {isOwner && (
                                            <button className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                                Accept Quote
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                        <div className="text-gray-300 mb-2">
                            <MessageSquare className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-gray-500">
                            {isOwner ? "No quotes received yet." : "No bids yet. Be the first!"}
                        </p>
                    </div>
                )}
            </div>

            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceId={service.id}
                serviceTitle={service.title}
            />
        </div>
    );
};

export default ServiceDetails;
