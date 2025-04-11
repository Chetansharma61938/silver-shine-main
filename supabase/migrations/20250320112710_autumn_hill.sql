/*
  # Update Order Status Types and Add Status History

  1. Changes
    - Update order_status_enum to include all production stages
    - Add status_history column for tracking status changes
    - Add status_updated_at timestamp
    - Set appropriate default values

  2. Security
    - Maintain existing RLS policies
*/

-- Create new enum type with temporary name
CREATE TYPE order_status_enum_new AS ENUM (
  'QUOTE_SENT',
  'ORDER_RECEIVED',
  'PAYMENT_PENDING',
  'ORDER_PARTS',
  'ORDER_PARTS_DONE',
  'PRODUCTION_START',
  'CUTTER_START',
  'CUTTER_FINISH',
  'WELDING_START',
  'WELDING_FINISH',
  'PRODUCTION_QC',
  'PAINTING',
  'FITMENT',
  'FINAL_QC',
  'READY_FOR_DELIVERY',
  'DELIVERED',
  'MAINTENANCE'
);

-- Add new columns with temporary names
ALTER TABLE orders
  ADD COLUMN status_new order_status_enum_new,
  ADD COLUMN status_history jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN status_updated_at timestamptz DEFAULT now();

-- Update the new status column based on existing values
UPDATE orders
SET status_new = CASE status::text
  WHEN 'QUOTE_SENT' THEN 'QUOTE_SENT'::order_status_enum_new
  WHEN 'ORDER_RECEIVED' THEN 'ORDER_RECEIVED'::order_status_enum_new
  WHEN 'PAYMENT_PENDING' THEN 'PAYMENT_PENDING'::order_status_enum_new
  WHEN 'PARTS_ORDERED' THEN 'ORDER_PARTS'::order_status_enum_new
  WHEN 'PRODUCTION' THEN 'PRODUCTION_START'::order_status_enum_new
  WHEN 'PAINTING' THEN 'PAINTING'::order_status_enum_new
  WHEN 'QUALITY_CHECK' THEN 'FINAL_QC'::order_status_enum_new
  WHEN 'READY_FOR_DELIVERY' THEN 'READY_FOR_DELIVERY'::order_status_enum_new
  WHEN 'DELIVERED' THEN 'DELIVERED'::order_status_enum_new
  ELSE 'QUOTE_SENT'::order_status_enum_new
END;

-- Drop the old column and rename the new one
ALTER TABLE orders DROP COLUMN status;
ALTER TABLE orders ALTER COLUMN status_new SET NOT NULL;
ALTER TABLE orders ALTER COLUMN status_new SET DEFAULT 'QUOTE_SENT'::order_status_enum_new;
ALTER TABLE orders RENAME COLUMN status_new TO status;

-- Drop the old enum type
DROP TYPE order_status_enum;

-- Rename the new enum type to the original name
ALTER TYPE order_status_enum_new RENAME TO order_status_enum;

-- Create function to update status history
CREATE OR REPLACE FUNCTION update_order_status_history()
RETURNS TRIGGER AS $$
BEGIN
  IF (OLD.status IS NULL OR NEW.status != OLD.status) THEN
    NEW.status_history = NEW.status_history || jsonb_build_object(
      'status', NEW.status,
      'timestamp', CURRENT_TIMESTAMP,
      'user_id', auth.uid()
    );
    NEW.status_updated_at = CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for status history
DROP TRIGGER IF EXISTS order_status_history_trigger ON orders;
CREATE TRIGGER order_status_history_trigger
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_order_status_history();