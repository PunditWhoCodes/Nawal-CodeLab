import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Star, BookOpen, Play } from 'lucide-react'
import Button from '../ui/Button'

const CourseCard = ({ course, onEnroll, isEnrolled = false }) => {
  const {
    title,
    description,
    thumbnail_url,
    instructor_name,
    duration,
    level,
    price,
    rating,
    students_count,
    course_modules
  } = course

  const totalLessons = course_modules?.reduce((acc, module) => 
    acc + (module.course_lessons?.length || 0), 0
  ) || 0

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative group">
        <img
          src={thumbnail_url || 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            level === 'Beginner' ? 'bg-green-100 text-green-800' :
            level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {level}
          </span>
        </div>
        {price > 0 && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg shadow-lg">
            <span className="text-green-600 font-bold text-lg">${price}</span>
          </div>
        )}
        {price === 0 && (
          <div className="absolute top-4 right-4 bg-green-600 px-3 py-1 rounded-lg shadow-lg">
            <span className="text-white font-bold text-sm">FREE</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-green-600 font-semibold text-xs">
              {instructor_name?.charAt(0)}
            </span>
          </div>
          <span className="font-medium text-gray-700">{instructor_name}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-green-600" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={16} className="mr-1 text-green-600" />
              <span>{totalLessons} lessons</span>
            </div>
          </div>
          
          {rating && (
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 mr-1 fill-current" />
              <span className="font-medium">{rating}</span>
            </div>
          )}
        </div>

        {students_count && (
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Users size={16} className="mr-1 text-green-600" />
            <span>{students_count.toLocaleString()} students enrolled</span>
          </div>
        )}

        <Button
          onClick={() => onEnroll(course)}
          className="w-full"
          variant={isEnrolled ? 'secondary' : 'primary'}
          disabled={isEnrolled}
        >
          {isEnrolled ? (
            <>
              <BookOpen size={16} className="mr-2" />
              Continue Learning
            </>
          ) : price > 0 ? (
            `Enroll Now - $${price}`
          ) : (
            'Enroll Free'
          )}
        </Button>
      </div>
    </motion.div>
  )
}

export default CourseCard