import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Star, BookOpen } from 'lucide-react'
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
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={thumbnail_url || 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg'}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            level === 'Beginner' ? 'bg-green-100 text-green-800' :
            level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {level}
          </span>
        </div>
        {price > 0 && (
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow">
            <span className="text-green-600 font-bold">${price}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="font-medium text-gray-700">{instructor_name}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={16} className="mr-1" />
              <span>{totalLessons} lessons</span>
            </div>
          </div>
          
          {rating && (
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 mr-1" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        {students_count && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Users size={16} className="mr-1" />
            <span>{students_count} students</span>
          </div>
        )}

        <Button
          onClick={() => onEnroll(course)}
          className="w-full"
          variant={isEnrolled ? 'secondary' : 'primary'}
          disabled={isEnrolled}
        >
          {isEnrolled ? 'Enrolled' : price > 0 ? `Enroll - $${price}` : 'Enroll Free'}
        </Button>
      </div>
    </motion.div>
  )
}

export default CourseCard