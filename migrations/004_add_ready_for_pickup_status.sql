-- Add Ready for Pickup status to orders
-- First, we need to drop and recreate the CHECK constraint

ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (
    status IN (
        'Pending',
        'Preparing',
        'Ready for Pickup',
        'Out for Delivery',
        'Delivered',
        'Completed',
        'Cancelled'
    )
);