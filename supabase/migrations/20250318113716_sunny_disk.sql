/*
  # Fix customers table RLS policies

  1. Security Changes
    - Drop existing policies to clean up
    - Create new insert policy with proper user check
    - Create new select policy with proper user check
    - Ensure RLS is enabled
*/

-- Enable RLS if not already enabled
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Allow authenticated users to insert customers" ON customers;
DROP POLICY IF EXISTS "Allow authenticated users to read customers" ON customers;

-- Create new insert policy
CREATE POLICY "Allow authenticated users to insert customers"
ON customers
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- Create new select policy
CREATE POLICY "Allow authenticated users to read customers"
ON customers
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);