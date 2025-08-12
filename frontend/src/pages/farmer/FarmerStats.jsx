import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingBag, DollarSign } from 'lucide-react';

const FarmerStats = () => {
  const [stats, setStats] = useState({
    totalProduce: 0,
    activeListings: 0,
    totalOrders: 0,
    totalRevenue: 0,
    completedOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    // This would typically fetch real data from the API
    // For now, we'll use mock data
    setStats({
      totalProduce: 24,
      activeListings: 18,
      totalOrders: 87,
      totalRevenue: 2450.75,
      completedOrders: 72,
      pendingOrders: 15,
    });
  }, []);

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
      change: '+12.5%',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      change: '+8.3%',
    },
    {
      title: 'Active Listings',
      value: stats.activeListings,
      icon: Package,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      change: '+5.2%',
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      change: '+15.1%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Farm Statistics</h2>
          <p className="mt-2 text-gray-600">
            Overview of your farm's performance and metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                </div>
                <span className="text-sm font-medium">{stats.pendingOrders}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
                <span className="text-sm font-medium">{stats.completedOrders}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New order for Organic Tomatoes</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Added Fresh Spinach to inventory</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Order completed for Bell Peppers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerStats;
