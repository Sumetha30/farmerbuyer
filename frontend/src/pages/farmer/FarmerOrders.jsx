import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { orderService } from '../../services/orderService';
import { useSocket } from '../../contexts/SocketContext';

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newOrder', (newOrder) => {
        setOrders(prev => [newOrder, ...prev]);
        toast.success('New order received!');
      });

      socket.on('orderUpdated', (updatedOrder) => {
        setOrders(prev =>
          prev.map(o => o._id === updatedOrder._id ? updatedOrder : o)
        );
      });

      return () => {
        socket.off('newOrder');
        socket.off('orderUpdated');
      };
    }
  }, [socket]);

  const loadOrders = async () => {
    try {
      const data = await orderService.getFarmerOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'ready':
        return <Package className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
        <p className="mt-2 text-gray-600">
          View and manage orders from buyers.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getStatusIcon(order.status)}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {order.produce.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Buyer:</span>
                        <span className="ml-1 font-medium">{order.buyer.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Contact:</span>
                        <span className="ml-1">{order.buyer.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Quantity:</span>
                        <span className="ml-1">{order.quantity} {order.produce.unit}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <span className="ml-1 font-medium">${order.totalPrice.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Pickup Date:</span>
                        <span className="ml-1">{new Date(order.pickupDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Ordered:</span>
                        <span className="ml-1">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(order.status)}
                  {order.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateOrderStatus(order._id, 'confirmed')}
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id, 'cancelled')}
                        className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'ready')}
                      className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'completed')}
                      className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
