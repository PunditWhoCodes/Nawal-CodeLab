import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useEnrollments } from '../hooks/useCourses'
import CourseCard from '../components/courses/CourseCard'

const DashboardPage = () => {
  const { user, profile } = useAuth()
  const { enrollments, loading } = useEnrollments()

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: enrollments.length,
      color: 'bg-blue-500'
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: '24',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      label: 'Certificates',
      value: '2',
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: '68%',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.full_name || user?.email}!
          </h1>
          <p className="text-green-100">
            Continue your learning journey and achieve your goals
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : enrollments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <CourseCard
                  key={enrollment.id}
                  course={enrollment.courses}
                  isEnrolled={true}
                  onEnroll={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses enrolled yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start your learning journey by enrolling in a course
              </p>
              <button
                onClick={() => window.location.href = '/courses'}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Browse Courses
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage