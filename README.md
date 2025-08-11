# Smart Farmer's Market Buffer Scheduler

A comprehensive platform that connects farmers and buyers, enabling advance produce bookings with real-time inventory management and seamless communication.

## 🌟 Features

### For Farmers
- **Produce Management**: Register daily available produce with quantity limits
- **Order Processing**: View, confirm, and manage received orders
- **Real-time Updates**: Get instant notifications for new orders
- **Dashboard**: Track sales statistics and performance metrics

### For Buyers
- **Browse Produce**: View fresh, available produce from local farmers
- **Advance Booking**: Place orders with specific pickup dates and quantities
- **Real-time Availability**: See live stock updates as orders are placed
- **Order Tracking**: Monitor order status from confirmation to pickup

### For Administrators
- **User Management**: Monitor and manage all platform users
- **Order Oversight**: View all transactions and handle disputes
- **System Analytics**: Access comprehensive platform statistics
- **Content Moderation**: Manage listings and user activities

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Socket.IO Client** for real-time updates
- **React Hook Form** for form management
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.IO** for real-time communication
- **NodeMailer** for email notifications
- **Bcrypt** for password hashing

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd smart-farmers-market-scheduler
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm run install:all

# Or install individually
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 3. Environment Configuration

#### Backend Environment (.env in backend/)
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your configurations:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/farmers-market

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-app-password

# Server settings
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Start the Development Servers
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually
npm run dev:frontend  # Starts React app on port 5173
npm run dev:backend   # Starts Express server on port 5000
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 📡 API Documentation

### Authentication Endpoints
```
POST /api/auth/signup     - Register new user
POST /api/auth/login      - User login
GET  /api/auth/me         - Get current user
PUT  /api/auth/profile    - Update user profile
```

### Produce Endpoints
```
POST   /api/produce             - Add new produce (farmers)
GET    /api/produce             - Get all active produce
GET    /api/produce/farmer      - Get farmer's produce
GET    /api/produce/:id         - Get single produce
PUT    /api/produce/:id         - Update produce (owner only)
DELETE /api/produce/:id         - Delete produce (owner only)
GET    /api/produce/search      - Search produce
```

### Order Endpoints
```
POST   /api/orders              - Place new order (buyers)
GET    /api/orders/buyer        - Get buyer's orders
GET    /api/orders/farmer       - Get farmer's orders
GET    /api/orders/admin        - Get all orders (admin)
GET    /api/orders/:id          - Get single order
PUT    /api/orders/:id/status   - Update order status
DELETE /api/orders/:id          - Cancel order (buyer)
```

### User Management (Admin)
```
GET    /api/users               - Get all users
GET    /api/users/:id           - Get single user
PUT    /api/users/:id           - Update user
DELETE /api/users/:id           - Delete user
GET    /api/users/stats/summary - Get user statistics
```

## 🏗 Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts (Auth, Socket)
│   │   ├── pages/           # Page components
│   │   │   ├── auth/        # Login/Signup pages
│   │   │   ├── farmer/      # Farmer dashboard pages
│   │   │   ├── buyer/       # Buyer dashboard pages
│   │   │   └── admin/       # Admin dashboard pages
│   │   ├── services/        # API service functions
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── backend/                 # Express.js API
│   ├── models/              # Mongoose models
│   ├── routes/              # API route handlers
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   └── server.js            # Server entry point
└── README.md                # This file
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Express-validator for data validation
- **CORS Protection**: Configured for specific origins
- **Helmet**: Security headers middleware

## 📧 Email Notifications

The system sends automated emails for:
- Welcome messages for new users
- Order confirmation for buyers and farmers
- Order status updates (confirmed, ready, completed, cancelled)
- System notifications

## 🌐 Real-time Features

Using Socket.IO for:
- Live inventory updates when orders are placed
- Real-time order notifications for farmers
- Status change notifications for buyers
- Live dashboard updates

## 👥 User Roles & Permissions

### Farmer
- Manage own produce listings
- View and process received orders
- Update order status (confirm, ready, complete)
- Access to farmer-specific statistics

### Buyer
- Browse and search all available produce
- Place orders and track status
- Cancel pending orders
- View purchase history and statistics

### Admin
- Full access to all platform data
- User management (activate/deactivate accounts)
- Order oversight and dispute handling
- System analytics and reporting

## 🧪 Testing

```bash
# Frontend testing
cd frontend
npm test

# Backend testing
cd backend
npm test
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
```

### Backend (Heroku/DigitalOcean)
```bash
cd backend
npm start
```

### Environment Variables for Production
Ensure all environment variables are properly configured for production:
- Use MongoDB Atlas for database
- Configure proper SMTP settings for emails
- Set secure JWT secrets
- Update CORS origins
- Enable HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues & Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running locally or check Atlas connection string
2. **Email Service**: Configure proper SMTP settings or use development mode
3. **Socket.IO**: Check CORS configuration if real-time features aren't working
4. **Port Conflicts**: Ensure ports 5000 and 5173 are available

### Development Tips
- Use MongoDB Compass for database visualization
- Install React Developer Tools for better debugging
- Use Postman or similar tools for API testing
- Check browser console for frontend errors
- Monitor backend logs for server issues

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check existing documentation
- Review API endpoints and examples

## 🎯 Future Enhancements

- **Payment Integration**: Stripe/PayPal integration
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: Detailed business intelligence
- **Multi-language Support**: Internationalization
- **Image Upload**: Product photo management
- **Rating System**: Farmer and product ratings
- **Delivery Options**: Coordination with delivery services

---

Built with ❤️ for connecting farmers and buyers in local communities.