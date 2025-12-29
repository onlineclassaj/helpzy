import React, { useState } from 'react';
import { Clock, ArrowRight, MessageSquare, Eye, Trash2, MapPin } from 'lucide-react';
import { useServices } from '../context/ServiceContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import QuoteModal from './QuoteModal';

const ServiceCard = ({ service, isOwner = false }) => {
    const { deleteService } = useServices();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this job post? This action cannot be undone.')) {
            setIsDeleting(true);
            const result = await deleteService(service.id);
            if (!result.success) {
                alert(result.message || 'Failed to delete service.');
                setIsDeleting(false);
            }
        }
    };

    const quoteCount = service.quotes ? service.quotes.length : 0;
    const hasQuotes = quoteCount > 0;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                className="glass-card p-4 sm:p-5 rounded-2xl group relative overflow-hidden flex flex-col h-full"
            >
                {/* Decorative Background Element - Smaller */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-full -translate-y-10 translate-x-10 group-hover:bg-indigo-100 transition-colors duration-300"></div>

                <div className="mb-3 relative z-10">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 mb-2">
                        {service.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {service.title}
                    </h3>
                    {service.location && (
                        <div className="flex items-center text-gray-400 text-[9px] mt-1 font-medium">
                            <MapPin className="w-2.5 h-2.5 mr-1 text-indigo-400" />
                            {service.location}
                        </div>
                    )}
                </div>

                {service.image_url && (
                    <div className="mb-3 rounded-xl overflow-hidden h-24 border border-gray-100 relative z-10">
                        <img src={service.image_url} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                )}

                <p className="text-gray-500 mb-4 line-clamp-2 text-xs leading-relaxed flex-grow relative z-10">
                    {service.description}
                </p>

                <div className="pt-3 border-t border-gray-100 mt-auto relative z-10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-gray-400 text-[10px] font-medium">
                            <Clock className="w-3 h-3 mr-1 text-indigo-500" />
                            {new Date(service.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                        {hasQuotes && (
                            <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-black uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded-md">
                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                                {quoteCount} Quote{quoteCount !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>

                    {isOwner ? (
                        <div className="flex gap-2">
                            <Link
                                to={`/service/${service.id}`}
                                className="flex-grow bg-gray-900 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-1.5 premium-shadow"
                            >
                                View Quotes
                                <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-3 py-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent animate-spin rounded-full" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {hasQuotes ? (
                                <Link
                                    to={`/service/${service.id}`}
                                    className="w-full flex items-center justify-center px-3 py-2 bg-gray-50 text-[10px] font-bold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all rounded-lg group/link"
                                >
                                    <span>VIEW MARKET</span>
                                    <ArrowRight size={12} className="ml-1.5 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                            ) : (
                                <div className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest py-0.5">
                                    Be the first professional
                                </div>
                            )}

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full premium-gradient text-white text-xs font-bold py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 premium-shadow"
                            >
                                Send Quote
                                <MessageSquare className="w-3.5 h-3.5" />
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
