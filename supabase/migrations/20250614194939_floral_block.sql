/*
  # Insert sample courses data

  1. Sample Data
    - Insert sample courses with modules and lessons
    - Create a comprehensive course structure for demonstration
*/

-- Insert sample courses
INSERT INTO courses (title, description, thumbnail_url, instructor_name, instructor_bio, duration, level, price, rating, students_count, published) VALUES
(
  'Complete React Development Bootcamp',
  'Master React from basics to advanced concepts. Build real-world projects and learn modern React patterns, hooks, context, and state management.',
  'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
  'Sarah Johnson',
  'Senior Frontend Developer with 8+ years of experience at top tech companies.',
  '40 hours',
  'Intermediate',
  99.99,
  4.8,
  1250,
  true
),
(
  'Node.js & Express Backend Mastery',
  'Learn to build scalable backend applications with Node.js, Express, MongoDB, and modern authentication systems.',
  'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
  'Michael Chen',
  'Full-stack developer and tech lead with expertise in backend architecture.',
  '35 hours',
  'Intermediate',
  89.99,
  4.7,
  980,
  true
),
(
  'Python for Beginners',
  'Start your programming journey with Python. Learn fundamentals, data structures, and build your first applications.',
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
  'Dr. Emily Rodriguez',
  'Computer Science professor and Python expert with 10+ years of teaching experience.',
  '25 hours',
  'Beginner',
  49.99,
  4.9,
  2100,
  true
),
(
  'Advanced JavaScript & ES6+',
  'Deep dive into modern JavaScript features, async programming, modules, and advanced concepts for professional development.',
  'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
  'Alex Thompson',
  'JavaScript specialist and open-source contributor with extensive industry experience.',
  '30 hours',
  'Advanced',
  79.99,
  4.6,
  750,
  true
),
(
  'Database Design & SQL Mastery',
  'Learn database fundamentals, SQL queries, normalization, and design patterns for efficient data management.',
  'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg',
  'David Kumar',
  'Database architect with 12+ years of experience in enterprise database solutions.',
  '28 hours',
  'Intermediate',
  69.99,
  4.5,
  650,
  true
),
(
  'Cybersecurity Fundamentals',
  'Understand security principles, threat analysis, encryption, and best practices for protecting digital assets.',
  'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
  'Lisa Park',
  'Cybersecurity consultant and ethical hacker with certifications in CISSP and CEH.',
  '45 hours',
  'Beginner',
  129.99,
  4.7,
  890,
  true
);

-- Get course IDs for modules
DO $$
DECLARE
    react_course_id uuid;
    node_course_id uuid;
    python_course_id uuid;
BEGIN
    -- Get course IDs
    SELECT id INTO react_course_id FROM courses WHERE title = 'Complete React Development Bootcamp';
    SELECT id INTO node_course_id FROM courses WHERE title = 'Node.js & Express Backend Mastery';
    SELECT id INTO python_course_id FROM courses WHERE title = 'Python for Beginners';

    -- Insert modules for React course
    INSERT INTO course_modules (course_id, title, description, order_index) VALUES
    (react_course_id, 'React Fundamentals', 'Learn the basics of React components, JSX, and props', 1),
    (react_course_id, 'State Management', 'Master useState, useEffect, and component lifecycle', 2),
    (react_course_id, 'Advanced Patterns', 'Context API, custom hooks, and performance optimization', 3),
    (react_course_id, 'Project Development', 'Build a complete e-commerce application', 4);

    -- Insert modules for Node.js course
    INSERT INTO course_modules (course_id, title, description, order_index) VALUES
    (node_course_id, 'Node.js Basics', 'Understanding Node.js runtime and core modules', 1),
    (node_course_id, 'Express Framework', 'Building REST APIs with Express.js', 2),
    (node_course_id, 'Database Integration', 'Working with MongoDB and Mongoose', 3),
    (node_course_id, 'Authentication & Security', 'JWT, bcrypt, and security best practices', 4);

    -- Insert modules for Python course
    INSERT INTO course_modules (course_id, title, description, order_index) VALUES
    (python_course_id, 'Python Basics', 'Variables, data types, and basic syntax', 1),
    (python_course_id, 'Control Structures', 'Loops, conditionals, and functions', 2),
    (python_course_id, 'Data Structures', 'Lists, dictionaries, sets, and tuples', 3),
    (python_course_id, 'Object-Oriented Programming', 'Classes, objects, and inheritance', 4);
END $$;