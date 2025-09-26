import React from 'react';
import { Heart, Calendar, MapPin, Users } from 'lucide-react';
import { Campaign } from '../../types';

interface FeaturedCampaignsProps {
  onNavigate: (page: string, campaignId?: string) => void;
}

export function FeaturedCampaigns({ onNavigate }: FeaturedCampaignsProps) {
  // Mock data - replace with actual API call
  const featuredCampaigns: Campaign[] = [
    {
      id: '1',
      title: 'Clean Water for Rural Communities',
      description: 'Providing access to clean, safe drinking water for remote villages in need.',
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
      description: 'Supporting quality education and school supplies for children in need.',
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
      description: 'Providing nutritious meals to families facing food insecurity.',
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Campaigns
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover impactful causes that need your support right now
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCampaigns.map((campaign) => (
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

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('campaigns')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Campaigns
          </button>
        </div>
      </div>
    </section>
  );
}