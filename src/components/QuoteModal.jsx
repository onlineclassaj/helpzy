import { X, Send, CheckCircle, Paperclip } from 'lucide-react';
import { useServices } from '../context/ServiceContext';

const QuoteModal = ({ isOpen, onClose, serviceId, serviceTitle }) => {
    const { addQuote, uploadFile } = useServices();
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [attachmentName, setAttachmentName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachment(file);
            setAttachmentName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !message) return;

        setLoading(true);
        setError('');

        try {
            let attachmentUrl = '';
            if (attachment) {
                const uploadResult = await uploadFile(attachment, 'quote-attachments');
                if (uploadResult.success) {
                    attachmentUrl = uploadResult.url;
                } else {
                    setError('Failed to upload attachment.');
                    setLoading(false);
                    return;
                }
            }

            const result = await addQuote(serviceId, {
                amount: parseFloat(amount),
                message,
                attachment_url: attachmentUrl
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    setAmount('');
                    setMessage('');
                    setAttachment(null);
                    setAttachmentName('');
                    setSuccess(false);
                    onClose();
                }, 1500);
            } else {
                setError(result.message || 'Failed to send quote.');
            }
        } catch (err) {
            setError('An error occurred.');
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-6 bg-indigo-50 border-b border-indigo-100">
                            <h3 className="text-xl font-bold text-gray-900">Send a Quote</h3>
                            <p className="text-sm text-indigo-700 mt-1">For: {serviceTitle}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Quote sent successfully!
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 1500"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    required
                                    disabled={loading || success}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    rows="3"
                                    placeholder="Describe why you are the best fit..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                    required
                                    disabled={loading || success}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (Photo or PDF)</label>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                        <Paperclip className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            {attachmentName ? attachmentName : 'Choose file'}
                                        </span>
                                        <input type="file" onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />
                                    </label>
                                    {attachmentName && (
                                        <button
                                            type="button"
                                            onClick={() => { setAttachment(null); setAttachmentName(''); }}
                                            className="text-red-500 text-xs hover:underline"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || success}
                                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:transform-none"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : success ? (
                                    <>
                                        Sent!
                                        <CheckCircle className="w-5 h-5" />
                                    </>
                                ) : (
                                    <>
                                        Send Quote
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuoteModal;
