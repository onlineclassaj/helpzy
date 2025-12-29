import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InstallPrompt from './components/InstallPrompt';
import UpdateNotification from './components/UpdateNotification';
import LandingPage from './pages/LandingPage';
import PostService from './pages/PostService';
import FindWork from './pages/FindWork';
import Login from './pages/Login';
import MyPosts from './pages/MyPosts';
import HireDashboard from './pages/HireDashboard';
import WorkDashboard from './pages/WorkDashboard';
import ServiceDetails from './pages/ServiceDetails';

import AuthGuard from './components/AuthGuard';

import { ServiceProvider } from './context/ServiceContext';

function App() {
  return (
    <ServiceProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Protected Routes */}
            <Route path="/post-service" element={<AuthGuard><PostService /></AuthGuard>} />
            <Route path="/find-work" element={<AuthGuard><FindWork /></AuthGuard>} />
            <Route path="/my-posts" element={<AuthGuard><MyPosts /></AuthGuard>} />
            <Route path="/hire" element={<AuthGuard><HireDashboard /></AuthGuard>} />
            <Route path="/work" element={<AuthGuard><WorkDashboard /></AuthGuard>} />

            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <InstallPrompt />
          <UpdateNotification />
        </div>
      </Router>
    </ServiceProvider>
  );
}

export default App;
