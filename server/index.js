const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve admin dashboard
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Basic routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Placeholder API routes
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalOrders: 156,
    totalRevenue: 125000,
    totalProducts: 24,
    totalUsers: 89,
    recentOrders: [],
    monthlySales: []
  });
});

app.get('/api/dashboard/orders', (req, res) => {
  res.json([
    {
      id: 'ORD-001',
      status: 'delivered',
      total: 2499,
      created_at: new Date().toISOString(),
      profiles: { first_name: 'أحمد', last_name: 'محمد', email: 'ahmed@example.com' }
    }
  ]);
});

app.get('/api/dashboard/products', (req, res) => {
  res.json([
    {
      id: '1',
      name_ar: 'KO جيمنج إليت',
      description_ar: 'جهاز ألعاب عالي الأداء',
      price: 2499,
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'
    }
  ]);
});

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  // Mock registration
  res.json({ 
    user: { id: '1', email, first_name: firstName, last_name: lastName },
    message: 'Registration successful' 
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Mock login
  res.json({ 
    user: { id: '1', email },
    session: { access_token: 'mock-token' },
    message: 'Login successful' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin/index.html`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
});