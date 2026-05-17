-- Performance indexes for query optimization

-- Orders table indexes
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders (order_number);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders (payment_status);

-- Order items foreign key index
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);

CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items (product_id);

-- Products table indexes
CREATE INDEX IF NOT EXISTS idx_products_status ON products (status);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products (category_id);

-- Order logs index for faster history lookups
CREATE INDEX IF NOT EXISTS idx_order_logs_order_id ON order_logs (order_id);

CREATE INDEX IF NOT EXISTS idx_order_logs_changed_at ON order_logs (changed_at DESC);

-- Users table index for login lookups
-- index on username (login lookups)
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);