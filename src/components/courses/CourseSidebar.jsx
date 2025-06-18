import React from 'react'
import { motion } from 'framer-motion'
import { Play, CheckCircle, Lock, Clock, BookOpen } from 'lucide-react'

const CourseSidebar = ({ course, currentLesson, onLessonSelect, completedLessons = [], isEnrolled = false }) => {
  const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId)
  const isCurrentLesson = (lessonId) => currentLesson?.id === lessonId

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <h2 className="text-xl font-bold mb-2">{course.title}</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <BookOpen size={16} className="mr-1" />
            {course.course_modules?.length || 0} modules
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            {course.duration}
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {course.course_modules?.map((module, moduleIndex) => (
          <div key={module.id} className="border-b border-gray-200">
            <div className="p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {moduleIndex + 1}
                </span>
                {module.title}
              </h3>
              {module.description && (
                <p className="text-sm text-gray-600 mt-1 ml-9">{module.description}</p>
              )}
            </div>

            <div className="divide-y divide-gray-100">
              {module.course_lessons?.map((lesson, lessonIndex) => (
                <motion.button
                  key={lesson.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  onClick={() => isEnrolled && onLessonSelect(lesson)}
                  disabled={!isEnrolled}
                  className={`w-full text-left p-4 transition-colors ${
                    isCurrentLesson(lesson.id) 
                      ? 'bg-green-50 border-r-4 border-green-600' 
                      : 'hover:bg-gray-50'
                  } ${!isEnrolled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="flex items-center justify-center w-8 h-8 mr-3">
                        {!isEnrolled ? (
                          <Lock size={16} className="text-gray-400" />
                        ) : isLessonCompleted(lesson.id) ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : isCurrentLesson(lesson.id) ? (
                          <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                        ) : (
                          <Play size={16} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          isCurrentLesson(lesson.id) ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </h4>
                        {lesson.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {lesson.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">
                      {lesson.duration}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!isEnrolled && (
        <div className="p-4 bg-yellow-50 border-t">
          <p className="text-sm text-yellow-800 text-center">
            <Lock size={16} className="inline mr-1" />
            Enroll in this course to access all lessons
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseSidebar