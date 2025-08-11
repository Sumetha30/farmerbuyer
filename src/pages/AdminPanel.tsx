import React, { useState } from 'react';
import { BarChart3, Users, Package, AlertTriangle, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [stats] = useState({
    totalFarmers: 145,
    totalBuyers: 892,
    activeOrders: 67,
    totalRevenue: 45600,
    wasteReduction: 32,
    monthlyGrowth: 18
  });

  const [recentOrders] = useState([
    {
      id: 'ORD-001',
      buyer: 'Alice Johnson',
      farmer: 'Green Valley Farm',
      items: 'Tomatoes - 15kg',
      amount: 89.85,
      status: 'completed',
      date: '2025-01-14'
    },
    {
      id: 'ORD-002',
      buyer: 'Bob Smith',
      farmer: 'Sunshine Organic',
      items: 'Carrots - 10kg, Lettuce - 5kg',
      amount: 49.90,
      status: 'pending',
      date: '2025-01-14'
    },
    {
      id: 'ORD-003',
      buyer: 'Carol Davis',
      farmer: 'Mountain Orchard',
      items: 'Apples - 20kg',
      amount: 159.80,
      status: 'missed',
      date: '2025-01-13'
    }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Buffer capacity low for Tomatoes at Green Valley Farm',
      time: '30 minutes ago'
    },
    {
      id: 2,
      type: 'error',
      message: '3 missed pickups reported today',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'info',
      message: 'New farmer registration: Organic Dreams Farm',
      time: '2 hours ago'
    }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Monitor platform activity and manage operations</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Farmers</p>
                      <p className="text-3xl font-bold">{stats.totalFarmers}</p>
                    </div>
                    <Users className="h-12 w-12 text-green-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Buyers</p>
                      <p className="text-3xl font-bold">{stats.totalBuyers}</p>
                    </div>
                    <Package className="h-12 w-12 text-blue-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Active Orders</p>
                      <p className="text-3xl font-bold">{stats.activeOrders}</p>
                    </div>
                    <Calendar className="h-12 w-12 text-purple-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">Monthly Revenue</p>
                      <p className="text-3xl font-bold">${(stats.totalRevenue / 1000).toFixed(1)}k</p>
                    </div>
                    <DollarSign className="h-12 w-12 text-yellow-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100">Waste Reduction</p>
                      <p className="text-3xl font-bold">{stats.wasteReduction}%</p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-red-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100">Monthly Growth</p>
                      <p className="text-3xl font-bold">+{stats.monthlyGrowth}%</p>
                    </div>
                    <BarChart3 className="h-12 w-12 text-indigo-200" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
                  <div className="space-y-4">
                    {recentOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed' ? 'bg-green-100 text-green-600' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{order.buyer} • {order.items}</p>
                        <p className="text-green-600 font-semibold">${order.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">System Alerts</h3>
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                        alert.type === 'error' ? 'bg-red-50 border-red-400' :
                        'bg-blue-50 border-blue-400'
                      }`}>
                        <p className="text-gray-900 text-sm">{alert.message}</p>
                        <p className="text-gray-600 text-xs mt-1">{alert.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Order Management</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200">
                    Export Data
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl shadow-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Order ID</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Buyer</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Farmer</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Items</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 font-semibold text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 text-gray-600">{order.buyer}</td>
                        <td className="px-6 py-4 text-gray-600">{order.farmer}</td>
                        <td className="px-6 py-4 text-gray-600">{order.items}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">${order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed' ? 'bg-green-100 text-green-600' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600">Detailed user management interface coming soon...</p>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">System Alerts</h3>
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-6 rounded-xl border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'error' ? 'bg-red-50 border-red-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 font-semibold">{alert.message}</p>
                      <p className="text-gray-600 text-sm mt-1">{alert.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                        Resolve
                      </button>
                      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;