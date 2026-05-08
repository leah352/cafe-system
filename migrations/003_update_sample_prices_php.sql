-- 003_update_sample_prices_php.sql
-- Safe migration: backup existing product prices and update demo products to realistic PHP values

BEGIN;

-- Create a backup table for product prices if it doesn't exist
CREATE TABLE IF NOT EXISTS product_price_backups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    product_id UUID,
    name TEXT,
    old_price DECIMAL(10, 2),
    backed_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Back up current prices for the target demo products
INSERT INTO
    product_price_backups (product_id, name, old_price)
SELECT id, name, price
FROM products
WHERE
    name IN (
        'Espresso',
        'Cappuccino',
        'Green Tea',
        'Croissant',
        'Latte',
        'Burger',
        'Fries',
        'Milk Tea'
    );

-- Update demo product prices to realistic PHP cafe pricing where present
UPDATE products
SET
    price = CASE
        WHEN name = 'Espresso' THEN 120.00
        WHEN name = 'Cappuccino' THEN 150.00
        WHEN name = 'Green Tea' THEN 130.00
        WHEN name = 'Croissant' THEN 90.00
        WHEN name = 'Latte' THEN 180.00
        WHEN name = 'Burger' THEN 220.00
        WHEN name = 'Fries' THEN 90.00
        WHEN name = 'Milk Tea' THEN 130.00
        ELSE price
    END
WHERE
    name IN (
        'Espresso',
        'Cappuccino',
        'Green Tea',
        'Croissant',
        'Latte',
        'Burger',
        'Fries',
        'Milk Tea'
    );

COMMIT;

-- Notes:
-- This migration only updates product prices for the listed demo items if they exist.
-- It writes previous prices into `product_price_backups` so changes can be audited or reverted.
-- Do NOT run this on production databases without verifying the intended product name matches your catalog.