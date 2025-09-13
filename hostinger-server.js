import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(cors({
  origin: ['https://www.k-o.site', 'https://k-o.site', 'http://www.k-o.site', 'http://k-o.site'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Serve static files - React app first
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'KO Gaming Store API is running on Hostinger VPS!',
    server: 'Hostinger VPS',
    port: PORT,
    domain: 'www.k-o.site'
  });
});

// Mock API endpoints for demo
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalOrders: 156,
    totalRevenue: 125000,
    totalProducts: 24,
    totalUsers: 89,
    recentOrders: [
      {
        id: 'ORD-001',
        status: 'delivered',
        total: 2499,
        created_at: new Date().toISOString(),
        profiles: { first_name: 'أحمد', last_name: 'محمد', email: 'ahmed@example.com' }
      }
    ],
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

// Auth routes (mock for demo)
app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  res.json({ 
    user: { id: '1', email, first_name: firstName, last_name: lastName },
    message: 'Registration successful (Demo Mode)' 
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({ 
    user: { id: '1', email, role: 'admin' },
    session: { access_token: 'demo-token-' + Date.now() },
    message: 'Login successful (Demo Mode)' 
  });
});

// Serve React app for all non-API routes (NO WILDCARD!)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/custom', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on Hostinger VPS!' });
});

// Start server on Hostinger VPS
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 KO Gaming Store running on Hostinger VPS`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`🌐 Domain: https://www.k-o.site`);
  console.log(`📊 Admin: https://www.k-o.site/admin/`);
  console.log(`🔗 API: https://www.k-o.site/api/health`);
  console.log(`📁 Serving from: ${__dirname}`);
});