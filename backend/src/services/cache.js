const NodeCache = require('node-cache');

// Cache configuration
const CACHE_TTL = {
  PRODUCTS: 300, // 5 minutes
  SALES_REPORT: 900, // 15 minutes
  USER_SESSION: 1800 // 30 minutes
};

const cache = new NodeCache({
  stdTTL: CACHE_TTL.PRODUCTS,
  checkperiod: 60,
  useClones: false
});

// Cache keys
const CACHE_KEYS = {
  PRODUCTS: 'products:list',
  PRODUCTS_FILTERED: (status, categoryId, search) => `products:filtered:${status || 'all'}:${categoryId || 'all'}:${search || 'all'}`,
  SALES_REPORT: 'sales:report',
  SALES_REPORT_RANGE: (startDate, endDate) => `sales:report:${startDate}:${endDate}`
};

// Helper to generate filtered product key
const getProductCacheKey = (query) => {
  return CACHE_KEYS.PRODUCTS_FILTERED(query.status, query.category_id, query.search);
};

module.exports = {
  cache,
  CACHE_TTL,
  CACHE_KEYS,
  getProductCacheKey
};