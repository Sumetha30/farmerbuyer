import React, { useState, useEffect } from 'react';
import { Search, Eye } from 'lucide-react';

const AdminProduce = () => {
  const [produces, setProduces] = useState([]);
  const [filteredProduces, setFilteredProduces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Meat', 'Other'];

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProduces = [
      {
        _id: '1',
        name: 'Organic Tomatoes',
        category: 'Vegetables',
        quantity: 50,
        unit: 'kg',
        pricePerUnit: 2.5,
        description: 'Fresh organic tomatoes grown without pesticides',
        availableDate: '2024-01-25T00:00:00.000Z',
        farmer: { name: 'John Smith', email: 'john@farm.com' },
        status: 'active',
        createdAt: '2024-01-20T00:00:00.000Z',
      },
      {
        _id: '2',
        name: 'Fresh Spinach',
        category: 'Vegetables',
        quantity: 0,
        unit: 'bunches',
        pricePerUnit: 3.0,
        description: 'Fresh spinach leaves, perfect for salads',
        availableDate: '2024-01-26T00:00:00.000Z',
        farmer: { name: 'Mike Wilson', email: 'mike@organics.com' },
        status: 'sold_out',
        createdAt: '2024-01-21T00:00:00.000Z',
      },
    ];

    setTimeout(() => {
      setProduces(mockProduces);
      setFilteredProduces(mockProduces);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterProduces();
  }, [produces, searchTerm, categoryFilter, statusFilter]);

  const filterProduces = () => {
    let filtered = produces;

    if (searchTerm) {
      filtered = filtered.filter(
        (produce) =>
          produce.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          produce.farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((produce) => produce.category === categoryFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((produce) => produce.status === statusFilter);
    }

    setFilteredProduces(filtered);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      sold_out: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Produce</h2>
        <p className="mt-2 text-gray-600">Monitor all produce listings in the marketplace.</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search produce..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-field"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="sold_out">Sold Out</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {filteredProduces.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No produce found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produce
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farmer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProduces.map((produce) => (
                <tr key={produce._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{produce.name}</div>
                      <div className="text-sm text-gray-500">{produce.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{produce.farmer.name}</div>
                      <div className="text-sm text-gray-500">{produce.farmer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {produce.quantity} {produce.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${produce.pricePerUnit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(produce.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(produce.availableDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900" title="View Details">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProduce;
