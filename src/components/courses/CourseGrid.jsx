import React from 'react'
import { motion } from 'framer-motion'
import CourseCard from './CourseCard'

const CourseGrid = ({ courses, onEnroll, enrolledCourses = [] }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={item}>
          <CourseCard
            course={course}
            onEnroll={onEnroll}
            isEnrolled={enrolledCourses.some(e => e.course_id === course.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default CourseGrid