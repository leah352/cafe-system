const supabase = require('../config/supabase');

const getSalesReport = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('total_amount, created_at')
      .eq('status', 'Completed');
    
    if (error) throw error;

    const totalSales = data.reduce((sum, order) => sum + order.total_amount, 0);
    const orderCount = data.length;

    res.json({
      totalSales,
      orderCount,
      orders: data
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSalesReport };
