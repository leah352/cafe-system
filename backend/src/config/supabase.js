const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
// Prefer service role key on the server if provided. DO NOT expose this to clients.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || (!supabaseServiceKey && !supabaseAnonKey)) {
  console.error('Supabase URL and Key are required in .env file');
}

const keyToUse = supabaseServiceKey || supabaseAnonKey;
if (!supabaseServiceKey) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY not found. Falling back to anon key. RLS may block some server operations.');
}

const supabase = createClient(supabaseUrl, keyToUse);

module.exports = supabase;
