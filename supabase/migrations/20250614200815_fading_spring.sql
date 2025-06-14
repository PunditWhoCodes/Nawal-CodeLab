/*
  # Insert Comprehensive Course Data

  1. Course Data
    - Complete courses with detailed information
    - YouTube video URLs for lessons
    - Proper course structure with modules and lessons
  
  2. Course Structure
    - Frontend Development courses
    - Backend Development courses  
    - Full Stack courses
    - Data Science courses
    - Mobile Development courses
*/

-- Insert comprehensive courses
INSERT INTO courses (
  title, 
  description, 
  thumbnail_url, 
  instructor_name, 
  instructor_bio,
  duration, 
  level, 
  price, 
  rating, 
  students_count, 
  published
) VALUES 
(
  'Complete React.js Masterclass 2024',
  'Master React.js from basics to advanced concepts. Build modern, responsive web applications with hooks, context, routing, and state management. Perfect for beginners and intermediate developers.',
  'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
  'Sarah Johnson',
  'Senior Frontend Developer at Google with 8+ years of experience in React development',
  '12 hours',
  'Beginner',
  89.99,
  4.8,
  15420,
  true
),
(
  'Node.js & Express Backend Development',
  'Build scalable backend applications with Node.js and Express. Learn REST APIs, authentication, database integration, and deployment strategies.',
  'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
  'Michael Chen',
  'Backend Engineer at Microsoft, specializing in Node.js and cloud architecture',
  '15 hours',
  'Intermediate',
  99.99,
  4.9,
  12350,
  true
),
(
  'Full Stack Web Development Bootcamp',
  'Complete full-stack development course covering HTML, CSS, JavaScript, React, Node.js, MongoDB, and deployment. Build 5 real-world projects.',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  'David Rodriguez',
  'Full Stack Developer and Tech Lead with 10+ years experience at startups and Fortune 500 companies',
  '40 hours',
  'Beginner',
  149.99,
  4.7,
  28750,
  true
),
(
  'Python for Data Science & Machine Learning',
  'Learn Python programming for data analysis, visualization, and machine learning. Includes pandas, numpy, matplotlib, scikit-learn, and real projects.',
  'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
  'Dr. Emily Watson',
  'Data Scientist at Netflix with PhD in Computer Science, published researcher in ML',
  '25 hours',
  'Intermediate',
  119.99,
  4.9,
  9840,
  true
),
(
  'React Native Mobile App Development',
  'Build cross-platform mobile apps with React Native. Learn navigation, state management, native modules, and publish to app stores.',
  'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
  'Alex Thompson',
  'Mobile App Developer with 50+ published apps, former iOS developer at Uber',
  '18 hours',
  'Intermediate',
  109.99,
  4.6,
  7230,
  true
),
(
  'Advanced JavaScript & ES6+',
  'Master modern JavaScript including ES6+, async programming, modules, testing, and advanced concepts. Perfect for intermediate developers.',
  'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg',
  'Jennifer Lee',
  'Senior JavaScript Developer at Airbnb, JavaScript community contributor and speaker',
  '14 hours',
  'Advanced',
  79.99,
  4.8,
  11560,
  true
),
(
  'AWS Cloud Computing Fundamentals',
  'Learn Amazon Web Services from scratch. Cover EC2, S3, RDS, Lambda, and deployment strategies. Get ready for AWS certification.',
  'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
  'Robert Kim',
  'AWS Solutions Architect with 12+ years cloud experience, certified AWS instructor',
  '20 hours',
  'Intermediate',
  129.99,
  4.7,
  6890,
  true
),
(
  'Vue.js Complete Guide',
  'Master Vue.js 3 with Composition API, Vuex, Vue Router, and build modern SPAs. Includes real-world projects and best practices.',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  'Maria Garcia',
  'Frontend Architect at Spotify, Vue.js core team contributor',
  '16 hours',
  'Beginner',
  94.99,
  4.8,
  8750,
  true
);

-- Insert course modules for React.js course
INSERT INTO course_modules (course_id, title, description, order_index) 
SELECT 
  c.id,
  module_title,
  module_description,
  module_order
FROM courses c,
(VALUES 
  ('React Fundamentals', 'Learn the basics of React including components, JSX, and props', 1),
  ('State Management & Hooks', 'Master React hooks and state management patterns', 2),
  ('Routing & Navigation', 'Implement client-side routing with React Router', 3),
  ('Advanced Patterns', 'Learn advanced React patterns and performance optimization', 4)
) AS modules(module_title, module_description, module_order)
WHERE c.title = 'Complete React.js Masterclass 2024';

-- Insert lessons for React Fundamentals module
INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  lesson_title,
  lesson_description,
  lesson_video_url,
  lesson_duration,
  lesson_order
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id,
(VALUES 
  ('Introduction to React', 'Overview of React and its ecosystem', 'https://www.youtube.com/watch?v=Tn6-PIqc4UM', '15 min', 1),
  ('Creating Your First Component', 'Build your first React component', 'https://www.youtube.com/watch?v=SqcY0GlETPk', '20 min', 2),
  ('Understanding JSX', 'Learn JSX syntax and best practices', 'https://www.youtube.com/watch?v=7fPXI_MnBOY', '18 min', 3),
  ('Props and Component Communication', 'Pass data between components', 'https://www.youtube.com/watch?v=PHaECbrKgs0', '25 min', 4)
) AS lessons(lesson_title, lesson_description, lesson_video_url, lesson_duration, lesson_order)
WHERE c.title = 'Complete React.js Masterclass 2024' AND cm.title = 'React Fundamentals';

-- Insert lessons for State Management & Hooks module
INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  lesson_title,
  lesson_description,
  lesson_video_url,
  lesson_duration,
  lesson_order
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id,
(VALUES 
  ('useState Hook', 'Manage component state with useState', 'https://www.youtube.com/watch?v=O6P86uwfdR0', '22 min', 1),
  ('useEffect Hook', 'Handle side effects with useEffect', 'https://www.youtube.com/watch?v=0ZJgIjIuY7U', '28 min', 2),
  ('Custom Hooks', 'Create reusable custom hooks', 'https://www.youtube.com/watch?v=6ThXsUwLWvc', '20 min', 3),
  ('Context API', 'Share state across components', 'https://www.youtube.com/watch?v=5LrDIWkK_Bc', '30 min', 4)
) AS lessons(lesson_title, lesson_description, lesson_video_url, lesson_duration, lesson_order)
WHERE c.title = 'Complete React.js Masterclass 2024' AND cm.title = 'State Management & Hooks';

-- Insert modules for Node.js course
INSERT INTO course_modules (course_id, title, description, order_index) 
SELECT 
  c.id,
  module_title,
  module_description,
  module_order
FROM courses c,
(VALUES 
  ('Node.js Fundamentals', 'Learn Node.js basics and core modules', 1),
  ('Express.js Framework', 'Build web applications with Express', 2),
  ('Database Integration', 'Connect to databases and handle data', 3),
  ('Authentication & Security', 'Implement secure authentication systems', 4),
  ('Deployment & Production', 'Deploy applications to production', 5)
) AS modules(module_title, module_description, module_order)
WHERE c.title = 'Node.js & Express Backend Development';

-- Insert lessons for Node.js Fundamentals
INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  lesson_title,
  lesson_description,
  lesson_video_url,
  lesson_duration,
  lesson_order
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id,
(VALUES 
  ('Introduction to Node.js', 'What is Node.js and why use it', 'https://www.youtube.com/watch?v=TlB_eWDSMt4', '18 min', 1),
  ('Node.js Core Modules', 'Explore built-in Node.js modules', 'https://www.youtube.com/watch?v=xHLd36QoS4k', '25 min', 2),
  ('File System Operations', 'Work with files and directories', 'https://www.youtube.com/watch?v=U57kU311-nE', '20 min', 3),
  ('HTTP Module', 'Create HTTP servers and clients', 'https://www.youtube.com/watch?v=VShtPwEkDD0', '22 min', 4)
) AS lessons(lesson_title, lesson_description, lesson_video_url, lesson_duration, lesson_order)
WHERE c.title = 'Node.js & Express Backend Development' AND cm.title = 'Node.js Fundamentals';

-- Insert modules for Full Stack course
INSERT INTO course_modules (course_id, title, description, order_index) 
SELECT 
  c.id,
  module_title,
  module_description,
  module_order
FROM courses c,
(VALUES 
  ('HTML & CSS Foundations', 'Master HTML5 and CSS3 fundamentals', 1),
  ('JavaScript Essentials', 'Learn modern JavaScript programming', 2),
  ('Frontend with React', 'Build interactive user interfaces', 3),
  ('Backend with Node.js', 'Create server-side applications', 4),
  ('Database Design', 'Design and implement databases', 5),
  ('Full Stack Projects', 'Build complete web applications', 6)
) AS modules(module_title, module_description, module_order)
WHERE c.title = 'Full Stack Web Development Bootcamp';

-- Insert lessons for HTML & CSS Foundations
INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  lesson_title,
  lesson_description,
  lesson_video_url,
  lesson_duration,
  lesson_order
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id,
(VALUES 
  ('HTML5 Fundamentals', 'Learn HTML5 structure and semantics', 'https://www.youtube.com/watch?v=pQN-pnXPaVg', '30 min', 1),
  ('CSS3 Styling', 'Style web pages with CSS3', 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', '35 min', 2),
  ('Responsive Design', 'Create mobile-friendly layouts', 'https://www.youtube.com/watch?v=srvUrASNdxk', '28 min', 3),
  ('CSS Grid & Flexbox', 'Master modern CSS layout techniques', 'https://www.youtube.com/watch?v=9zBsdzdE4sM', '32 min', 4)
) AS lessons(lesson_title, lesson_description, lesson_video_url, lesson_duration, lesson_order)
WHERE c.title = 'Full Stack Web Development Bootcamp' AND cm.title = 'HTML & CSS Foundations';

-- Insert modules for Python Data Science course
INSERT INTO course_modules (course_id, title, description, order_index) 
SELECT 
  c.id,
  module_title,
  module_description,
  module_order
FROM courses c,
(VALUES 
  ('Python Fundamentals', 'Learn Python programming basics', 1),
  ('Data Analysis with Pandas', 'Manipulate and analyze data', 2),
  ('Data Visualization', 'Create charts and graphs', 3),
  ('Machine Learning Basics', 'Introduction to ML algorithms', 4),
  ('Advanced ML Techniques', 'Deep dive into machine learning', 5)
) AS modules(module_title, module_description, module_order)
WHERE c.title = 'Python for Data Science & Machine Learning';

-- Insert lessons for Python Fundamentals
INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  lesson_title,
  lesson_description,
  lesson_video_url,
  lesson_duration,
  lesson_order
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id,
(VALUES 
  ('Python Basics', 'Variables, data types, and operators', 'https://www.youtube.com/watch?v=rfscVS0vtbw', '25 min', 1),
  ('Control Structures', 'Loops and conditional statements', 'https://www.youtube.com/watch?v=9Os0o3wzS_I', '22 min', 2),
  ('Functions and Modules', 'Create reusable code blocks', 'https://www.youtube.com/watch?v=9Os0o3wzS_I', '28 min', 3),
  ('Object-Oriented Programming', 'Classes and objects in Python', 'https://www.youtube.com/watch?v=Ej_02ICOIgs', '30 min', 4)
) AS lessons(lesson_title, lesson_description, lesson_video_url, lesson_duration, lesson_order)
WHERE c.title = 'Python for Data Science & Machine Learning' AND cm.title = 'Python Fundamentals';

-- Insert modules for React Native course
INSERT INTO course_modules (course_id, title, description, order_index) 
SELECT 
  c.id,
  module_title,
  module_description,
  module_order
FROM courses c,
(VALUES 
  ('React Native Setup', 'Environment setup and first app', 1),
  ('Core Components', 'Learn essential React Native components', 2),
  ('Navigation', 'Implement app navigation', 3),
  ('State Management', 'Handle app state effectively', 4),
  ('Native Features', 'Access device features', 5),
  ('App Store Deployment', 'Publish your app', 6)
) AS modules(module_title, module_description, module_order)
WHERE c.title = 'React Native Mobile App Development';

-- Insert lessons for React Native Setup
INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  lesson_title,
  lesson_description,
  lesson_video_url,
  lesson_duration,
  lesson_order
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id,
(VALUES 
  ('Development Environment', 'Set up React Native development', 'https://www.youtube.com/watch?v=0-S5a0eXPoc', '20 min', 1),
  ('Your First App', 'Create and run your first app', 'https://www.youtube.com/watch?v=ur6I5m2nTvk', '25 min', 2),
  ('Project Structure', 'Understand React Native project layout', 'https://www.youtube.com/watch?v=ANdSdIlgsEw', '18 min', 3),
  ('Debugging Tools', 'Learn debugging techniques', 'https://www.youtube.com/watch?v=kbHJ3Nn4Wbs', '22 min', 4)
) AS lessons(lesson_title, lesson_description, lesson_video_url, lesson_duration, lesson_order)
WHERE c.title = 'React Native Mobile App Development' AND cm.title = 'React Native Setup';