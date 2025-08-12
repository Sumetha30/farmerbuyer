import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Plus, Package, ShoppingBag, BarChart } from 'lucide-react';
import AddProduce from './AddProduce';
import ManageProduce from './ManageProduce';
import FarmerOrders from './FarmerOrders';
import FarmerStats from './FarmerStats';

const FarmerDashboard = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Add Produce', href: '/farmer', icon: Plus, current: location.pathname === '/farmer' },
    { name: 'Manage Produce', href: '/farmer/manage', icon: Package, current: location.pathname === '/farmer/manage' },
    { name: 'Orders', href: '/farmer/orders', icon: ShoppingBag, current: location.pathname === '/farmer/orders' },
    { name: 'Statistics', href: '/farmer/stats', icon: BarChart, current: location.pathname === '/farmer/stats' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your produce, track orders, and monitor your farm's performance.
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
              <Route path="/" element={<AddProduce />} />
              <Route path="/manage" element={<ManageProduce />} />
              <Route path="/orders" element={<FarmerOrders />} />
              <Route path="/stats" element={<FarmerStats />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
