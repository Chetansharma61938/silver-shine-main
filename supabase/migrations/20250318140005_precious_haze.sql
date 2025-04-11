/*
  # Add missing columns to orders table

  1. Changes
    - Add missing columns to match form data structure:
      - aircon_frame (boolean)
      - mesh (boolean)
      - bumper_bars (jsonb)
      - jerry_can_holders (jsonb)
      - electric_jockey_wheel (jsonb)
      - extras (jsonb)
      - water_tanks (jsonb)
      - gas_holders (jsonb)

  2. Notes
    - All new columns are nullable to maintain compatibility with existing data
    - JSON columns use JSONB for better performance and indexing
*/

DO $$ 
BEGIN
  -- Add aircon_frame column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'aircon_frame'
  ) THEN
    ALTER TABLE orders ADD COLUMN aircon_frame boolean DEFAULT false;
  END IF;

  -- Add mesh column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'mesh'
  ) THEN
    ALTER TABLE orders ADD COLUMN mesh boolean DEFAULT false;
  END IF;

  -- Add bumper_bars column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'bumper_bars'
  ) THEN
    ALTER TABLE orders ADD COLUMN bumper_bars jsonb DEFAULT '{"type": "STD", "arms": 1}'::jsonb;
  END IF;

  -- Add jerry_can_holders column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'jerry_can_holders'
  ) THEN
    ALTER TABLE orders ADD COLUMN jerry_can_holders jsonb DEFAULT '{"quantity": 1}'::jsonb;
  END IF;

  -- Add electric_jockey_wheel column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'electric_jockey_wheel'
  ) THEN
    ALTER TABLE orders ADD COLUMN electric_jockey_wheel jsonb DEFAULT '{"enabled": false, "size": "6\"", "type": "STANDARD"}'::jsonb;
  END IF;

  -- Add extras column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'extras'
  ) THEN
    ALTER TABLE orders ADD COLUMN extras jsonb DEFAULT '{
      "nudgeBar": false,
      "recoveryPoints": false,
      "skidPlates": false,
      "bikePlate": false,
      "wheelBrace": false,
      "paintColor": "",
      "jack2000": false
    }'::jsonb;
  END IF;

  -- Add water_tanks column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'water_tanks'
  ) THEN
    ALTER TABLE orders ADD COLUMN water_tanks jsonb DEFAULT '{
      "front": {"qty": 2, "size": "95L"},
      "between": {"qty": 0, "size": "95L"},
      "rear": {"qty": 0, "size": "95L"},
      "covers": true,
      "grey_tank": false,
      "grey_tank_rear1": false
    }'::jsonb;
  END IF;

  -- Add gas_holders column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'gas_holders'
  ) THEN
    ALTER TABLE orders ADD COLUMN gas_holders jsonb DEFAULT '{
      "size4_5kg": true,
      "size9kg": false,
      "loose": false
    }'::jsonb;
  END IF;
END $$;