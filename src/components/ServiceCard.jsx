import React, { useState } from 'react';
import { Clock, ArrowRight, MessageSquare, Eye, Trash2, MapPin } from 'lucide-react';
import { useServices } from '../context/ServiceContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import QuoteModal from './QuoteModal';

const ServiceCard = ({ service, isOwner = false }) => {
    const { deleteService } = useServices();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-card p-8 rounded-[32px] group relative overflow-hidden flex flex-col h-full"
            >
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-16 translate-x-16 group-hover:bg-indigo-100 transition-colors duration-500"></div>

                <div className="mb-6 relative z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 mb-4">
                        {service.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {service.title}
                    </h3>
                    {service.location && (
                        <div className="flex items-center text-gray-400 text-[10px] mt-2 font-medium">
                            <MapPin className="w-3 h-3 mr-1 text-indigo-400" />
                            {service.location}
                        </div>
                    )}
                </div>

                {service.image_url && (
                    <div className="mb-6 rounded-2xl overflow-hidden h-32 border border-gray-100 relative z-10">
                        <img src={service.image_url} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                )}

                <p className="text-gray-500 mb-8 line-clamp-3 text-sm leading-relaxed flex-grow relative z-10">
                    {service.description}
                </p>

                <div className="pt-6 border-t border-gray-100 mt-auto relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-gray-400 text-[11px] font-medium">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                            {new Date(service.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        {hasQuotes && (
                            <span className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-black uppercase tracking-tighter bg-emerald-50 px-2.5 py-1 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                {quoteCount} Quote{quoteCount !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>

                    {isOwner ? (
                        <div className="flex gap-3">
                            <Link
                                to={`/service/${service.id}`}
                                className="flex-grow bg-gray-900 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 premium-shadow"
                            >
                                View Quotes
                                <Eye className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-4 py-3.5 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <div className="w-5 h-5 border-2 border-rose-600 border-t-transparent animate-spin rounded-full" />
                                ) : (
                                    <Trash2 className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {hasQuotes ? (
                                <Link
                                    to={`/service/${service.id}`}
                                    className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-50 text-[11px] font-bold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all rounded-xl group/link"
                                >
                                    <span>VIEW MARKET TRENDS</span>
                                    <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <div className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest py-1">
                                    Be the first professional
                                </div>
                            )}

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full premium-gradient text-white text-sm font-bold py-3.5 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 premium-shadow"
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
