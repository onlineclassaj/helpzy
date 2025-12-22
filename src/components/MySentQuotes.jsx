import React from 'react';
import { useServices } from '../context/ServiceContext';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';

const MySentQuotes = () => {
    const { services, user } = useServices();

    if (!user) return null;

    // Filter services to find ones where the user has submitted a quote
    const servicesWithQuotes = (services || []).filter(service =>
        service && Array.isArray(service.quotes) && service.quotes.some(q => q && q.user_id === user.id)
    );

    const myQuotes = servicesWithQuotes.map(service => {
        const quote = service.quotes.find(q => q.user_id === user.id);
        return {
            service,
            quote
        };
    });

    if (myQuotes.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-gray-500 mb-4">You haven't sent any quotes yet.</p>
                <p className="text-sm text-indigo-600">Browse the marketplace to find work!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {myQuotes.map(({ service, quote }, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between gap-4 hover:border-indigo-300 transition-colors">
                    <div>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600 mb-2">
                            {service.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            <Link to={`/service/${service.id}`} className="hover:text-indigo-600 transition-colors">
                                {service.title}
                            </Link>
                        </h3>
                        <div className="flex items-center text-xs text-gray-400">
                            <Clock className="w-3 h-3 mr-1" />
                            Quoted on {new Date(quote.createdAt).toLocaleDateString()}
                        </div>
                        <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded inline-block max-w-md truncate">
                            "{quote.message}"
                        </p>
                    </div>

                    <div className="flex flex-col items-end justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[120px]">
                        <div className="text-xl font-bold text-green-600">₹{quote.amount}</div>
                        <p className="text-xs text-gray-400">Your Bid</p>
                        <div className="mt-2 flex items-center text-xs text-indigo-600 font-medium">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Sent
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MySentQuotes;
