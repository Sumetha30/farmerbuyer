import React, { useState } from 'react';
import { Plus, Calendar, Package, Bell, Eye, Edit, Trash2 } from 'lucide-react';

const FarmerDashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduce, setNewProduce] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    schedule: 'daily',
    price: '',
    category: 'vegetables'
  });

  const [produces] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      totalQuantity: 100,
      bookedQuantity: 75,
      bufferLeft: 25,
      unit: 'kg',
      schedule: 'Mon/Wed/Fri',
      price: 5.99,
      category: 'Vegetables',
      status: 'active'
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      totalQuantity: 50,
      bookedQuantity: 30,
      bufferLeft: 20,
      unit: 'kg',
      schedule: 'Daily',
      price: 3.49,
      category: 'Vegetables',
      status: 'active'
    },
    {
      id: 3,
      name: 'Organic Apples',
      totalQuantity: 80,
      bookedQuantity: 80,
      bufferLeft: 0,
      unit: 'kg',
      schedule: 'Tue/Thu/Sat',
      price: 7.99,
      category: 'Fruits',
      status: 'full'
    }
  ]);

  const [notifications] = useState([
    { id: 1, message: 'New booking request for 15kg Tomatoes', time: '2 minutes ago', type: 'booking' },
    { id: 2, message: 'Organic Apples fully booked for today', time: '1 hour ago', type: 'alert' },
    { id: 3, message: 'Payment received for Carrots order', time: '3 hours ago', type: 'payment' }
  ]);

  const handleAddProduce = (e) => {
    e.preventDefault();
    // Handle form submission
    setShowAddForm(false);
    setNewProduce({
      name: '',
      quantity: '',
      unit: 'kg',
      schedule: 'daily',
      price: '',
      category: 'vegetables'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
        <p className="text-gray-600">Manage your produce listings and track bookings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Add New Produce Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Produce Management</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Produce</span>
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddProduce} className="bg-green-50 p-6 rounded-xl mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={newProduce.name}
                      onChange={(e) => setNewProduce({ ...newProduce, name: e.target.value })}
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder-transparent"
                      placeholder="Produce Name"
                    />
                    <label className="absolute left-4 -top-2.5 bg-green-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600">
                      Produce Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={newProduce.quantity}
                      onChange={(e) => setNewProduce({ ...newProduce, quantity: e.target.value })}
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder-transparent"
                      placeholder="Buffer Quantity"
                    />
                    <label className="absolute left-4 -top-2.5 bg-green-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600">
                      Buffer Quantity
                    </label>
                  </div>

                  <select
                    value={newProduce.category}
                    onChange={(e) => setNewProduce({ ...newProduce, category: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                    <option value="herbs">Herbs</option>
                  </select>

                  <select
                    value={newProduce.schedule}
                    onChange={(e) => setNewProduce({ ...newProduce, schedule: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="mwf">Mon/Wed/Fri</option>
                    <option value="tts">Tue/Thu/Sat</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
                  >
                    Add Produce
                  </button>
                </div>
              </form>
            )}

            {/* Produce Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Product</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Buffer Status</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Schedule</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Price</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {produces.map((produce) => (
                    <tr key={produce.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <Package className="h-10 w-10 text-green-600 bg-green-100 rounded-lg p-2 mr-3" />
                          <div>
                            <div className="font-semibold text-gray-900">{produce.name}</div>
                            <div className="text-sm text-gray-600">{produce.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Booked: {produce.bookedQuantity}{produce.unit}</span>
                            <span>Left: {produce.bufferLeft}{produce.unit}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                produce.bufferLeft === 0 ? 'bg-red-600' : 'bg-green-600'
                              }`}
                              style={{ width: `${(produce.bookedQuantity / produce.totalQuantity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {produce.schedule}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-gray-900">${produce.price}/{produce.unit}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800 transition-colors duration-200">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Bell className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Recent Notifications</h3>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 bg-green-50 rounded-xl border-l-4 border-green-600">
                  <p className="text-gray-900 mb-1">{notification.message}</p>
                  <p className="text-sm text-gray-600">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Listings</span>
                <span className="font-bold text-2xl text-green-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-bold text-2xl text-blue-600">185</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue This Month</span>
                <span className="font-bold text-2xl text-green-600">$2,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
