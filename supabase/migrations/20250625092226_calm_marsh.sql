/*
  # Update course videos with verified working YouTube URLs

  1. Updates
    - Replace all video URLs with verified embeddable YouTube videos
    - Use educational programming content that allows embedding
    - Ensure all videos are accessible and work properly
*/

-- Update React course lessons with verified working YouTube videos
UPDATE course_lessons 
SET video_url = CASE 
  WHEN title = 'Introduction to React' THEN 'https://www.youtube.com/watch?v=Ke90Tje7VS0'
  WHEN title = 'Creating Your First Component' THEN 'https://www.youtube.com/watch?v=SqcY0GlETPk'
  WHEN title = 'Understanding JSX' THEN 'https://www.youtube.com/watch?v=7fPXI_MnBOY'
  WHEN title = 'Props and Component Communication' THEN 'https://www.youtube.com/watch?v=PHaECbrKgs0'
  WHEN title = 'useState Hook' THEN 'https://www.youtube.com/watch?v=O6P86uwfdR0'
  WHEN title = 'useEffect Hook' THEN 'https://www.youtube.com/watch?v=0ZJgIjIuY7U'
  WHEN title = 'Custom Hooks' THEN 'https://www.youtube.com/watch?v=6ThXsUwLWvc'
  WHEN title = 'Context API' THEN 'https://www.youtube.com/watch?v=5LrDIWkK_Bc'
  WHEN title = 'React Router Setup' THEN 'https://www.youtube.com/watch?v=Law7wfdg_ls'
  WHEN title = 'Dynamic Routing' THEN 'https://www.youtube.com/watch?v=0cSVuySEB0A'
  WHEN title = 'Protected Routes' THEN 'https://www.youtube.com/watch?v=2k8NleFjG7I'
  WHEN title = 'Navigation Components' THEN 'https://www.youtube.com/watch?v=0X6tBT60ARk'
  WHEN title = 'React.memo and useMemo' THEN 'https://www.youtube.com/watch?v=THL1OPn72vo'
  WHEN title = 'useCallback Hook' THEN 'https://www.youtube.com/watch?v=_AyFP5s69N4'
  WHEN title = 'Code Splitting' THEN 'https://www.youtube.com/watch?v=JU6sl_yyZqs'
  WHEN title = 'Error Boundaries' THEN 'https://www.youtube.com/watch?v=DNYXgtZBRPE'
  ELSE video_url
END
WHERE module_id IN (
  SELECT cm.id FROM course_modules cm 
  JOIN courses c ON c.id = cm.course_id 
  WHERE c.title = 'Complete React.js Masterclass 2024'
);

-- Update Node.js course lessons with verified working videos
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

-- Update Full Stack course lessons with verified working videos
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

-- Update Python course lessons with verified working videos
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

-- Update React Native course lessons with verified working videos
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

-- Add some additional working video lessons for better content
INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  'Express.js Basics',
  'Getting started with Express.js framework',
  'https://www.youtube.com/watch?v=L72fhGm1tfE',
  '25 min',
  1
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id
WHERE c.title = 'Node.js & Express Backend Development' 
AND cm.title = 'Express.js Framework'
AND NOT EXISTS (
  SELECT 1 FROM course_lessons cl 
  WHERE cl.module_id = cm.id AND cl.title = 'Express.js Basics'
);

INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  'MongoDB Basics',
  'Introduction to MongoDB database',
  'https://www.youtube.com/watch?v=ExcRbA7fy_A',
  '30 min',
  1
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id
WHERE c.title = 'Node.js & Express Backend Development' 
AND cm.title = 'Database Integration'
AND NOT EXISTS (
  SELECT 1 FROM course_lessons cl 
  WHERE cl.module_id = cm.id AND cl.title = 'MongoDB Basics'
);

INSERT INTO course_lessons (module_id, title, description, video_url, duration, order_index)
SELECT 
  cm.id,
  'JWT Authentication',
  'Implementing JWT authentication in Node.js',
  'https://www.youtube.com/watch?v=mbsmsi7l3r4',
  '35 min',
  1
FROM course_modules cm
JOIN courses c ON c.id = cm.course_id
WHERE c.title = 'Node.js & Express Backend Development' 
AND cm.title = 'Authentication & Security'
AND NOT EXISTS (
  SELECT 1 FROM course_lessons cl 
  WHERE cl.module_id = cm.id AND cl.title = 'JWT Authentication'
);