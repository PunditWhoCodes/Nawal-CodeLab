import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, SkipBack, SkipForward, Clock, CheckCircle } from 'lucide-react'
import VideoPlayer from './VideoPlayer'
import Button from '../ui/Button'

const CoursePlayer = ({ course, currentLesson, onLessonChange, onProgressUpdate, userProgress = 0 }) => {
  const [played, setPlayed] = useState(0)
  const [lessonCompleted, setLessonCompleted] = useState(false)

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

  useEffect(() => {
    setPlayed(0)
    setLessonCompleted(false)
  }, [currentLesson])

  const handleNext = () => {
    if (nextLesson && onLessonChange) {
      onLessonChange(nextLesson)
      // Mark current lesson as completed when moving to next
      if (onProgressUpdate && !lessonCompleted) {
        onProgressUpdate(currentLesson.id, 100)
        setLessonCompleted(true)
      }
    }
  }

  const handlePrevious = () => {
    if (prevLesson && onLessonChange) {
      onLessonChange(prevLesson)
    }
  }

  const handleVideoError = (error) => {
    console.error('Video error:', error)
  }

  const markAsCompleted = () => {
    if (onProgressUpdate && currentLesson && !lessonCompleted) {
      onProgressUpdate(currentLesson.id, 100)
      setLessonCompleted(true)
      setPlayed(100)
    }
  }

  const handleProgressUpdate = (progress) => {
    setPlayed(progress)
    
    // Auto-complete when video reaches 90%
    if (progress >= 90 && !lessonCompleted && onProgressUpdate) {
      onProgressUpdate(currentLesson.id, 100)
      setLessonCompleted(true)
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
          onProgress={handleProgressUpdate}
          onError={handleVideoError}
        />
      </div>

      <div className="p-6 bg-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-bold text-gray-900 mr-3">
                {currentLesson.title}
              </h3>
              {lessonCompleted && (
                <CheckCircle className="text-green-600" size={24} />
              )}
            </div>
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

            {!lessonCompleted && (
              <Button
                variant="secondary"
                onClick={markAsCompleted}
                className="flex items-center"
              >
                <CheckCircle size={16} className="mr-2" />
                Mark Complete
              </Button>
            )}
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
              className={`h-2 rounded-full transition-all duration-300 ${
                lessonCompleted ? 'bg-green-600' : 'bg-blue-600'
              }`}
              style={{ width: `${played}%` }}
            />
          </div>
        </div>

        {/* Lesson info */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Learning Tip:</strong> Take notes while watching and practice the concepts shown in the video.
            </p>
            <p>
              Use the "Mark Complete" button when you've finished the lesson and understood the concepts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer