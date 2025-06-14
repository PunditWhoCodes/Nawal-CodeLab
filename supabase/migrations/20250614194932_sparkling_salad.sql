/*
  # Create enrollments table

  1. New Tables
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `course_id` (uuid, foreign key to courses)
      - `enrolled_at` (timestamp)
      - `progress` (decimal, 0-100)
      - `completed_at` (timestamp, optional)

  2. Security
    - Enable RLS on `enrollments` table
    - Add policies for users to read their own enrollments
    - Add policy for users to enroll in courses
*/

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  progress decimal(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own enrollments
CREATE POLICY "Users can read own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to enroll in courses
CREATE POLICY "Users can enroll in courses"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own enrollment progress
CREATE POLICY "Users can update own enrollment progress"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);