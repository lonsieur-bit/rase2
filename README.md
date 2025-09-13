# KO Gaming Store - E-commerce Platform

A complete e-commerce platform for gaming PCs and workstations with React frontend, Node.js backend, and Supabase database.

## 🚀 Features

### Frontend (React + TypeScript)
- Modern responsive design with Tailwind CSS
- Arabic RTL support with Almarai font
- Shopping cart and wishlist functionality
- User authentication and account management
- Product catalog with filtering and search
- Custom PC builder
- Order tracking and history
- Support system with FAQ

### Backend (Node.js + Express)
- RESTful API with TypeScript
- Supabase integration for database and auth
- JWT authentication with role-based access
- Order management system
- Product management
- User profile management
- Admin dashboard APIs

### Admin Dashboard
- Real-time analytics and statistics
- Order management with status updates
- Product catalog management
- User management
- Sales reporting
- Responsive design

### Database (Supabase/PostgreSQL)
- Complete e-commerce schema
- Row Level Security (RLS) policies
- User profiles and authentication
- Product catalog with categories
- Order management system
- Shopping cart persistence
- Wishlist functionality
- Reviews and ratings
- Address and payment method storage

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install
```

### 2. Database Setup (Supabase)
1. Create a new Supabase project
2. Run the migration file: `supabase/migrations/create_database_schema.sql`
3. Copy your Supabase credentials

### 3. Environment Configuration
1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Create Admin User
1. Register a user through the frontend
2. In Supabase, update the user's profile:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'your-user-id';
```

### 5. Run the Application
```bash
# Start frontend (port 5173)
npm run dev

# Start backend (port 3001)
npm run server

# Access admin dashboard
# http://localhost:3001/admin/index.html
```

## 📁 Project Structure

```
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── data/              # Static data
│   ├── types/             # TypeScript types
│   └── ...
├── server/                # Backend Node.js app
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── index.ts           # Server entry point
├── admin/                 # Admin dashboard
│   └── index.html         # Admin interface
├── supabase/             # Database migrations
│   └── migrations/        # SQL migration files
└── ...
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/addresses` - Get user addresses
- `POST /api/users/addresses` - Add user address
- `GET /api/users/payment-methods` - Get payment methods
- `POST /api/users/payment-methods` - Add payment method

### Dashboard (Admin)
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/orders` - Get all orders
- `GET /api/dashboard/users` - Get all users
- `GET /api/dashboard/products` - Get all products

## 🔐 Security Features

- Row Level Security (RLS) on all database tables
- JWT token authentication
- Role-based access control (Customer/Admin)
- Input validation and sanitization
- CORS protection
- Helmet.js security headers

## 🎨 Design Features

- Arabic RTL layout support
- Almarai font integration
- Dark theme with gaming aesthetics
- RGB animations for interactive elements
- Responsive design for all devices
- Consistent color palette (#fe01ff, #181918, white)

## 📱 Admin Dashboard Features

- Real-time sales analytics
- Order management with status updates
- Product catalog management
- User management
- Revenue tracking
- Monthly sales charts
- Recent orders overview

## 🚀 Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
cd server
npm run server:build
# Deploy to your Node.js hosting service
```

### Database
- Supabase handles hosting automatically
- Ensure RLS policies are properly configured
- Set up proper indexes for performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the FAQ in the support section
- Create an issue on GitHub
- Contact the development team

---

Built with ❤️ for the gaming community