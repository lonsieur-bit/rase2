import express from 'express';
import { supabase } from '../index';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const updateData = req.body;
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user addresses
router.get('/addresses', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { data: addresses, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', req.user.id)
      .order('is_default', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add user address
router.post('/addresses', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const addressData = { ...req.body, user_id: req.user.id };
    
    const { data: address, error } = await supabase
      .from('addresses')
      .insert([addressData])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user payment methods
router.get('/payment-methods', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { data: paymentMethods, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', req.user.id)
      .order('is_default', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add payment method
router.post('/payment-methods', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const paymentData = { ...req.body, user_id: req.user.id };
    
    const { data: paymentMethod, error } = await supabase
      .from('payment_methods')
      .insert([paymentData])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(paymentMethod);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;