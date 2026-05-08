const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

const getStaff = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('role', 'staff');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createStaff = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, role: 'staff' }])
      .select('id, name, email, role, created_at');
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    next(err);
  }
};

const deleteStaff = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Staff deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStaff, createStaff, deleteStaff };
