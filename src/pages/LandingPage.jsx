import React from 'react';
import { ArrowRight, Search, Briefcase, Star, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useServices } from '../context/ServiceContext';

const LandingPage = () => {
    const { user } = useServices();

    // Determine link destinations based on login status
    const hireLink = user ? '/hire' : '/login?redirect=/hire';
    const workLink = user ? '/work' : '/login?redirect=/work';
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            Helpzy
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                            Get Help. <span className="text-indigo-600">Get Paid.</span><br />
                            All in one place.
                        </h2>

                        <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                            Welcome to the future of work. Helpzy is your all-in-one platform connecting ambitious professionals with clients who need things done. Whether you're looking to hire top talent or find your next big gig, we make it simple, secure, and seamless.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mt-8"
                    >
                        {/* Hire Card */}
                        <Link to={hireLink} className="group">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 h-full flex flex-col items-center text-center hover:border-indigo-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 z-10 group-hover:bg-indigo-600 transition-colors">
                                    <Search className="w-10 h-10 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4 z-10">I want to Hire</h2>
                                <p className="text-gray-600 mb-8 flex-grow z-10">
                                    Post a new job, manage your active requests, and review quotes from professionals.
                                </p>

                                <div className="inline-flex items-center text-indigo-600 font-bold z-10 group-hover:translate-x-1 transition-transform">
                                    Get Started <ArrowRight className="w-5 h-5 ml-2" />
                                </div>
                            </motion.div>
                        </Link>

                        {/* Work Card */}
                        <Link to={workLink} className="group">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 h-full flex flex-col items-center text-center hover:border-emerald-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 z-10 group-hover:bg-emerald-600 transition-colors">
                                    <Briefcase className="w-10 h-10 text-emerald-600 group-hover:text-white transition-colors" />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4 z-10">I want to Work</h2>
                                <p className="text-gray-600 mb-8 flex-grow z-10">
                                    Browse available jobs, submit quotes, and track your sent bids.
                                </p>

                                <div className="inline-flex items-center text-emerald-600 font-bold z-10 group-hover:translate-x-1 transition-transform">
                                    Get Started <ArrowRight className="w-5 h-5 ml-2" />
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-20 bg-white/50 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Verified & Secure", desc: "Every user is vetted. Payments are held in escrow until the job is done perfectly." },
                            { icon: Star, title: "Top Quality", desc: "Access a network of rated professionals committed to delivering excellence." },
                            { icon: Clock, title: "Fast Turnaround", desc: "Post a job in minutes multiple quotes instantly. Speed meets quality." }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
