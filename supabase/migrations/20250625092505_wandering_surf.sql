/*
  # Update video URLs to working demo content

  1. Updates
    - Replace YouTube URLs with working video content
    - Use sample videos that don't have embedding restrictions
    - Maintain course structure and lesson information
*/

-- Update all course lessons with working demo video URLs
UPDATE course_lessons 
SET video_url = CASE 
  -- React course videos
  WHEN title LIKE '%React%' OR title LIKE '%Component%' OR title LIKE '%JSX%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  WHEN title LIKE '%Hook%' OR title LIKE '%State%' OR title LIKE '%Effect%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  WHEN title LIKE '%Router%' OR title LIKE '%Navigation%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  WHEN title LIKE '%memo%' OR title LIKE '%Performance%' OR title LIKE '%Optimization%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  
  -- Node.js course videos
  WHEN title LIKE '%Node%' OR title LIKE '%Server%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  WHEN title LIKE '%Express%' OR title LIKE '%API%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  WHEN title LIKE '%Database%' OR title LIKE '%MongoDB%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  WHEN title LIKE '%Auth%' OR title LIKE '%JWT%' OR title LIKE '%Security%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  
  -- HTML/CSS course videos
  WHEN title LIKE '%HTML%' OR title LIKE '%Markup%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'
  WHEN title LIKE '%CSS%' OR title LIKE '%Style%' OR title LIKE '%Design%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  WHEN title LIKE '%Responsive%' OR title LIKE '%Grid%' OR title LIKE '%Flexbox%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4'
  
  -- Python course videos
  WHEN title LIKE '%Python%' OR title LIKE '%Programming%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
  WHEN title LIKE '%Data%' OR title LIKE '%Analysis%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  
  -- React Native course videos
  WHEN title LIKE '%Mobile%' OR title LIKE '%App%' OR title LIKE '%Native%' THEN 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  
  -- Default fallback
  ELSE 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
END;

-- Update course descriptions to mention demo content
UPDATE courses 
SET description = description || ' (Demo course with sample video content for demonstration purposes)'
WHERE description NOT LIKE '%(Demo course%';