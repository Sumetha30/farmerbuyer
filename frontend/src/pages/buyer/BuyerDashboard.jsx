import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, BarChart } from 'lucide-react';
import BrowseProduce from './BrowseProduce';
import MyOrders from './MyOrders';
import BuyerProfile from './BuyerProfile';
import BuyerStats from './BuyerStats';

const BuyerDashboard = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Browse Produce', href: '/buyer', icon: Search, current: location.pathname === '/buyer' },
    { name: 'My Orders', href: '/buyer/orders', icon: ShoppingBag, current: location.pathname === '/buyer/orders' },
    { name: 'Profile', href: '/buyer/profile', icon: User, current: location.pathname === '/buyer/profile' },
    { name: 'Statistics', href: '/buyer/stats', icon: BarChart, current: location.pathname === '/buyer/stats' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Browse fresh produce, place orders, and manage your purchases.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.current
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<BrowseProduce />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/profile" element={<BuyerProfile />} />
              <Route path="/stats" element={<BuyerStats />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
