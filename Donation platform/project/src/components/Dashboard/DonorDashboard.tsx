import React, { useState } from 'react';
import { Heart, Receipt, User, DollarSign, Calendar, Download, Eye } from 'lucide-react';
import { Donation } from '../../types';

interface DonorDashboardProps {
  onNavigate: (page: string) => void;
}

export function DonorDashboard({ onNavigate }: DonorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'donations' | 'receipts' | 'profile'>('donations');

  // Mock data - replace with actual API calls
  const donations: Donation[] = [
    {
      id: '1',
      amount: 100,
      campaign_id: '1',
      campaign_title: 'Clean Water for Rural Communities',
      donor_id: '1',
      donor_name: 'John Doe',
      message: 'Happy to support this great cause!',
      payment_method: 'Credit Card',
      receipt_url: '/receipts/receipt-1.pdf',
      created_at: '2024-12-15T10:30:00Z',
    },
    {
      id: '2',
      amount: 50,
      campaign_id: '2',
      campaign_title: 'Education for Underprivileged Children',
      donor_id: '1',
      donor_name: 'John Doe',
      payment_method: 'PayPal',
      receipt_url: '/receipts/receipt-2.pdf',
      created_at: '2024-12-10T14:15:00Z',
    },
    {
      id: '3',
      amount: 200,
      campaign_id: '3',
      campaign_title: 'Emergency Food Relief Program',
      donor_id: '1',
      donor_name: 'John Doe',
      message: 'Every family deserves nutritious meals.',
      payment_method: 'Bank Transfer',
      receipt_url: '/receipts/receipt-3.pdf',
      created_at: '2024-12-05T09:45:00Z',
    },
  ];

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const campaignCount = new Set(donations.map(d => d.campaign_id)).size;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const DonationsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Total Donated</h3>
              <p className="text-3xl font-bold">{formatCurrency(totalDonated)}</p>
            </div>
            <DollarSign className="h-8 w-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Campaigns Supported</h3>
              <p className="text-3xl font-bold">{campaignCount}</p>
            </div>
            <Heart className="h-8 w-8 opacity-80 fill-current" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Total Donations</h3>
              <p className="text-3xl font-bold">{donations.length}</p>
            </div>
            <Receipt className="h-8 w-8 opacity-80" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Donations</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {donations.map((donation) => (
            <div key={donation.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {donation.campaign_title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(donation.created_at)}
                    </span>
                    <span>{donation.payment_method}</span>
                  </div>
                  {donation.message && (
                    <p className="text-gray-600 text-sm italic">"{donation.message}"</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600 mb-2">
                    {formatCurrency(donation.amount)}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      View Campaign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ReceiptsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Tax Receipts</h3>
          <p className="text-sm text-gray-600 mt-1">
            Download your donation receipts for tax purposes
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {donations.map((donation) => (
            <div key={donation.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
              <div>
                <h4 className="text-md font-medium text-gray-900">
                  Receipt #{donation.id.padStart(6, '0')}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <span>{donation.campaign_title}</span>
                  <span>•</span>
                  <span>{formatDate(donation.created_at)}</span>
                  <span>•</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(donation.amount)}
                  </span>
                </div>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">Tax Information</h4>
        <p className="text-blue-800 text-sm mb-4">
          All donations made through GiveHope are tax-deductible. Download your receipts and 
          keep them for your tax records. Consult with a tax professional for specific advice.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Download Annual Summary
        </button>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="City, Country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about yourself and what causes you're passionate about..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Profile
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your donations and profile</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('donations')}
                    className={`w-full flex items-center px-4 py-2 text-left rounded-md transition-colors ${
                      activeTab === 'donations'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className="h-5 w-5 mr-3" />
                    My Donations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('receipts')}
                    className={`w-full flex items-center px-4 py-2 text-left rounded-md transition-colors ${
                      activeTab === 'receipts'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Receipt className="h-5 w-5 mr-3" />
                    Tax Receipts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-2 text-left rounded-md transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'donations' && <DonationsTab />}
            {activeTab === 'receipts' && <ReceiptsTab />}
            {activeTab === 'profile' && <ProfileTab />}
          </div>
        </div>
      </div>
    </div>
  );
}