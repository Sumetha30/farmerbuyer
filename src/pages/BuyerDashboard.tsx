import React, { useState } from 'react';
import { Filter, ShoppingCart, Calendar, Package, Clock, Star } from 'lucide-react';

const BuyerDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  const [availableProduce] = useState([
    {
      id: 1,
      name: 'Fresh Tomatoes',
      farmer: 'Green Valley Farm',
      available: 25,
      total: 100,
      unit: 'kg',
      price: 5.99,
      category: 'vegetables',
      rating: 4.8,
      nextAvailable: '2025-01-15',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Organic Carrots',
      farmer: 'Sunshine Organic',
      available: 20,
      total: 50,
      unit: 'kg',
      price: 3.49,
      category: 'vegetables',
      rating: 4.9,
      nextAvailable: '2025-01-15',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'Red Apples',
      farmer: 'Mountain Orchard',
      available: 0,
      total: 80,
      unit: 'kg',
      price: 7.99,
      category: 'fruits',
      rating: 4.7,
      nextAvailable: '2025-01-16',
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      name: 'Fresh Lettuce',
      farmer: 'Green Valley Farm',
      available: 15,
      total: 30,
      unit: 'kg',
      price: 2.99,
      category: 'vegetables',
      rating: 4.6,
      nextAvailable: '2025-01-15',
      image: 'https://images.pexels.com/photos/1328887/pexels-photo-1328887.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]);

  const [orderHistory] = useState([
    {
      id: 1,
      items: ['Tomatoes - 10kg', 'Carrots - 5kg'],
      total: 77.35,
      status: 'delivered',
      date: '2025-01-12',
      farmer: 'Green Valley Farm'
    },
    {
      id: 2,
      items: ['Apples - 8kg'],
      total: 63.92,
      status: 'pending',
      date: '2025-01-14',
      farmer: 'Mountain Orchard'
    }
  ]);

  const filteredProduce = availableProduce.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleBooking = (produceId: number) => {
    // Handle booking logic
    console.log('Booking produce:', produceId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
        <p className="text-gray-600">Browse and book fresh produce from local farmers</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <div className="flex items-center mb-6">
              <Filter className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <div className="space-y-2">
                  {['all', 'vegetables', 'fruits', 'grains', 'herbs'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-green-100 text-green-600 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Availability</label>
                <div className="space-y-2">
                  {['today', 'tomorrow', 'this-week'].map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedDate === date
                          ? 'bg-green-100 text-green-600 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {date.replace('-', ' ').charAt(0).toUpperCase() + date.replace('-', ' ').slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Available Produce */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Produce</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProduce.map((produce) => (
                <div key={produce.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img
                      src={produce.image}
                      alt={produce.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      produce.available > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {produce.available > 0 ? 'Available' : 'Sold Out'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{produce.name}</h3>
                        <p className="text-gray-600">{produce.farmer}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{produce.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Available: {produce.available}{produce.unit}</span>
                        <span>Total: {produce.total}{produce.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            produce.available === 0 ? 'bg-red-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${((produce.total - produce.available) / produce.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${produce.price}</span>
                        <span className="text-gray-600">/{produce.unit}</span>
                      </div>
                      <button
                        onClick={() => handleBooking(produce.id)}
                        disabled={produce.available === 0}
                        className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                          produce.available > 0
                            ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>{produce.available > 0 ? 'Book Now' : 'Sold Out'}</span>
                      </button>
                    </div>

                    {produce.available === 0 && (
                      <div className="mt-3 flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Next available: {produce.nextAvailable}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-green-600 bg-green-100 rounded-lg p-2 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-gray-600">{order.farmer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">${order.total}</div>
                      <div className={`text-sm px-3 py-1 rounded-full ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-gray-600">• {item}</div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {order.date}
                    </div>
                    <button className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;