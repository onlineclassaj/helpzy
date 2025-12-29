import React from 'react';
import { Clock, MessageSquare, MapPin, ChevronRight } from 'lucide-react';
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
        if (window.confirm('Are you sure you want to delete this job post? This action cannot be undone.')) {
            setIsDeleting(true);
            const result = await deleteService(service.id);
            if (!result.success) {
                alert(result.message || 'Failed to delete service.');
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

    const quoteCount = service.quotes ? service.quotes.length : 0;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCardClick}
                className="bg-white border border-gray-200/80 hover:border-indigo-200 p-3 sm:p-4 rounded-xl group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
            >
                {/* Compact Layout: Category + Title + Location | Date on right */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        {/* Category Badge */}
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-700 mb-1.5">
                            {service.category}
                        </span>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {service.title}
                        </h3>

                        {/* Location */}
                        {service.location && (
                            <div className="flex items-center text-gray-500 text-xs mt-1">
                                <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                                <span className="truncate">{service.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Date - Right aligned */}
                    <div className="flex flex-col items-end flex-shrink-0">
                        <div className="flex items-center text-gray-400 text-[10px] font-medium">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(service.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                        {quoteCount > 0 && (
                            <span className="mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                {quoteCount} quote{quoteCount !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                    {isOwner ? (
                        <>
                            <button
                                onClick={handleCardClick}
                                className="flex-1 bg-gray-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-black transition-all flex items-center justify-center gap-1"
                            >
                                View Quotes
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-3 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? '...' : 'Delete'}
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleQuoteClick}
                                className="flex-1 premium-gradient text-white text-xs font-bold py-2 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-1"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                Send Quote
                            </button>
                            <button
                                onClick={handleCardClick}
                                className="px-3 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center gap-1"
                            >
                                Details
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </>
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
