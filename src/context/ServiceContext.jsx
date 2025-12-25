import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ServiceContext = createContext();

export const useServices = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServices must be used within a ServiceProvider');
    }
    return context;
};

export const ServiceProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Services state
    const [services, setServices] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch services from Supabase
    const fetchServices = async () => {
        setLoading(true);
        console.log('--- FETCH_SERVICES_V2.2 ---');
        try {
            if (!supabase) {
                console.error('Supabase client missing!');
                setLoading(false);
                return;
            }

            // Fetch services with profiles and quotes
            const { data: rawData, error: dbError } = await supabase
                .from('services')
                .select(`
                    *,
                    profiles (full_name),
                    quotes (
                        *,
                        profiles (full_name)
                    )
                `)
                .order('created_at', { ascending: false });

            if (dbError) {
                console.error('Complex fetch failed, attempting simple fetch:', dbError);
                // Fallback to simple fetch if joins fail
                const { data: simpleData, error: simpleError } = await supabase
                    .from('services')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (simpleError) throw simpleError;
                rawData = simpleData;
            }

            const processed = (rawData || []).map(item => {
                if (!item) return null;
                return {
                    ...item,
                    createdAt: item.created_at || new Date().toISOString(),
                    title: item.title || 'Untitled',
                    category: item.category || 'Other',
                    description: item.description || '',
                    location: item.location || 'Not specified',
                    clientName: item.profiles?.full_name || 'Anonymous User',
                    quotes: Array.isArray(item.quotes) ? item.quotes.map(q => ({
                        ...q,
                        createdAt: q.created_at || new Date().toISOString(),
                        providerName: q.profiles?.full_name || 'Anonymous Provider'
                    })) : []
                };
            }).filter(Boolean);

            console.log('Processed Services Count:', processed.length);
            setServices(processed);
        } catch (err) {
            console.error('Global Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNotifications(data || []);
            setUnreadCount(data?.filter(n => !n.is_read).length || 0);
        } catch (error) {
            console.error('FetchNotifications Error:', error);
        }
    };

    const markNotificationAsRead = async (id) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', id);
            if (error) throw error;
            fetchNotifications();
        } catch (error) {
            console.error('MarkNotificationAsRead Error:', error);
        }
    };

    const sendNotification = async (userId, title, message, link = '') => {
        try {
            await supabase
                .from('notifications')
                .insert({ user_id: userId, title, message, link });
        } catch (error) {
            console.error('SendNotification Error:', error);
        }
    };

    // Initial fetch and session monitoring
    useEffect(() => {
        if (!supabase) {
            console.error('ServiceContext: Supabase client is null. Cannot initialize auth listeners.');
            setLoading(false);
            return;
        }

        console.log('ServiceContext: Initializing...');

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('ServiceContext: Initial session retrieved:', session?.user?.id || 'No user');
            setUser(session?.user ?? null);
            fetchServices();
            if (session?.user) fetchNotifications();
        }).catch(err => {
            console.error('ServiceContext: getSession Error:', err);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('ServiceContext: Auth event fired:', _event, session?.user?.id || 'No user');
            setUser(session?.user ?? null);
            fetchServices(); // Refresh data on login/logout
            if (session?.user) fetchNotifications();
        });

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    // Sign up with email
    const signup = async (email, password, name) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) throw error;

            return { success: true, message: 'Check your email for verification link!' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // Sign in with email
    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // Sign out
    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    // Reset password
    const resetPassword = async (email) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) throw error;

            return { success: true, message: 'Password reset email sent!' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const addService = async (service) => {
        if (!user) {
            console.error('AddService Failed: No User found in context');
            return { success: false, message: 'Must be logged in' };
        }

        console.log('Attempting to add service for user:', user.id);

        try {
            const { data, error } = await supabase
                .from('services')
                .insert({
                    title: service.title,
                    category: service.category,
                    description: service.description,
                    location: service.location,
                    image_url: service.image_url,
                    user_id: user.id,
                })
                .select(); // Return the inserted data for verification

            if (error) {
                console.error('Supabase Insert Error:', error);
                throw error;
            }

            console.log('Insert Success! Data:', data);

            await fetchServices(); // Wait for refresh
            return { success: true };
        } catch (error) {
            console.error('AddService Catch Error:', error.message);
            return { success: false, message: error.message };
        }
    };

    const addQuote = async (serviceId, quote) => {
        if (!user) return { success: false, message: 'Must be logged in' };

        console.log('Attempting to add quote for service:', serviceId, 'by user:', user.id);

        try {
            const { error } = await supabase
                .from('quotes')
                .insert({
                    service_id: serviceId,
                    user_id: user.id,
                    amount: quote.amount,
                    message: quote.message,
                    attachment_url: quote.attachment_url,
                });

            if (error) throw error;

            // Notify service owner
            const service = services.find(s => s.id === serviceId);
            if (service) {
                await sendNotification(
                    service.user_id,
                    'New Quote Received',
                    `You received a new quote of ₹${quote.amount} for "${service.title}"`,
                    `/service/${serviceId}`
                );
            }

            await fetchServices();
            return { success: true };
        } catch (error) {
            console.error('AddQuote Error:', error.message);
            return { success: false, message: error.message };
        }
    };

    const acceptQuote = async (serviceId, quoteId) => {
        if (!user) return { success: false, message: 'Must be logged in' };

        try {
            // Update quote status
            const { error: quoteError } = await supabase
                .from('quotes')
                .update({ status: 'accepted' })
                .eq('id', quoteId);

            if (quoteError) throw quoteError;

            // Update service status
            const { error: serviceError } = await supabase
                .from('services')
                .update({ status: 'completed' })
                .eq('id', serviceId);

            if (serviceError) throw serviceError;

            // Notify provider
            const service = services.find(s => s.id === serviceId);
            const quote = service?.quotes.find(q => q.id === quoteId);
            if (quote) {
                await sendNotification(
                    quote.user_id,
                    'Quote Accepted!',
                    `Your quote for "${service.title}" has been accepted.`,
                    `/service/${serviceId}`
                );
            }

            await fetchServices();
            return { success: true };
        } catch (error) {
            console.error('AcceptQuote Error:', error.message);
            return { success: false, message: error.message };
        }
    };

    const uploadFile = async (file, bucket) => {
        if (!user) return { success: false, message: 'Must be logged in' };

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return { success: true, url: data.publicUrl };
        } catch (error) {
            console.error('Upload Error:', error.message);
            return { success: false, message: error.message };
        }
    };

    const deleteService = async (serviceId) => {
        if (!user) return { success: false, message: 'Must be logged in' };

        try {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', serviceId)
                .eq('user_id', user.id); // Security: ensure user owns the service

            if (error) throw error;

            await fetchServices();
            return { success: true };
        } catch (error) {
            console.error('DeleteService Error:', error.message);
            return { success: false, message: error.message };
        }
    };

    return (
        <ServiceContext.Provider value={{
            services,
            addService,
            deleteService,
            addQuote,
            acceptQuote,
            uploadFile,
            notifications,
            unreadCount,
            markNotificationAsRead,
            user,
            login,
            signup,
            logout,
            resetPassword,
            loading,
            refreshServices: fetchServices,
            refreshNotifications: fetchNotifications
        }}>
            {children}
        </ServiceContext.Provider>
    );
};

