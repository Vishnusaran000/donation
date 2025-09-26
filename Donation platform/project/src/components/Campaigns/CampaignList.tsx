import React, { useState } from 'react';
import { Search, Filter, Heart, Calendar, MapPin, Users } from 'lucide-react';
import { Campaign } from '../../types';

interface CampaignListProps {
  onNavigate: (page: string, campaignId?: string) => void;
}

export function CampaignList({ onNavigate }: CampaignListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock data - replace with actual API call
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Clean Water for Rural Communities',
      description: 'Providing access to clean, safe drinking water for remote villages in need. This project will build water wells and purification systems.',
      goal_amount: 50000,
      current_amount: 32500,
      image_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      organization_id: '1',
      organization_name: 'Water for Life Foundation',
      category: 'Water & Sanitation',
      status: 'active',
      end_date: '2025-03-15',
      created_at: '2024-12-01',
    },
    {
      id: '2',
      title: 'Education for Underprivileged Children',
      description: 'Supporting quality education and school supplies for children in need. Every child deserves access to learning opportunities.',
      goal_amount: 25000,
      current_amount: 18750,
      image_url: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800',
      organization_id: '2',
      organization_name: 'Future Leaders Initiative',
      category: 'Education',
      status: 'active',
      end_date: '2025-02-28',
      created_at: '2024-11-15',
    },
    {
      id: '3',
      title: 'Emergency Food Relief Program',
      description: 'Providing nutritious meals to families facing food insecurity. Together we can fight hunger in our communities.',
      goal_amount: 40000,
      current_amount: 28000,
      image_url: 'https://images.pexels.com/photos/6646955/pexels-photo-6646955.jpeg?auto=compress&cs=tinysrgb&w=800',
      organization_id: '3',
      organization_name: 'Community Food Network',
      category: 'Food & Nutrition',
      status: 'active',
      end_date: '2025-04-01',
      created_at: '2024-12-10',
    },
    {
      id: '4',
      title: 'Medical Equipment for Hospital',
      description: 'Helping purchase critical medical equipment for a local hospital to serve the community better.',
      goal_amount: 75000,
      current_amount: 45000,
      image_url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
      organization_id: '4',
      organization_name: 'Healthcare Heroes',
      category: 'Healthcare',
      status: 'active',
      end_date: '2025-05-20',
      created_at: '2024-11-30',
    },
  ];

  const categories = [
    'all',
    'Education',
    'Healthcare',
    'Food & Nutrition',
    'Water & Sanitation',
    'Environment',
    'Emergency Relief',
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const filteredCampaigns = campaigns
    .filter((campaign) => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'progress') {
        return calculateProgress(b.current_amount, b.goal_amount) - calculateProgress(a.current_amount, a.goal_amount);
      } else if (sortBy === 'amount') {
        return b.current_amount - a.current_amount;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            All Campaigns
          </h1>
          <p className="text-xl text-gray-600">
            Discover and support causes that matter to you
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="progress">Highest Progress</option>
              <option value="amount">Most Raised</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={campaign.image_url}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {campaign.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {campaign.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {campaign.organization_name}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(campaign.end_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>{formatCurrency(campaign.current_amount)} raised</span>
                    <span>{calculateProgress(campaign.current_amount, campaign.goal_amount).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(campaign.current_amount, campaign.goal_amount)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Goal: {formatCurrency(campaign.goal_amount)}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onNavigate('campaign-details', campaign.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Learn More
                  </button>
                  <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all campaigns.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Campaigns
            </button>
          </div>
        )}
      </div>
    </div>
  );
}