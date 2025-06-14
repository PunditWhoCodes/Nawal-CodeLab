import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, CheckCircle, Star, Users, BookOpen } from 'lucide-react'
import Button from '../components/ui/Button'
import AuthModal from '../components/auth/AuthModal'
import { useAuth } from '../contexts/AuthContext'
import { useCourses } from '../hooks/useCourses'
import CourseGrid from '../components/courses/CourseGrid'

const HomePage = () => {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' })
  const { user } = useAuth()
  const { courses, loading } = useCourses()

  const featuredCourses = courses.slice(0, 3)

  const stats = [
    { icon: Users, label: 'Students', value: '10,000+' },
    { icon: BookOpen, label: 'Courses', value: '50+' },
    { icon: Star, label: 'Rating', value: '4.9' },
    { icon: CheckCircle, label: 'Completion', value: '95%' }
  ]

  const features = [
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience',
      icon: '👨‍🏫'
    },
    {
      title: 'Hands-on Projects',
      description: 'Build real-world projects to strengthen your portfolio',
      icon: '🛠️'
    },
    {
      title: 'Lifetime Access',
      description: 'Access course materials anytime, anywhere, forever',
      icon: '♾️'
    },
    {
      title: 'Community Support',
      description: 'Join a community of learners and get help when needed',
      icon: '🤝'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Empower Your Future with
                <span className="text-green-600 block">Cutting-Edge Skills</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Master the latest technologies with our comprehensive courses designed by industry experts. 
                Join thousands of students who've transformed their careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <>
                    <Button
                      size="lg"
                      onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                      className="group"
                    >
                      Start Learning Today
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group"
                    >
                      <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                      Watch Demo
                    </Button>
                  </>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
                    className="group"
                  >
                    Explore Courses
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  alt="Students learning"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live Classes Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Nawal's CodeLab?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in your tech journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your learning journey with our most popular courses
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <CourseGrid
              courses={featuredCourses}
              onEnroll={(course) => {
                if (!user) {
                  setAuthModal({ isOpen: true, mode: 'signup' })
                }
              }}
            />
          )}

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                // Navigate to courses page
                window.location.href = '/courses'
              }}
            >
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have successfully launched their tech careers with us
            </p>
            {!user && (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Get Started Now
              </Button>
            )}
          </motion.div>
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

export default HomePage