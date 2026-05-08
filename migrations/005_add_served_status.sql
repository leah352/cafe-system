-- Add Served status to orders for Dine-in orders
-- First, we need to drop and recreate the CHECK constraint

ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (
    status IN (
        'Pending',
        'Preparing',
        'Ready for Pickup',
        'Served',
        'Out for Delivery',
        'Delivered',
        'Completed',
        'Cancelled'
    )
);