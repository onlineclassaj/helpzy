import React from 'react';
import { ArrowRight, Search, Briefcase, Star, Shield, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useServices } from '../context/ServiceContext';
import { APP_VERSION } from '../constants/version';

const LandingPage = () => {
    const { user } = useServices();

    const hireLink = '/hire';
    const workLink = '/work';

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
                        {/* 1. Main Branding - Dominant */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                            className="mb-6"
                        >
                            <h1 className="text-6xl sm:text-8xl font-black text-gray-900 tracking-tighter flex flex-col items-center justify-center gap-2">
                                <span className="premium-gradient text-transparent bg-clip-text drop-shadow-sm">HELPZY</span>
                            </h1>
                            <p className="mt-4 text-lg sm:text-2xl font-bold text-gray-600 max-w-xl mx-auto">
                                Find work. Hire services. <span className="text-indigo-600">Simple & fast.</span>
                            </p>
                        </motion.div>

                        {/* 2. Secondary Tagline - Smaller */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-400 mb-8 sm:mb-12"
                        >
                            Get Help. <span className="text-gray-900">Get Paid.</span>
                        </motion.h2>

                        {/* 3. Description - Even smaller */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="max-w-xl mx-auto text-base sm:text-lg text-gray-500 mb-10 leading-relaxed font-medium"
                        >
                            A seamless, secure way to connect and collaborate.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
                        >
                            {/* Hire Tile */}
                            <Link to={hireLink} className="block group h-full">
                                <motion.div
                                    whileHover={{ scale: 1.03, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white p-6 sm:p-8 rounded-3xl shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300 relative overflow-hidden h-full min-h-[200px] sm:min-h-[220px] flex flex-col"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="relative z-10 flex flex-col flex-1">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                                            <Search className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-black mb-2">I want to Hire</h3>
                                        <p className="text-sm text-white/80 mb-4 flex-1">Post a task and get quotes from professionals</p>
                                        <div className="flex items-center text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                                            <span>GET STARTED</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>

                            {/* Work Tile */}
                            <Link to={workLink} className="block group h-full">
                                <motion.div
                                    whileHover={{ scale: 1.03, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 text-gray-900 p-6 sm:p-8 rounded-3xl shadow-2xl hover:shadow-purple-200/50 border border-indigo-100 transition-all duration-300 relative overflow-hidden h-full min-h-[200px] sm:min-h-[220px] flex flex-col"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="relative z-10 flex flex-col flex-1">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                                            <Briefcase className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-black mb-2">I want to Work</h3>
                                        <p className="text-sm text-gray-500 mb-4 flex-1">Browse jobs and start earning today</p>
                                        <div className="flex items-center text-xs font-bold text-gray-400 group-hover:text-indigo-600 transition-colors">
                                            <span>FIND JOBS</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">How Helpzy Works</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Connecting skilled professionals with clients who need tasks done, all in one seamless platform.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Clients Column */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                                    <Search className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">For Clients</h3>
                            </div>
                            {[
                                { step: "01", title: "Post a Request", desc: "Describe the task you need help with in detail." },
                                { step: "02", title: "Review Quotes", desc: "Receive and compare quotes from verified professionals." },
                                { step: "03", title: "Get Results", desc: "Accept the best quote and get your service completed." }
                            ].map((item, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-6 items-start group">
                                    <span className="text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors uppercase italic">{item.step}</span>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Providers Column */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">For Professionals</h3>
                            </div>
                            {[
                                { step: "01", title: "Find Opportunities", desc: "Browse through active service requests in your category." },
                                { step: "02", title: "Submit Quotes", desc: "Pitch your services with a clear price and timeline." },
                                { step: "03", title: "Start Earning", desc: "Get hired and build your reputation with premium clients." }
                            ].map((item, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-6 items-start group">
                                    <span className="text-4xl font-black text-purple-100 group-hover:text-purple-200 transition-colors uppercase italic">{item.step}</span>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Section - Expanded */}
            <section className="py-24 relative bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Simply Better in Every Way</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">We’ve built a platform that prioritzes security, clarity, and speed above all else.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Secure Workflow", desc: "End-to-end encryption for your data and secure communication channels.", color: "bg-indigo-50 text-indigo-600 border border-indigo-100" },
                            { icon: Star, title: "Verified Ratings", desc: "Every professional is rated by real clients, ensuring the highest standards.", color: "bg-amber-50 text-amber-600 border border-amber-100" },
                            { icon: ArrowRight, title: "Transparent Pricing", desc: "No hidden fees. Compare quotes and know exactly what you’ll pay.", color: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
                            { icon: Clock, title: "Real-time Alerts", desc: "Get notified instantly when you receive a quote or an acceptance.", color: "bg-blue-50 text-blue-600 border border-blue-100" },
                            { icon: Search, title: "Smart Filtering", desc: "Filter by price, category, and rating to find the perfect match.", color: "bg-purple-50 text-purple-600 border border-purple-100" },
                            { icon: CheckCircle, title: "Quality Guarantee", desc: "We strive to maintain a premium pool of talent for your peace of mind.", color: "bg-rose-50 text-rose-600 border border-rose-100" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-10 rounded-[32px] group hover:scale-[1.02] transition-all bg-white shadow-sm border border-gray-100 hover:border-indigo-100"
                            >
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform shadow-sm`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm lg:text-base">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-600 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="glass-card py-20 px-8 rounded-[48px] border border-gray-100 shadow-2xl shadow-indigo-100/30">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="text-4xl md:text-6xl font-black text-gray-900 mb-8"
                        >
                            Ready to transform the <br /> way you work?
                        </motion.h2>
                        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">Join the marketplace where quality meets opportunity. Whether you need a task done or want to offer your skills, Helpzy is your new home.</p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to={hireLink} className="w-full sm:w-auto">
                                <button className="w-full px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all premium-shadow tracking-widest uppercase text-sm">
                                    Start Hiring
                                </button>
                            </Link>
                            <Link to={workLink} className="w-full sm:w-auto">
                                <button className="w-full px-12 py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all premium-shadow tracking-widest uppercase text-sm">
                                    Find Jobs
                                </button>
                            </Link>
                        </div>

                        <div className="mt-16 flex items-center justify-center gap-8 grayscale opacity-50">
                            {/* Placeholder for "Trusted by" or Platform Stats */}
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-black text-gray-900">500+</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Jobs</span>
                            </div>
                            <div className="w-[1px] h-8 bg-gray-200"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-black text-gray-900">1.2k</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Pros</span>
                            </div>
                            <div className="w-[1px] h-8 bg-gray-200"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-black text-gray-900">4.9/5</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
