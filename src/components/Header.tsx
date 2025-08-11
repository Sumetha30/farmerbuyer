import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wheat, User, LogOut } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-xl">
              <Wheat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart Farmer's Market</h1>
              <p className="text-sm text-green-600">Buffer Scheduler</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-4">
            {!isLandingPage && (
              <>
                <Link
                  to="/farmer-dashboard"
                  className="text-gray-700 hover:text-green-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-green-50"
                >
                  Farmer
                </Link>
                <Link
                  to="/buyer-dashboard"
                  className="text-gray-700 hover:text-green-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-green-50"
                >
                  Buyer
                </Link>
                <Link
                  to="/admin-panel"
                  className="text-gray-700 hover:text-green-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-green-50"
                >
                  Admin
                </Link>
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">John Doe</span>
                  <button className="text-gray-500 hover:text-red-600 transition-colors duration-200">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;