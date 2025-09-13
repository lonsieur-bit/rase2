import express from 'express';
import { supabase } from '../index';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get dashboard stats
router.get('/stats', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    // Get total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    // Get total revenue
    const { data: revenueData } = await supabase
      .from('orders')
      .select('total')
      .eq('status', 'completed');

    const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total, 0) || 0;

    // Get total products
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    // Get total users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Get recent orders
    const { data: recentOrders } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (first_name, last_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get monthly sales data
    const { data: monthlySales } = await supabase
      .from('orders')
      .select('total, created_at')
      .eq('status', 'completed')
      .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString());

    res.json({
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      recentOrders,
      monthlySales
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all orders (Admin)
router.get('/orders', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (first_name, last_name, email),
        order_items (
          *,
          products (name, image)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users (Admin)
router.get('/users', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { data: users, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products (Admin)
router.get('/products', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;