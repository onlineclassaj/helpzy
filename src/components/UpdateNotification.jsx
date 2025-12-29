import React, { useState, useEffect } from 'react';
import { RefreshCw, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_VERSION } from '../constants/version';

const UpdateNotification = () => {
    const [showUpdate, setShowUpdate] = useState(false);
    const [registration, setRegistration] = useState(null);
    const [isForced, setIsForced] = useState(false);

    useEffect(() => {
        // Helper: Parse version string to check if remote > local
        const isNewerVersion = (remote, local) => {
            if (!remote || !local) return false;
            const rParts = remote.split('.').map(Number);
            const lParts = local.split('.').map(Number);

            for (let i = 0; i < 3; i++) {
                if (rParts[i] > lParts[i]) return true;
                if (rParts[i] < lParts[i]) return false;
            }
            return false;
        };

        // 1. Service Worker Update Logic
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((reg) => {
                setRegistration(reg);
                if (reg.waiting) setShowUpdate(true);

                // Check for updates every 60 seconds
                setInterval(() => reg.update(), 60000);

                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            setShowUpdate(true);
                        }
                    });
                });
            });

            let refreshing = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                }
            });
        }

        // 2. Client-Side Version Check (Prevent Loop)
        const checkVersion = async () => {
            try {
                // Check session storage first
                if (sessionStorage.getItem('helpzy_update_dismissed') === APP_VERSION) {
                    return;
                }

                const response = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
                const data = await response.json();

                if (data.version && data.version !== APP_VERSION) {
                    if (isNewerVersion(data.version, APP_VERSION)) {
                        console.log(`[UpdateNotification] New version available: ${data.version}`);
                        setShowUpdate(true);

                        // Force update only for major version mismatch
                        const localMajor = parseInt(APP_VERSION.split('.')[0]);
                        const remoteMajor = parseInt(data.version.split('.')[0]);
                        if (remoteMajor > localMajor) setIsForced(true);
                    }
                }
            } catch (err) {
                // Silent fail for network errors
            }
        };

        const interval = setInterval(checkVersion, 60000); // Check every minute
        checkVersion(); // Initial check

        return () => clearInterval(interval);
    }, []);

    const handleUpdate = () => {
        if (registration && registration.waiting) {
            // Tell the waiting service worker to activate
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else {
            // If no waiting SW, just force a hard refresh
            window.location.reload(true);
        }
    };

    const handleDismiss = () => {
        if (!isForced) {
            setShowUpdate(false);
            sessionStorage.setItem('helpzy_update_dismissed', APP_VERSION);
        }
    };

    return (
        <AnimatePresence>
            {showUpdate && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[9999]"
                >
                    <div className={`${isForced ? 'bg-red-600' : 'bg-gradient-to-r from-indigo-600 to-purple-600'} rounded-2xl shadow-2xl p-6 text-white`}>
                        {!isForced && (
                            <button
                                onClick={handleDismiss}
                                className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                {isForced ? <AlertCircle className="w-6 h-6 text-white" /> : <RefreshCw className="w-6 h-6 text-white" />}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-1">
                                    {isForced ? 'Critical Update Required' : 'Update Available!'}
                                </h3>
                                <p className="text-sm text-white/90 mb-4">
                                    {isForced
                                        ? 'You are using an outdated version. Please update immediately to continue using Helpzy.'
                                        : 'A new version of Helpzy is ready. Update now to get the latest features and improvements.'}
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
