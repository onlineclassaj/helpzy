import React, { useState } from 'react';
import { Clock, ArrowRight, MessageSquare, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import QuoteModal from './QuoteModal';

const ServiceCard = ({ service, isOwner = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const quoteCount = service.quotes ? service.quotes.length : 0;
    const hasQuotes = quoteCount > 0;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
            >
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 mb-2">
                        {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{service.title}</h3>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {service.description}
                </p>

                <div className="pt-4 border-t border-gray-50 mt-auto">
                    <div className="flex items-center justify-between mb-4 text-gray-400 text-xs">
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(service.createdAt).toLocaleDateString()}
                        </div>
                        {hasQuotes && (
                            <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                                {quoteCount} Quote{quoteCount !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>

                    {isOwner ? (
                        <Link
                            to={`/service/${service.id}`}
                            className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
                        >
                            View Quotes & Details
                            <Eye className="w-4 h-4" />
                        </Link>
                    ) : (
                        <div className="space-y-3">
                            {/* Bid History Link */}
                            {hasQuotes ? (
                                <Link
                                    to={`/service/${service.id}`}
                                    className="w-full flex items-center justify-center px-3 py-2 bg-gray-50 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors rounded-lg group"
                                >
                                    <span>View existing quotes</span>
                                    <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ) : (
                                <div className="text-center text-xs text-gray-400 italic py-1">
                                    Be the first to quote!
                                </div>
                            )}

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                            >
                                Send Quote
                                <MessageSquare className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>

            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceId={service.id}
                serviceTitle={service.title}
            />
        </>
    );
};

export default ServiceCard;
