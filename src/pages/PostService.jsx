import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Camera, X } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';
import { useServices } from '../context/ServiceContext';

const PostService = () => {
    const { uploadFile, addService } = useServices();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        location: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Safety check for categories
    const categoriesData = CATEGORIES || {};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.category || !formData.description) return;

        setLoading(true);
        setError('');

        try {
            let imageUrl = '';
            if (imageFile) {
                const uploadResult = await uploadFile(imageFile, 'service-attachments');
                if (uploadResult.success) {
                    imageUrl = uploadResult.url;
                } else {
                    setError('Failed to upload image. Please try again.');
                    setLoading(false);
                    return;
                }
            }

            const result = await addService({ ...formData, image_url: imageUrl });
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
                            rows="4"
                            placeholder="Describe the task in detail. Include timing and any specific requirements..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Mumbai, Maharashtra"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Photos (Optional)</label>
                            <div className="flex items-center gap-4">
                                {!imagePreview ? (
                                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-2 px-4 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all">
                                        <Camera className="w-6 h-6 text-gray-400 mb-1" />
                                        <span className="text-xs text-gray-500">Attach Photos</span>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                ) : (
                                    <div className="relative flex-1 group">
                                        <img src={imagePreview} alt="Preview" className="w-full h-20 object-cover rounded-xl border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
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
