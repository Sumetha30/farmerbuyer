import React, { useState, useEffect } from 'react';
import { ShoppingBag, DollarSign, TrendingUp, Package } from 'lucide-react';

const BuyerStats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    activeOrders: 0,
    completedOrders: 0,
    favoriteFarmers: [],
    monthlySpending: [],
  });

  useEffect(() => {
    // This would typically fetch real data from the API
    // For now, we'll use mock data
    setStats({
      totalOrders: 42,
      totalSpent: 1250.75,
      activeOrders: 3,
      completedOrders: 39,
      favoriteFarmers: [
        'Green Valley Farm',
        'Sunshine Organics',
        'Fresh Harvest Co.'
      ],
      monthlySpending: [
        { month: 'Jan', amount: 180 },
        { month: 'Feb', amount: 220 },
        { month: 'Mar', amount: 195 },
        { month: 'Apr', amount: 240 },
        { month: 'May', amount: 280 },
        { month: 'Jun', amount: 135 },
      ],
    });
  }, []);

  const statCards = [
    {
      title: 'Total Spent',
      value: `$${stats.totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
      change: '+15.3%',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      change: '+12.5%',
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders,
      icon: Package,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      change: '-2.1%',
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      change: '+18.2%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Purchase Statistics</h2>
          <p className="mt-2 text-gray-600">
            Overview of your buying activity and preferences.
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
                    <p className={`text-sm font-medium mt-1 ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending</h3>
          <div className="space-y-3">
            {stats.monthlySpending.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{month.month}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(month.amount / 300) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">${month.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorite Farmers</h3>
          <div className="space-y-3">
            {stats.favoriteFarmers.map((farmer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{farmer}</span>
                <span className="text-xs text-gray-500">{Math.floor(Math.random() * 10) + 1} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Ordered Organic Tomatoes from Green Valley Farm</span>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Order completed: Fresh Spinach from Sunshine Organics</span>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Placed order for Bell Peppers from Fresh Harvest Co.</span>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerStats;
