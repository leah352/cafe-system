-- Add cancellation_reason to orders
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- Optional: add cancellation_time
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS cancellation_time TIMESTAMP
WITH
    TIME ZONE;

-- Update trigger: when cancellation_reason set, set cancellation_time to now (simple update, not a real trigger)
-- You can run explicit update when cancelling from the backend, or create a trigger if preferred.