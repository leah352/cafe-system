-- 002_add_order_logs_and_fields.sql

-- Add order_logs table to track status changes
CREATE TABLE IF NOT EXISTS order_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    old_status TEXT,
    new_status TEXT,
    changed_by UUID,
    notes TEXT,
    changed_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Optional: add delivery fields to orders to support delivery lifecycle
ALTER TABLE orders ADD COLUMN IF NOT EXISTS assigned_rider UUID;

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS delivery_started_at TIMESTAMP
WITH
    TIME ZONE;

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP
WITH
    TIME ZONE;