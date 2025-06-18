import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, SkipBack, SkipForward, Clock, ExternalLink } from 'lucide-react'
import VideoPlayer from './VideoPlayer'
import Button from '../ui/Button'

const CoursePlayer = ({ course, currentLesson, onLessonChange, onProgressUpdate, userProgress = 0 }) => {
  const [played, setPlayed] = useState(0)
  const [videoError, setVideoError] = useState(false)

  const allLessons = course.course_modules?.flatMap(module => 
    module.course_lessons?.map(lesson => ({
      ...lesson,
      moduleTitle: module.title,
      moduleId: module.id
    })) || []
  ) || []

  const currentLessonIndex = allLessons.findIndex(lesson => lesson.id === currentLesson?.id)
  const nextLesson = allLessons[currentLessonIndex + 1]
  const prevLesson = allLessons[currentLessonIndex - 1]

  const handleNext = () => {
    if (nextLesson && onLessonChange) {
      onLessonChange(nextLesson)
      setPlayed(0)
      setVideoError(false)
      // Mark current lesson as completed when moving to next
      if (onProgressUpdate) {
        onProgressUpdate(currentLesson.id, 100)
      }
    }
  }

  const handlePrevious = () => {
    if (prevLesson && onLessonChange) {
      onLessonChange(prevLesson)
      setPlayed(0)
      setVideoError(false)
    }
  }

  const handleVideoError = (error) => {
    console.error('Video error:', error)
    setVideoError(true)
  }

  const openInYouTube = () => {
    if (currentLesson?.video_url) {
      window.open(currentLesson.video_url, '_blank')
    }
  }

  const markAsCompleted = () => {
    if (onProgressUpdate && currentLesson) {
      onProgressUpdate(currentLesson.id, 100)
      setPlayed(100)
    }
  }

  if (!currentLesson) {
    return (
      <div className="bg-gray-900 aspect-video flex items-center justify-center rounded-lg">
        <div className="text-center text-white">
          <Play size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-xl">Select a lesson to start learning</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        <VideoPlayer
          videoUrl={currentLesson.video_url}
          onProgress={setPlayed}
          onError={handleVideoError}
        />
      </div>

      <div className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {currentLesson.title}
            </h3>
            <p className="text-gray-600 mb-2">
              Module: {currentLesson.moduleTitle}
            </p>
            {currentLesson.description && (
              <p className="text-gray-700 leading-relaxed">
                {currentLesson.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={!prevLesson}
              className="flex items-center"
            >
              <SkipBack size={16} className="mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!nextLesson}
              className="flex items-center"
            >
              Next
              <SkipForward size={16} className="ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={openInYouTube}
              className="flex items-center"
            >
              <ExternalLink size={16} className="mr-2" />
              YouTube
            </Button>

            <Button
              variant="secondary"
              onClick={markAsCompleted}
              className="flex items-center"
            >
              Mark Complete
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              {currentLesson.duration}
            </div>
            <div className="flex items-center">
              <span>{currentLessonIndex + 1} of {allLessons.length}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Lesson Progress</span>
            <span>{Math.round(played)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${played}%` }}
            />
          </div>
        </div>

        {/* Video info */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Having trouble with the video? Try watching directly on YouTube for the best experience.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={openInYouTube}
              className="ml-4"
            >
              Open YouTube
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer