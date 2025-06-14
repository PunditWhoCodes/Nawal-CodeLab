/*
  # Create courses and related tables

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `thumbnail_url` (text)
      - `instructor_name` (text)
      - `instructor_bio` (text)
      - `duration` (text)
      - `level` (text - Beginner, Intermediate, Advanced)
      - `price` (decimal)
      - `rating` (decimal)
      - `students_count` (integer)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `course_modules`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)

    - `course_lessons`
      - `id` (uuid, primary key)
      - `module_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `video_url` (text)
      - `duration` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to published courses
*/

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail_url text,
  instructor_name text NOT NULL,
  instructor_bio text,
  duration text,
  level text CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')) DEFAULT 'Beginner',
  price decimal(10,2) DEFAULT 0,
  rating decimal(3,2) DEFAULT 0,
  students_count integer DEFAULT 0,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Course modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Course lessons table
CREATE TABLE IF NOT EXISTS course_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES course_modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  video_url text,
  duration text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;

-- Policies for courses
CREATE POLICY "Anyone can read published courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Policies for course_modules
CREATE POLICY "Anyone can read modules of published courses"
  ON course_modules
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = course_modules.course_id 
      AND courses.published = true
    )
  );

-- Policies for course_lessons
CREATE POLICY "Anyone can read lessons of published courses"
  ON course_lessons
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM course_modules 
      JOIN courses ON courses.id = course_modules.course_id
      WHERE course_modules.id = course_lessons.module_id 
      AND courses.published = true
    )
  );

-- Updated at trigger for courses
CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();