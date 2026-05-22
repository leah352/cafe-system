require('dotenv').config();
const supabase = require('../src/config/supabase');

async function runChecks() {
  console.log('Env: SUPABASE_URL set=', !!process.env.SUPABASE_URL);
  console.log('Env: SUPABASE_ANON_KEY set=', !!process.env.SUPABASE_ANON_KEY);
  console.log('Env: SUPABASE_SERVICE_ROLE_KEY set=', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

  try {
    const { data: prodData, error: prodError } = await supabase.from('products').select('id').limit(1);
    if (prodError) {
      console.error('Products query error:', prodError.message || prodError);
    } else {
      console.log('Products rows:', Array.isArray(prodData) ? prodData.length : prodData ? 1 : 0);
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, username, role')
      .eq('username', 'jireh')
      .maybeSingle();
    if (userError) {
      console.error('Users query error:', userError.message || userError);
    } else if (!userData) {
      console.log('Admin user `jireh` not found');
    } else {
      console.log('Admin user found:', userData);
    }
  } catch (err) {
    console.error('Unexpected error:', err && err.message ? err.message : err);
    process.exitCode = 2;
  }
}

runChecks();
