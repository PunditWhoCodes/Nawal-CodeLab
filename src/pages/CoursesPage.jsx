import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { useCourses, useEnrollments } from '../hooks/useCourses'
import { useAuth } from '../contexts/AuthContext'
import CourseGrid from '../components/courses/CourseGrid'
import AuthModal from '../components/auth/AuthModal'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import toast from 'react-hot-toast'

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' })
  
  const { user } = useAuth()
  const { courses, loading } = useCourses()
  const { enrollments, enrollInCourse } = useEnrollments()

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    
    return matchesSearch && matchesLevel
  })

  const handleEnroll = async (course) => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'signup' })
      return
    }

    const isAlreadyEnrolled = enrollments.some(e => e.course_id === course.id)
    if (isAlreadyEnrolled) {
      toast.error('You are already enrolled in this course')
      return
    }

    const { success, error } = await enrollInCourse(course.id)
    if (success) {
      toast.success(`Successfully enrolled in ${course.title}!`)
    } else {
      toast.error(error || 'Failed to enroll in course')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover comprehensive courses designed to help you master the latest technologies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : filteredCourses.length > 0 ? (
            <CourseGrid
              courses={filteredCourses}
              onEnroll={handleEnroll}
              enrolledCourses={enrollments}
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {searchTerm || selectedLevel !== 'all' 
                  ? 'No courses found matching your criteria'
                  : 'No courses available at the moment'
                }
              </div>
            </div>
          )}
        </div>
      </section>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signin' })}
        defaultMode={authModal.mode}
      />
    </div>
  )
}

export default CoursesPage