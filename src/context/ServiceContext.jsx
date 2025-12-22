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

    // Fetch services from Supabase
    const fetchServices = async () => {
        try {
            console.log('Fetching services from Supabase...');
            const { data, error } = await supabase
                .from('services')
                .select(`
                    *,
                    profiles:user_id(full_name),
                    quotes (
                        *,
                        profiles:user_id(full_name)
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('FetchServices Supabase Error:', error);
                throw error;
            }

            console.log('Raw Supabase Response:', data);

            // Map the data for component compatibility
            const mappedData = (data || []).map(service => ({
                ...service,
                createdAt: service.created_at,
                // Handle different potential relationship names
                clientName: service.profiles?.full_name || 'Anonymous',
                quotes: service.quotes?.map(quote => ({
                    ...quote,
                    createdAt: quote.created_at,
                    providerName: quote.profiles?.full_name || 'Anonymous'
                })) || []
            }));

            console.log('Final Mapped Services:', mappedData);
            console.log('Current Logged-in User ID:', user?.id);

            setServices(mappedData);
        } catch (error) {
            console.error('CRITICAL ERROR in fetchServices:', error);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch and session monitoring
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            fetchServices();
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('Auth event:', _event);
            setUser(session?.user ?? null);
            fetchServices(); // Refresh data on login/logout
        });

        return () => subscription.unsubscribe();
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
                });

            if (error) throw error;

            await fetchServices();
            return { success: true };
        } catch (error) {
            console.error('AddQuote Error:', error.message);
            return { success: false, message: error.message };
        }
    };

    return (
        <ServiceContext.Provider value={{
            services,
            addService,
            addQuote,
            user,
            login,
            signup,
            logout,
            resetPassword,
            loading,
            refreshServices: fetchServices
        }}>
            {children}
        </ServiceContext.Provider>
    );
};

