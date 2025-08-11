import React, { useState, useEffect } from 'react';
import { Users, ShoppingBag, Package, DollarSign, TrendingUp, UserCheck } from 'lucide-react';

const AdminStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFarmers: 0,
    totalBuyers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProduce: 0,
    activeListings: 0,
    completedOrders: 0,
    pendingOrders: 0,
    monthlyGrowth: 0,
  });

  useEffect(() => {
    // This would typically fetch real data from the API
    // For now, we'll use mock data
    setStats({
      totalUsers: 1247,
      totalFarmers: 156,
      totalBuyers: 1091,
      totalOrders: 3842,
      totalRevenue: 89425.75,
      totalProduce: 542,
      activeListings: 387,
      completedOrders: 3654,
      pendingOrders: 188,
      monthlyGrowth: 12.5,
    });
  }, []);

  const mainStats = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
      change: '+15.3%',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      change: `+${stats.monthlyGrowth}%`,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      change: '+8.7%',
    },
    {
      title: 'Active Listings',
      value: stats.activeListings,
      icon: Package,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      change: '+5.2%',
    },
  ];

  const userStats = [
    { label: 'Farmers', value: stats.totalFarmers, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Buyers', value: stats.totalBuyers, icon: UserCheck, color: 'text-blue-600' },
  ];

  const orderStats = [
    { label: 'Completed', value: stats.completedOrders, percentage: 95 },
    { label: 'Pending', value: stats.pendingOrders, percentage: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Main Statistics */}
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
          <p className="mt-2 text-gray-600">
            Key metrics and performance indicators for the marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainStats.map((stat, index) => {
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
        {/* User Breakdown */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
          <div className="space-y-4">
            {userStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-medium text-gray-900">{stat.label}</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                </div>
              );
            })}
            <div className="pt-4 border-t border-gray-200">
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-900">{stats.totalUsers}</span>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="space-y-4">
            {orderStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        stat.label === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-16 text-right">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Platform Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New farmer registered: Green Valley Farm</span>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Large order completed: $250 transaction</span>
            <span className="text-xs text-gray-400">4 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New produce listing: Organic Strawberries</span>
            <span className="text-xs text-gray-400">6 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">50 new buyers joined this week</span>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;