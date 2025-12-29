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

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.995 }}
                onClick={handleCardClick}
                className="bg-white border border-gray-200 hover:border-indigo-300 p-3 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-150"
            >
                {isOwner ? (
                    /* ===== OWNER VIEW (My Active Requests) ===== */
                    <>
                        {/* Top Row: Date left, Delete right */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center text-gray-400 text-[10px] font-medium">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(service.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete"
                            >
                                {isDeleting ? (
                                    <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent animate-spin rounded-full" />
                                ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                )}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="mb-2">
                            <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-700 mb-1">
                                {service.category}
                            </span>
                            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
                                {service.title}
                            </h3>
                            {service.location && (
                                <div className="flex items-center text-gray-500 text-[10px] mt-0.5">
                                    <MapPin className="w-2.5 h-2.5 mr-0.5" />
                                    <span className="truncate">{service.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Bottom Row: Quote count left, View button right */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            {quoteCount > 0 ? (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                    {quoteCount} quote{quoteCount !== 1 ? 's' : ''} received
                                </span>
                            ) : (
                                <span className="text-[10px] text-gray-400">No quotes yet</span>
                            )}
                            <button
                                onClick={handleViewQuotes}
                                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Eye className="w-3 h-3" />
                                View
                            </button>
                        </div>
                    </>
                ) : (
                    /* ===== WORKER VIEW (I Want to Work) ===== */
                    <>
                        {/* Main Content Row */}
                        <div className="flex items-start gap-3">
                            {/* Left: Info stack */}
                            <div className="flex-1 min-w-0">
                                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-700 mb-1">
                                    {service.category}
                                </span>
                                <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
                                    {service.title}
                                </h3>
                                {service.location && (
                                    <div className="flex items-center text-gray-500 text-[10px] mt-0.5">
                                        <MapPin className="w-2.5 h-2.5 mr-0.5" />
                                        <span className="truncate">{service.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                                    <span className="flex items-center">
                                        <Clock className="w-2.5 h-2.5 mr-0.5" />
                                        {new Date(service.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                    {quoteCount > 0 && (
                                        <span className="text-emerald-600 font-medium">
                                            • {quoteCount} quote{quoteCount !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Right: Send Quote button (compact) */}
                            <button
                                onClick={handleQuoteClick}
                                className="flex-shrink-0 flex items-center gap-1 px-3 py-2 premium-gradient text-white text-[10px] font-bold rounded-lg hover:opacity-90 transition-all shadow-sm"
                            >
                                <MessageSquare className="w-3 h-3" />
                                Quote
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
