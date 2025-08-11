import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, ShoppingCart, Calendar, Bell, Truck, Users, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Connect Farmers and Buyers in Real Time
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-green-100 max-w-3xl mx-auto">
              Reduce waste, enable live booking, and get real-time alerts with our smart buffer scheduling system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login?role=farmer"
                className="bg-white text-green-600 font-semibold py-4 px-8 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Login as Farmer
              </Link>
              <Link
                to="/login?role=buyer"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
              >
                Login as Buyer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your agricultural supply chain with intelligent buffer management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-green-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reduce Waste</h3>
              <p className="text-gray-600">
                Smart buffer scheduling ensures optimal produce allocation, minimizing waste and maximizing profits
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-green-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Booking</h3>
              <p className="text-gray-600">
                Real-time availability updates allow buyers to book fresh produce instantly with guaranteed slots
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-green-50 hover:shadow-lg transition-all duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Alerts</h3>
              <p className="text-gray-600">
                Stay informed with instant notifications about booking confirmations, availability, and market updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Active Farmers</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <ShoppingCart className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Monthly Bookings</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">40%</h3>
              <p className="text-gray-600">Waste Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-green-600 p-2 rounded-xl mr-3">
              <Wheat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Smart Farmer's Market</h3>
              <p className="text-gray-400">Buffer Scheduler</p>
            </div>
          </div>
          <p className="text-center text-gray-400">
            © 2025 Smart Farmer's Market. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;