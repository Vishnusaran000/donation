import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Layout/Navigation';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { HeroSection } from './components/Home/HeroSection';
import { FeaturedCampaigns } from './components/Home/FeaturedCampaigns';
import { AboutSection } from './components/Home/AboutSection';
import { DonorDashboard } from './components/Dashboard/DonorDashboard';
import { CampaignList } from './components/Campaigns/CampaignList';
import { DonationModal } from './components/Campaigns/DonationModal';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const { user, loading } = useAuth();

  const handleNavigate = (page: string, campaignId?: string) => {
    setCurrentPage(page);
    if (campaignId) {
      setSelectedCampaignId(campaignId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Auth pages
  if (currentPage === 'login') {
    return <LoginForm onNavigate={handleNavigate} />;
  }

  if (currentPage === 'signup') {
    return <SignupForm onNavigate={handleNavigate} />;
  }

  // Main app layout
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'home' && (
        <>
          <HeroSection onNavigate={handleNavigate} />
          <FeaturedCampaigns onNavigate={handleNavigate} />
        </>
      )}

      {currentPage === 'about' && <AboutSection />}

      {currentPage === 'campaigns' && (
        <CampaignList onNavigate={handleNavigate} />
      )}

      {currentPage === 'campaign-details' && selectedCampaignId && (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-blue-500 to-green-500"></div>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Campaign Details
                </h1>
                <p className="text-gray-600 mb-6">
                  Detailed campaign information would be displayed here with beneficiary stories, 
                  updates, and donation options.
                </p>
                <button
                  onClick={() => setShowDonationModal(true)}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'dashboard' && user && (
        <DonorDashboard onNavigate={handleNavigate} />
      )}

      {currentPage === 'profile' && user && (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        campaignTitle="Sample Campaign"
        organizationName="Sample Organization"
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;