/*
  # Fix customers table RLS policies - Final

  1. Security Changes
    - Drop all existing policies
    - Create new policies with proper user authentication checks
    - Add user_id column to track ownership
*/

-- Add user_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customers' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE customers ADD COLUMN user_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert customers" ON customers;
DROP POLICY IF EXISTS "Allow authenticated users to read customers" ON customers;

-- Create new insert policy that sets user_id
CREATE POLICY "Allow authenticated users to insert customers"
ON customers
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()
);

-- Create new select policy that checks user_id
CREATE POLICY "Allow authenticated users to read customers"
ON customers
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()
);