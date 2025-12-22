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

import { ServiceProvider } from './context/ServiceContext';

function App() {
  return (
    <ServiceProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/post-service" element={<PostService />} />
            <Route path="/find-work" element={<FindWork />} />
            <Route path="/my-posts" element={<MyPosts />} />

            <Route path="/hire" element={<HireDashboard />} />
            <Route path="/work" element={<WorkDashboard />} />
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
