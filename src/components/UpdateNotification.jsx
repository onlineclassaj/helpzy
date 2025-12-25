import React, { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UpdateNotification = () => {
    const [showUpdate, setShowUpdate] = useState(false);
    const [registration, setRegistration] = useState(null);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((reg) => {
                setRegistration(reg);

                // Check if there's already a waiting worker from a previous load
                if (reg.waiting) {
                    setShowUpdate(true);
                }

                // Check for updates every 60 seconds
                setInterval(() => {
                    reg.update();
                }, 60000);

                // Listen for new service worker waiting
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available
                            setShowUpdate(true);
                        }
                    });
                });
            });

            // Listen for controller change (new SW activated)
            let refreshing = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                }
            });
        }
    }, []);

    const handleUpdate = () => {
        if (registration && registration.waiting) {
            // Tell the waiting service worker to activate
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
    };

    const handleDismiss = () => {
        setShowUpdate(false);
    };

    return (
        <AnimatePresence>
            {showUpdate && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-6 text-white">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <RefreshCw className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-1">
                                    Update Available!
                                </h3>
                                <p className="text-sm text-white/90 mb-4">
                                    A new version of Helpzy is ready. Update now to get the latest features and improvements.
                                </p>
                                <button
                                    onClick={handleUpdate}
                                    className="w-full bg-white text-indigo-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                                >
                                    Update Now
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UpdateNotification;
