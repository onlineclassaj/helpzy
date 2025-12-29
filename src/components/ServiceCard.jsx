import React from 'react';
import { Clock, MessageSquare, MapPin, Trash2, Eye } from 'lucide-react';
import { useServices } from '../context/ServiceContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuoteModal from './QuoteModal';

const ServiceCard = ({ service, isOwner = false }) => {
    const { deleteService } = useServices();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this job post?')) {
            setIsDeleting(true);
            const result = await deleteService(service.id);
            if (!result.success) {
                alert(result.message || 'Failed to delete.');
                setIsDeleting(false);
            }
        }
    };

    const handleCardClick = () => {
        navigate(`/service/${service.id}`);
    };

    const handleQuoteClick = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleViewQuotes = (e) => {
        e.stopPropagation();
        navigate(`/service/${service.id}`);
    };

    const quoteCount = service.quotes ? service.quotes.length : 0;

    // Unified tile wrapper styles for consistency
    const tileClasses = "bg-white border border-gray-200 hover:border-indigo-300 p-4 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-150";

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.995 }}
                onClick={handleCardClick}
                className={tileClasses}
            >
                {isOwner ? (
                    /* ===== OWNER VIEW (I Want to Hire - My Active Requests) ===== */
                    <>
                        {/* Top Row: Date left, Delete right (RED) */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center text-gray-400 text-xs font-medium">
                                <Clock className="w-3.5 h-3.5 mr-1" />
                                {new Date(service.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete"
                            >
                                {isDeleting ? (
                                    <div className="w-4 h-4 border-2 border-red-400 border-t-transparent animate-spin rounded-full" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="mb-3">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-700 mb-1.5">
                                {service.category}
                            </span>
                            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                                {service.title}
                            </h3>
                            {service.location && (
                                <div className="flex items-center text-gray-500 text-xs mt-1">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    <span className="truncate">{service.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Bottom Row: Quote count left, View button right (BIGGER) */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            {quoteCount > 0 ? (
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                    {quoteCount} quote{quoteCount !== 1 ? 's' : ''}
                                </span>
                            ) : (
                                <span className="text-xs text-gray-400">No quotes yet</span>
                            )}
                            <button
                                onClick={handleViewQuotes}
                                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                View Quotes
                            </button>
                        </div>
                    </>
                ) : (
                    /* ===== WORKER VIEW (I Want to Work) ===== */
                    <>
                        {/* Top Row: Category left, Date right */}
                        <div className="flex items-center justify-between mb-2">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-700">
                                {service.category}
                            </span>
                            <div className="flex items-center text-gray-400 text-xs font-medium">
                                <Clock className="w-3.5 h-3.5 mr-1" />
                                {new Date(service.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                                {service.title}
                            </h3>
                            {service.location && (
                                <div className="flex items-center text-gray-500 text-xs mt-1">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    <span className="truncate">{service.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Bottom Row: Quote count left, Send Quote button right (BIGGER) */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            {quoteCount > 0 ? (
                                <span className="text-xs font-medium text-gray-500">
                                    {quoteCount} quote{quoteCount !== 1 ? 's' : ''} sent
                                </span>
                            ) : (
                                <span className="text-xs text-gray-400">Be first to quote</span>
                            )}
                            <button
                                onClick={handleQuoteClick}
                                className="flex items-center gap-1.5 px-4 py-2 premium-gradient text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all shadow-sm"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Send Quote
                            </button>
                        </div>
                    </>
                )}
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
