import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';

const PostService = () => {
    const { addService } = useServices();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Safety check for categories
    const categoriesData = CATEGORIES || {};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.category || !formData.description) return;

        setLoading(true);
        setError('');

        try {
            const result = await addService(formData);
            if (result.success) {
                navigate('/hire');
            } else {
                setError(result.message || 'Failed to post service request.');
                setLoading(false);
            }
        } catch (err) {
            console.error('Submit Error:', err);
            setError('A critical error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="bg-indigo-600 py-6 px-8">
                    <h2 className="text-3xl font-bold text-white">Post a Service Request</h2>
                    <p className="text-indigo-100 mt-2">Describe what you need done and receive quotes from professionals.</p>
                </div>

                <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Fix Leaky Faucet"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                            required
                        >
                            <option value="">Select a Category</option>
                            {Object.entries(categoriesData).map(([group, subCats]) => (
                                <optgroup key={group} label={group}>
                                    {(subCats || []).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Describe the task in detail. Include location, timing, and any specific requirements..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                            required
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:transform-none"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Posting...
                                </>
                            ) : (
                                <>
                                    Post Service Now
                                    <CheckCircle className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default PostService;
