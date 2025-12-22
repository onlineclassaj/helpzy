import React from 'react';
import { ArrowRight, Search, Briefcase, Star, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useServices } from '../context/ServiceContext';

const LandingPage = () => {
    const { user } = useServices();

    const hireLink = user ? '/hire' : '/login?redirect=/hire';
    const workLink = user ? '/work' : '/login?redirect=/work';

    return (
        <div className="min-h-screen bg-slate-50 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob"></div>
                    <div className="absolute top-[10%] right-[-5%] w-[45%] h-[45%] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-200/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-sm mb-8"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                            <span className="text-sm font-bold text-gray-600 tracking-wide uppercase">Helpzy v2.1 • Next Gen Marketplace</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 mb-6"
                        >
                            Get Help. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Get Paid.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="max-w-2xl mx-auto text-xl text-gray-500 mb-12 leading-relaxed"
                        >
                            The premium workspace for professionals and clients. Experience a seamless, secure, and purely modern way to connect and collaborate.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link to={hireLink} className="w-full sm:w-auto">
                                <button className="w-full px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all premium-shadow flex items-center justify-center gap-2 group">
                                    I want to Hire
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link to={workLink} className="w-full sm:w-auto">
                                <button className="w-full px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                    I want to Work
                                    <Briefcase className="w-5 h-5" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Secured", desc: "Every transaction is protected by our advanced security layers.", color: "bg-indigo-50 text-indigo-600" },
                            { icon: Star, title: "Premium", desc: "Access the top 1% of talent and high-value opportunities.", color: "bg-purple-50 text-purple-600" },
                            { icon: Clock, title: "Efficiency", desc: "Speed matters. Get results in hours, not weeks.", color: "bg-pink-50 text-pink-600" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-10 rounded-[32px] group hover:scale-[1.02] transition-all"
                            >
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
