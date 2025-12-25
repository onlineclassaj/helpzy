import React, { useState } from 'react';
import { useServices } from '../context/ServiceContext';
import { Bell, X, CheckSquare, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotificationCenter = () => {
    const { notifications, unreadCount, markNotificationAsRead } = useServices();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all rounded-xl flex items-center justify-center"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40 bg-black/5"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                        >
                            <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900">Notifications</h3>
                                <button onClick={() => setIsOpen(false)}>
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>

                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.is_read ? 'bg-indigo-50/30' : ''}`}
                                        >
                                            <div className="flex justify-between gap-2 mb-1">
                                                <h4 className="text-sm font-bold text-gray-900">{notif.title}</h4>
                                                {!notif.is_read && (
                                                    <button
                                                        onClick={() => markNotificationAsRead(notif.id)}
                                                        className="text-[10px] font-black uppercase text-indigo-600 hover:underline"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                                                {notif.message}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(notif.created_at).toLocaleDateString()}
                                                </span>
                                                {notif.link && (
                                                    <Link
                                                        to={notif.link}
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            markNotificationAsRead(notif.id);
                                                        }}
                                                        className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline"
                                                    >
                                                        View <ExternalLink className="w-2 h-2" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                                        <p className="text-sm text-gray-400">No notifications yet</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationCenter;
