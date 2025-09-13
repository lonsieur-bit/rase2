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
const PORT = process.env.PORT || 80; // Use port 80 for Hostinger

// Middleware
app.use(cors({
  origin: ['https://www.k-o.site', 'https://k-o.site', 'http://www.k-o.site', 'http://k-o.site'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Serve admin dashboard
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// API Routes for demo
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

// Serve main page
app.get('/', (req, res) => {
  // First try to serve the built React app
  const distIndexPath = path.join(__dirname, 'dist', 'index.html');
  const fallbackIndexPath = path.join(__dirname, 'index.html');
  
  res.sendFile(distIndexPath, (err) => {
    if (err) {
      console.log('dist/index.html not found, trying fallback...');
      res.sendFile(fallbackIndexPath, (fallbackErr) => {
        if (fallbackErr) {
          console.log('No index.html found, serving basic response');
          res.send(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
              <meta charset="UTF-8">
              <title>KO Gaming Store</title>
              <style>
                body { background: #181918; color: white; font-family: Arial; text-align: center; padding: 50px; }
                .logo { color: #fe01ff; font-size: 4em; margin-bottom: 20px; }
              </style>
            </head>
            <body>
              <div class="logo">KO</div>
              <h1>🚀 KO Gaming Store</h1>
              <p>Server is running on Hostinger VPS!</p>
              <a href="/api/health" style="color: #fe01ff;">Test API</a> | 
              <a href="/admin/" style="color: #fe01ff;">Admin Dashboard</a>
            </body>
            </html>
          `);
        }
      });
    }
  });
});

// Catch all handler for React routing
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/') || req.path.startsWith('/admin/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  // Serve React app for all other routes
  const distIndexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(distIndexPath, (err) => {
    if (err) {
      res.redirect('/');
    }
  });
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