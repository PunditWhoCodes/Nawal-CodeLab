import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, CheckCircle, Star, Users, BookOpen, Award, Clock, TrendingUp } from 'lucide-react'
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
    { icon: Users, label: 'Active Students', value: '25,000+', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Courses', value: '150+', color: 'text-green-600' },
    { icon: Star, label: 'Average Rating', value: '4.8', color: 'text-yellow-500' },
    { icon: Award, label: 'Certificates Issued', value: '18,500+', color: 'text-purple-600' }
  ]

  const features = [
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience at top tech companies',
      icon: '👨‍🏫',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Hands-on Projects',
      description: 'Build real-world projects that you can showcase in your portfolio to potential employers',
      icon: '🛠️',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Lifetime Access',
      description: 'Access all course materials, updates, and new content anytime, anywhere, forever',
      icon: '♾️',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Community Support',
      description: 'Join our active community of learners, get help from peers and instructors',
      icon: '🤝',
      color: 'bg-orange-50 border-orange-200'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer at Google',
      content: 'The React course completely transformed my career. The projects were challenging and the instructor support was amazing.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Full Stack Developer',
      content: 'Best investment I made for my career. Went from beginner to landing my dream job in just 6 months.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      rating: 5
    }
  ]

  const openSignIn = () => setAuthModal({ isOpen: true, mode: 'signin' })
  const openSignUp = () => setAuthModal({ isOpen: true, mode: 'signup' })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6"
              >
                <TrendingUp size={16} className="mr-2" />
                #1 Rated Online Learning Platform
              </motion.div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Career with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 block">
                  World-Class Skills
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Master cutting-edge technologies with our comprehensive courses designed by industry experts. 
                Join over 25,000 students who've successfully launched their tech careers with us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {!user ? (
                  <>
                    <Button
                      size="lg"
                      onClick={openSignUp}
                      className="group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      Start Learning Today
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group border-2"
                    >
                      <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                      Watch Demo
                    </Button>
                  </>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Explore Courses
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  No Credit Card Required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  30-Day Money Back
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  alt="Students learning"
                  className="rounded-2xl shadow-2xl"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">12,000+ Students Online Now</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-bold">4.9/5</span>
                    <span className="text-xs text-gray-500">Rating</span>
                  </div>
                </motion.div>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
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
              We provide everything you need to succeed in your tech journey with industry-leading curriculum and support
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
                whileHover={{ y: -5 }}
                className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${feature.color}`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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
              Start your learning journey with our most popular and highly-rated courses
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
                window.location.href = '/courses'
              }}
              className="group"
            >
              View All Courses
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful graduates who transformed their careers with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
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
              Join over 25,000 students who have successfully launched their tech careers with our comprehensive courses
            </p>
            {!user && (
              <Button
                size="lg"
                variant="secondary"
                onClick={openSignUp}
                className="bg-white text-green-600 hover:bg-gray-100 group"
              >
                Get Started Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
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