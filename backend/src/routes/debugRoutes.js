const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// Simple endpoint to verify Supabase connectivity and basic read access
router.get('/supabase', async (req, res, next) => {
  try {
    // attempt to read one product (adjust table if your schema differs)
    const { data, error } = await supabase.from('products').select('id').limit(1);
    if (error) return res.status(500).json({ ok: false, error: error.message });
    res.json({ ok: true, rows: Array.isArray(data) ? data.length : 0 });
  } catch (err) {
    next(err);
  }
});

// Test reading the admin user row (will surface RLS/permission errors)
router.get('/users', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, role')
      .eq('username', 'jireh')
      .maybeSingle();
    if (error) return res.status(500).json({ ok: false, error: error.message, hint: error });
    if (!data) return res.json({ ok: true, found: false });
    res.json({ ok: true, found: true, user: data });
  } catch (err) {
    // Return stack for local debugging. Do not expose this in production.
    return res.status(500).json({ ok: false, error: err.message, stack: err.stack });
  }
});

// Report which Supabase env vars are present (do NOT return keys)
router.get('/config', (req, res) => {
  const url = process.env.SUPABASE_URL ? true : false;
  const anon = process.env.SUPABASE_ANON_KEY ? true : false;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY ? true : false;
  res.json({ ok: true, supabaseUrlSet: url, anonKeySet: anon, serviceKeySet: service });
});

// VERY TEMPORARY: expose stored password hash for admin user for local debugging only
router.get('/users/password', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username, password')
      .eq('username', 'jireh')
      .maybeSingle();

    if (error) return res.status(500).json({ ok: false, error: error.message, hint: error });
    if (!data) return res.json({ ok: true, found: false });
    return res.json({ ok: true, found: true, username: data.username, password_hash: data.password });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message, stack: err.stack });
  }
});

module.exports = router;
