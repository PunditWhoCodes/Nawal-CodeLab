/*
  # Fix RLS policies for profiles table

  1. Security Updates
    - Drop existing policies that use incorrect uid() function
    - Create new policies using correct auth.uid() function
    - Ensure all CRUD operations work properly for authenticated users

  The issue was that the existing policies were using uid() instead of auth.uid(),
  which caused RLS violations during profile creation and reading.
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create corrected policies using auth.uid()
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);