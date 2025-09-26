import React from 'react';
import { Shield, Heart, Users, Globe, Award, Target } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'All donations are processed securely with full transparency on fund usage.',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Supporting causes worldwide, from local communities to international relief efforts.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by the community, for the community. Every voice matters in creating change.',
    },
    {
      icon: Target,
      title: 'Proven Results',
      description: 'Track the real impact of your donations with detailed progress reports and updates.',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness to create lasting change.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Transparency and honesty in every aspect of our platform and operations.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing the best platform for donors and organizations.',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About GiveHope
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize charitable giving and make it easier than ever 
            for people to support causes they care about. Our platform connects generous hearts 
            with organizations making real impact in the world.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 md:p-12 mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Our Mission
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            To bridge the gap between those who want to help and those who need help by creating 
            a transparent, secure, and user-friendly platform that maximizes the impact of every 
            donation and builds stronger, more connected communities worldwide.
          </p>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose GiveHope?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Our Impact So Far
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">$2M+</div>
              <div className="text-blue-100">Total Donations</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Lives Impacted</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Active Campaigns</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Donors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}