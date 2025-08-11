import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, ShoppingBag, Package, BarChart } from 'lucide-react';
import ManageUsers from './ManageUsers';
import AdminOrders from './AdminOrders';
import AdminProduce from './AdminProduce';
import AdminStats from './AdminStats';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Statistics', href: '/admin', icon: BarChart, current: location.pathname === '/admin' },
    { name: 'Manage Users', href: '/admin/users', icon: Users, current: location.pathname === '/admin/users' },
    { name: 'All Orders', href: '/admin/orders', icon: ShoppingBag, current: location.pathname === '/admin/orders' },
    { name: 'All Produce', href: '/admin/produce', icon: Package, current: location.pathname === '/admin/produce' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage the entire marketplace ecosystem.
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
                        ? 'bg-red-100 text-red-700'
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
              <Route path="/" element={<AdminStats />} />
              <Route path="/users" element={<ManageUsers />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/produce" element={<AdminProduce />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;