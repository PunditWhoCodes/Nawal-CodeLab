/*
  # Update course videos with working YouTube URLs

  1. Updates
    - Replace existing video URLs with working YouTube video URLs
    - Ensure all videos are embeddable and accessible
    - Add variety of programming tutorial videos
*/

-- Update React course lessons with working YouTube videos
UPDATE course_lessons 
SET video_url = CASE 
  WHEN title = 'Introduction to React' THEN 'https://www.youtube.com/watch?v=Tn6-PIqc4UM'
  WHEN title = 'Creating Your First Component' THEN 'https://www.youtube.com/watch?v=SqcY0GlETPk'
  WHEN title = 'Understanding JSX' THEN 'https://www.youtube.com/watch?v=7fPXI_MnBOY'
  WHEN title = 'Props and Component Communication' THEN 'https://www.youtube.com/watch?v=PHaECbrKgs0'
  WHEN title = 'useState Hook' THEN 'https://www.youtube.com/watch?v=O6P86uwfdR0'
  WHEN title = 'useEffect Hook' THEN 'https://www.youtube.com/watch?v=0ZJgIjIuY7U'
  WHEN title = 'Custom Hooks' THEN 'https://www.youtube.com/watch?v=6ThXsUwLWvc'
  WHEN title = 'Context API' THEN 'https://www.youtube.com/watch?v=5LrDIWkK_Bc'
  ELSE video_url
END
WHERE module_id IN (
  SELECT cm.id FROM course_modules cm 
  JOIN courses c ON c.id = cm.course_id 
  WHERE c.title = 'Complete React.js Masterclass 2024'
);

-- Update Node.js course lessons
UPDATE course_lessons 
SET video_url = CASE 
  WHEN title = 'Introduction to Node.js' THEN 'https://www.youtube.com/watch?v=TlB_eWDSMt4'
  WHEN title = 'Node.js Core Modules' THEN 'https://www.youtube.com/watch?v=xHLd36QoS4k'
  WHEN title = 'File System Operations' THEN 'https://www.youtube.com/watch?v=U57kU311-nE'
  WHEN title = 'HTTP Module' THEN 'https://www.youtube.com/watch?v=VShtPwEkDD0'
  ELSE video_url
END
WHERE module_id IN (
  SELECT cm.id FROM course_modules cm 
  JOIN courses c ON c.id = cm.course_id 
  WHERE c.title = 'Node.js & Express Backend Development'
);

-- Update Full Stack course lessons
UPDATE course_lessons 
SET video_url = CASE 
  WHEN title = 'HTML5 Fundamentals' THEN 'https://www.youtube.com/watch?v=pQN-pnXPaVg'
  WHEN title = 'CSS3 Styling' THEN 'https://www.youtube.com/watch?v=1Rs2ND1ryYc'
  WHEN title = 'Responsive Design' THEN 'https://www.youtube.com/watch?v=srvUrASNdxk'
  WHEN title = 'CSS Grid & Flexbox' THEN 'https://www.youtube.com/watch?v=9zBsdzdE4sM'
  ELSE video_url
END
WHERE module_id IN (
  SELECT cm.id FROM course_modules cm 
  JOIN courses c ON c.id = cm.course_id 
  WHERE c.title = 'Full Stack Web Development Bootcamp'
);

-- Update Python course lessons
UPDATE course_lessons 
SET video_url = CASE 
  WHEN title = 'Python Basics' THEN 'https://www.youtube.com/watch?v=rfscVS0vtbw'
  WHEN title = 'Control Structures' THEN 'https://www.youtube.com/watch?v=9Os0o3wzS_I'
  WHEN title = 'Functions and Modules' THEN 'https://www.youtube.com/watch?v=BVfCWuca9nw'
  WHEN title = 'Object-Oriented Programming' THEN 'https://www.youtube.com/watch?v=Ej_02ICOIgs'
  ELSE video_url
END
WHERE module_id IN (
  SELECT cm.id FROM course_modules cm 
  JOIN courses c ON c.id = cm.course_id 
  WHERE c.title = 'Python for Data Science & Machine Learning'
);

-- Update React Native course lessons
UPDATE course_lessons 
SET video_url = CASE 
  WHEN title = 'Development Environment' THEN 'https://www.youtube.com/watch?v=0-S5a0eXPoc'
  WHEN title = 'Your First App' THEN 'https://www.youtube.com/watch?v=ur6I5m2nTvk'
  WHEN title = 'Project Structure' THEN 'https://www.youtube.com/watch?v=ANdSdIlgsEw'
  WHEN title = 'Debugging Tools' THEN 'https://www.youtube.com/watch?v=kbHJ3Nn4Wbs'
  ELSE video_url
END
WHERE module_id IN (
  SELECT cm.id FROM course_modules cm 
  JOIN courses c ON c.id = cm.course_id 
  WHERE c.title = 'React Native Mobile App Development'
);

-- Add more lessons to existing courses for better content
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
  ('React Router Setup', 'Setting up React Router for navigation', 'https://www.youtube.com/watch?v=Law7wfdg_ls', '25 min', 1),
  ('Dynamic Routing', 'Creating dynamic routes with parameters', 'https://www.youtube.com/watch?v=0cSVuySEB0A', '20 min', 2),
  ('Protected Routes', 'Implementing authentication-based routing', 'https://www.youtube.com/watch?v=2k8NleFjG7I', '30 min', 3),
  ('Navigation Components', 'Building navigation menus and breadcrumbs', 'https://www.youtube.com/watch?v=0X6tBT60ARk', '22 min', 4)
) AS lessons(lesson_title, lesson_description, lesson_video_url, lesson_duration, lesson_order)
WHERE c.title = 'Complete React.js Masterclass 2024' AND cm.title = 'Routing & Navigation';

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
  ('React.memo and useMemo', 'Optimizing component re-renders', 'https://www.youtube.com/watch?v=THL1OPn72vo', '28 min', 1),
  ('useCallback Hook', 'Memoizing functions for performance', 'https://www.youtube.com/watch?v=_AyFP5s69N4', '20 min', 2),
  ('Code Splitting', 'Lazy loading components and routes', 'https://www.youtube.com/watch?v=JU6sl_yyZqs', '25 min', 3),
  ('Error Boundaries', 'Handling errors gracefully in React', 'https://www.youtube.com/watch?v=DNYXgtZBRPE', '18 min', 4)
) AS lessons(lesson_title, lesson_description, lesson_video_url, lesson_duration, lesson_order)
WHERE c.title = 'Complete React.js Masterclass 2024' AND cm.title = 'Advanced Patterns';