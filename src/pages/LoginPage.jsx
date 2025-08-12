import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, Lock, Wheat, ShoppingCart, Shield } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState(searchParams.get('role') || 'farmer');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/signup
    switch (selectedRole) {
      case 'farmer':
        navigate('/farmer-dashboard');
        break;
      case 'buyer':
        navigate('/buyer-dashboard');
        break;
      case 'admin':
        navigate('/admin-panel');
        break;
      default:
        break;
    }
  };

  const roles = [
    { id: 'farmer', name: 'Farmer', icon: Wheat, description: 'Sell your fresh produce' },
    { id: 'buyer', name: 'Buyer', icon: ShoppingCart, description: 'Purchase quality produce' },
    { id: 'admin', name: 'Admin', icon: Shield, description: 'Manage the platform' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-green-600 p-2 rounded-xl">
              <Wheat className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Smart Farmer's Market</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Join Our Community'}
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">Select Your Role</h3>
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'border-green-600 bg-green-50 text-green-600'
                      : 'border-gray-200 hover:border-green-300 text-gray-600'
                  }`}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{role.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder-transparent"
                  placeholder="Full Name"
                />
                <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600">
                  Full Name
                </label>
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder-transparent"
                placeholder="Email Address"
              />
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600">
                Email Address
              </label>
              <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>

            {!isLogin && (
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder-transparent"
                  placeholder="Phone Number"
                />
                <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600">
                  Phone Number
                </label>
              </div>
            )}

            <div className="relative">
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder-transparent"
                placeholder="Password"
              />
              <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600">
                Password
              </label>
              <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 transform hover:scale-105"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
