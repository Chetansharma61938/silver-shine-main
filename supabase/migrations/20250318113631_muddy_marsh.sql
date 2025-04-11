/*
  # Add insert policy for customers table (if not exists)

  1. Security
    - Add policy to allow authenticated users to insert customers
    - Use DO block to check if policy exists before creating
*/

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'customers' 
        AND policyname = 'Allow authenticated users to insert customers'
    ) THEN
        CREATE POLICY "Allow authenticated users to insert customers" 
        ON customers 
        FOR INSERT 
        TO authenticated 
        WITH CHECK (true);
    END IF;
END $$;