import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Users, ShoppingCart, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Sprout className="h-12 w-12 text-primary-600" />,
      title: 'For Farmers',
      description: 'Register your daily produce, manage inventory, and receive orders from local buyers.',
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-secondary-600" />,
      title: 'For Buyers',
      description: 'Browse fresh local produce, place advance bookings, and get real-time availability updates.',
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: 'For Admins',
      description: 'Monitor all transactions, manage users, and oversee the entire marketplace ecosystem.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Farmer's Market
              <span className="text-primary-600 block">Buffer Scheduler</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connecting farmers and buyers with real-time inventory management, 
              advance booking system, and seamless communication.
            </p>
            
            {user ? (
              <Link
                to={`/${user.role}`}
                className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-3 text-lg font-medium text-primary-700 bg-white hover:bg-gray-50 rounded-xl border-2 border-primary-600 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-gray-600">
              A comprehensive platform serving farmers, buyers, and administrators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">Real-time</div>
              <div className="text-gray-600">Inventory Updates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-600 mb-2">24/7</div>
              <div className="text-gray-600">Platform Availability</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">Instant</div>
              <div className="text-gray-600">Email Notifications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;