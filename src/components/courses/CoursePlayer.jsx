import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, BookOpen, CheckCircle, Clock, Users } from 'lucide-react'
import ReactPlayer from 'react-player'
import Button from '../ui/Button'

const CoursePlayer = ({ course, currentLesson, onLessonChange, onProgressUpdate, userProgress = 0 }) => {
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

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

  const handleProgress = (progress) => {
    setPlayed(progress.played)
    setCurrentTime(progress.playedSeconds)
    
    // Update progress when user watches 80% of the video
    if (progress.played > 0.8 && onProgressUpdate) {
      onProgressUpdate(currentLesson.id, 100)
    }
  }

  const handleDuration = (duration) => {
    setDuration(duration)
  }

  const handleNext = () => {
    if (nextLesson && onLessonChange) {
      onLessonChange(nextLesson)
      setPlayed(0)
      setCurrentTime(0)
    }
  }

  const handlePrevious = () => {
    if (prevLesson && onLessonChange) {
      onLessonChange(prevLesson)
      setPlayed(0)
      setCurrentTime(0)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentLesson) {
    return (
      <div className="bg-gray-900 aspect-video flex items-center justify-center">
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
        <ReactPlayer
          url={currentLesson.video_url}
          width="100%"
          height="100%"
          playing={playing}
          onProgress={handleProgress}
          onDuration={handleDuration}
          controls={true}
          config={{
            youtube: {
              playerVars: {
                showinfo: 1,
                modestbranding: 1,
                rel: 0
              }
            }
          }}
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

        <div className="flex items-center justify-between">
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
            <span>Progress</span>
            <span>{Math.round(played * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${played * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer