import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Clock, Users, BookOpen, Award, Play } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCourses, useEnrollments } from '../hooks/useCourses'
import { supabase } from '../lib/supabase'
import CoursePlayer from '../components/courses/CoursePlayer'
import CourseSidebar from '../components/courses/CourseSidebar'
import Button from '../components/ui/Button'
import AuthModal from '../components/auth/AuthModal'
import toast from 'react-hot-toast'

const CourseDetailPage = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { enrollments, enrollInCourse } = useEnrollments()
  
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [completedLessons, setCompletedLessons] = useState([])
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' })

  const isEnrolled = enrollments.some(e => e.course_id === courseId)
  const enrollment = enrollments.find(e => e.course_id === courseId)

  useEffect(() => {
    fetchCourseDetails()
  }, [courseId])

  useEffect(() => {
    if (course && isEnrolled && !currentLesson) {
      // Set first lesson as current when enrolled
      const firstLesson = course.course_modules?.[0]?.course_lessons?.[0]
      if (firstLesson) {
        setCurrentLesson(firstLesson)
      }
    }
  }, [course, isEnrolled, currentLesson])

  const fetchCourseDetails = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_modules (
            id,
            title,
            description,
            order_index,
            course_lessons (
              id,
              title,
              description,
              video_url,
              duration,
              order_index
            )
          )
        `)
        .eq('id', courseId)
        .eq('published', true)
        .single()

      if (error) throw error

      // Sort modules and lessons by order_index
      if (data.course_modules) {
        data.course_modules.sort((a, b) => a.order_index - b.order_index)
        data.course_modules.forEach(module => {
          if (module.course_lessons) {
            module.course_lessons.sort((a, b) => a.order_index - b.order_index)
          }
        })
      }

      setCourse(data)
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('Failed to load course details')
      navigate('/courses')
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'signup' })
      return
    }

    const { success, error } = await enrollInCourse(courseId)
    if (success) {
      toast.success(`Successfully enrolled in ${course.title}!`)
      // Set first lesson as current after enrollment
      const firstLesson = course.course_modules?.[0]?.course_lessons?.[0]
      if (firstLesson) {
        setCurrentLesson(firstLesson)
      }
    } else {
      toast.error(error || 'Failed to enroll in course')
    }
  }

  const handleLessonChange = (lesson) => {
    setCurrentLesson(lesson)
  }

  const handleProgressUpdate = async (lessonId, progress) => {
    if (!isEnrolled || completedLessons.includes(lessonId)) return

    try {
      // Mark lesson as completed
      setCompletedLessons(prev => [...prev, lessonId])
      
      // Update overall course progress
      const totalLessons = course.course_modules?.reduce((acc, module) => 
        acc + (module.course_lessons?.length || 0), 0
      ) || 0
      
      const completedCount = completedLessons.length + 1
      const overallProgress = Math.round((completedCount / totalLessons) * 100)

      const { error } = await supabase
        .from('enrollments')
        .update({ 
          progress: overallProgress,
          completed_at: overallProgress === 100 ? new Date().toISOString() : null
        })
        .eq('user_id', user.id)
        .eq('course_id', courseId)

      if (error) throw error

      if (overallProgress === 100) {
        toast.success('🎉 Congratulations! You completed the course!')
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <Button onClick={() => navigate('/courses')}>
            Back to Courses
          </Button>
        </div>
      </div>
    )
  }

  const totalLessons = course.course_modules?.reduce((acc, module) => 
    acc + (module.course_lessons?.length || 0), 0
  ) || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Courses
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center text-gray-600">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold">
                        {course.instructor_name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{course.instructor_name}</div>
                      <div className="text-sm text-gray-500">Instructor</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1 text-green-600" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-1 text-green-600" />
                      {totalLessons} lessons
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1 text-green-600" />
                      {course.students_count?.toLocaleString()} students
                    </div>
                    {course.rating && (
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-yellow-400 fill-current" />
                        {course.rating}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                  
                  {course.price > 0 ? (
                    <span className="text-2xl font-bold text-green-600">
                      ${course.price}
                    </span>
                  ) : (
                    <span className="text-2xl font-bold text-green-600">FREE</span>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="lg:w-80">
              {!isEnrolled ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="text-center mb-6">
                    <img
                      src={course.thumbnail_url || 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'}
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <Button
                      onClick={handleEnroll}
                      className="w-full"
                      size="lg"
                    >
                      {course.price > 0 ? `Enroll Now - $${course.price}` : 'Enroll Free'}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="text-center">
                    <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      You're Enrolled!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Progress: {enrollment?.progress || 0}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${enrollment?.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      {isEnrolled && (
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CoursePlayer
                course={course}
                currentLesson={currentLesson}
                onLessonChange={handleLessonChange}
                onProgressUpdate={handleProgressUpdate}
                userProgress={enrollment?.progress || 0}
              />
            </div>
            
            <div>
              <CourseSidebar
                course={course}
                currentLesson={currentLesson}
                onLessonSelect={handleLessonChange}
                completedLessons={completedLessons}
                isEnrolled={isEnrolled}
              />
            </div>
          </div>
        </div>
      )}

      {/* Course Overview for Non-enrolled Users */}
      {!isEnrolled && (
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
            <div className="space-y-4">
              {course.course_modules?.map((module, index) => (
                <div key={module.id} className="border border-gray-200 rounded-lg">
                  <div className="p-4 bg-gray-50 border-b">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      {module.title}
                    </h3>
                    {module.description && (
                      <p className="text-gray-600 mt-2 ml-9">{module.description}</p>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      {module.course_lessons?.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between py-2">
                          <div className="flex items-center">
                            <Play size={16} className="text-gray-400 mr-3" />
                            <span className="text-gray-700">{lesson.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signin' })}
        defaultMode={authModal.mode}
      />
    </div>
  )
}

export default CourseDetailPage