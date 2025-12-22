import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            setDeferredPrompt(e);
            // Show our custom install prompt
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to the install prompt: ${outcome}`);

        // Clear the deferredPrompt
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        // Store dismissal in localStorage to not show again for a while
        localStorage.setItem('installPromptDismissed', Date.now().toString());
    };

    // Don't show if dismissed recently (within 7 days)
    useEffect(() => {
        const dismissed = localStorage.getItem('installPromptDismissed');
        if (dismissed) {
            const dismissedTime = parseInt(dismissed);
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - dismissedTime < sevenDays) {
                setShowPrompt(false);
            }
        }
    }, []);

    return (
        <AnimatePresence>
            {showPrompt && deferredPrompt && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
                >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Download className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    Install Helpzy
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Get quick access and work offline. Install our app for a better experience!
                                </p>
                                <button
                                    onClick={handleInstallClick}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Install Now
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallPrompt;
