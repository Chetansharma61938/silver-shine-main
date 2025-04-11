/*
  # Add detailed order fields

  1. Changes
    - Add new columns to orders table to store chassis details
    - Add columns for wheel and suspension types
    - Add columns for extras and specifications
    - Add columns for order dates and status tracking

  2. Security
    - Maintain existing RLS policies
*/

-- Create ENUMs first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'order_status_enum'
  ) THEN
    CREATE TYPE order_status_enum AS ENUM (
      'QUOTE_SENT', 'ORDER_RECEIVED', 'PAYMENT_PENDING',
      'PARTS_ORDERED', 'PRODUCTION', 'PAINTING',
      'QUALITY_CHECK', 'READY_FOR_DELIVERY', 'DELIVERED'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'wheel_type_enum'
  ) THEN
    CREATE TYPE wheel_type_enum AS ENUM (
      'ROMAN', 'VAULT', 'TROOPER', 'SHOW_STAR', 'GRID802', 'JACKYL',
      'DEVIL', 'MAINLINE', 'MAVERICK', 'TARGA', 'BULLET', 'THEORY'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'suspension_type_enum'
  ) THEN
    CREATE TYPE suspension_type_enum AS ENUM (
      'SHINE_XT', 'CRUISEMASTER_XT', 'AL_KO', 'TUFRIDE',
      'CROSS_COUNTRY', 'ENDURO_X', 'ENDURO2.7'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'chassis_type_enum'
  ) THEN
    CREATE TYPE chassis_type_enum AS ENUM (
      'SUPAGAL', 'GALVANIZED'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'frame_type_enum'
  ) THEN
    CREATE TYPE frame_type_enum AS ENUM (
      'HOLLOW_CHANNEL', 'KICK_UP', 'TRUSS_CHASSIS', 'FLAT_FLOOR'
    );
  END IF;
END$$;

-- Remove the default constraint from status column
ALTER TABLE orders ALTER COLUMN status DROP DEFAULT;

-- Convert status column to the new type
ALTER TABLE orders 
  ALTER COLUMN status TYPE order_status_enum 
  USING status::order_status_enum;

-- Set the new default value with the correct type
ALTER TABLE orders 
  ALTER COLUMN status SET DEFAULT 'QUOTE_SENT'::order_status_enum;

-- Add new columns to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_date date;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_date date;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_no text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS model_name text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_width numeric(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_length numeric(10,2);

-- Add typed columns
ALTER TABLE orders ADD COLUMN IF NOT EXISTS wheel_type wheel_type_enum;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS suspension_type suspension_type_enum;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chassis_type chassis_type_enum;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS frame_type frame_type_enum;

-- Add JSON column for extras and specifications
ALTER TABLE orders ADD COLUMN IF NOT EXISTS extras jsonb DEFAULT '{}'::jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS specifications jsonb DEFAULT '{}'::jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS comments text;

-- Add indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_orders_chassis_no ON orders(chassis_no);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_delivery_date ON orders(delivery_date);