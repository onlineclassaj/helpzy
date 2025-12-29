import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, ChevronDown, ChevronUp, FileText, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MySentQuotes = () => {
    const { services, user } = useServices();
    const [expandedQuoteId, setExpandedQuoteId] = useState(null);

    if (!user) return null;

    // Filter services to find ones where the user has submitted a quote
    const servicesWithQuotes = (services || []).filter(service =>
        service && Array.isArray(service.quotes) && service.quotes.some(q => q && q.user_id === user.id)
    );

    const myQuotes = servicesWithQuotes.map(service => {
        const quote = service.quotes.find(q => q.user_id === user.id);
        if (!quote) return null;
        return {
            service,
            quote
        };
    }).filter(Boolean);

    if (myQuotes.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-gray-500 mb-4">You haven't sent any quotes yet.</p>
                <p className="text-sm text-indigo-600 font-bold uppercase tracking-wider">Browse the marketplace to find work!</p>
            </div>
        );
    }

    const toggleExpand = (quoteId) => {
        setExpandedQuoteId(expandedQuoteId === quoteId ? null : quoteId);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'accepted':
                return { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle, label: 'Accepted' };
            case 'rejected':
                return { bg: 'bg-rose-50', text: 'text-rose-700', icon: AlertCircle, label: 'Declined' };
            default:
                return { bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock, label: 'Pending' };
        }
    };

    return (
        <div className="space-y-4">
            {myQuotes.map(({ service, quote }) => {
                const isExpanded = expandedQuoteId === quote.id;
                const status = getStatusStyles(quote.status);
                const StatusIcon = status.icon;

                return (
                    <motion.div
                        key={quote.id}
                        layout
                        className={`bg-white rounded-2xl shadow-sm border ${isExpanded ? 'border-indigo-200' : 'border-gray-100'} overflow-hidden transition-all`}
                    >
                        <div
                            onClick={() => toggleExpand(quote.id)}
                            className="p-6 flex flex-col md:flex-row justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-50 text-indigo-600 uppercase tracking-tighter">
                                        {service.category}
                                    </span>
                                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black ${status.bg} ${status.text} uppercase tracking-tighter`}>
                                        <StatusIcon className="w-3 h-3" />
                                        {status.label}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group flex items-center gap-2">
                                    {service.title}
                                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />}
                                </h3>
                                <div className="flex items-center text-xs text-gray-400">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Submitted {new Date(quote.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-center md:border-l border-gray-100 md:pl-6 min-w-[120px]">
                                <div className="text-2xl font-black text-indigo-600">₹{quote.amount}</div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">My Proposal</p>
                            </div>
                        </div>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-gray-100 bg-gray-50/30"
                                >
                                    <div className="p-6 space-y-6">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* My Pitch */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                    <Info className="w-3 h-3 text-indigo-500" />
                                                    My Proposal Details
                                                </h4>
                                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                                        {quote.message}
                                                    </p>
                                                    {quote.attachment_url && (
                                                        <a
                                                            href={quote.attachment_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                                                        >
                                                            <FileText className="w-4 h-4" />
                                                            View Proposal Attachment
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Service Original Request */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                    <Info className="w-3 h-3 text-indigo-500" />
                                                    Original Service Request
                                                </h4>
                                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                    <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed italic">
                                                        "{service.description}"
                                                    </p>
                                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                                        <Link
                                                            to={`/service/${service.id}`}
                                                            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                                                        >
                                                            View Full Service Page
                                                            <CheckCircle className="w-3 h-3" />
                                                        </Link>
                                                        <span className="text-[10px] text-gray-400">
                                                            Posted by {service.clientName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default MySentQuotes;
