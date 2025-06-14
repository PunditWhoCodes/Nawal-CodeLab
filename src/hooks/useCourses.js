import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_modules (
            id,
            title,
            order_index,
            course_lessons (
              id,
              title,
              duration
            )
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { courses, loading, error, refetch: fetchCourses }
}

export const useEnrollments = () => {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchEnrollments()
    }
  }, [user])

  const fetchEnrollments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (
            id,
            title,
            description,
            thumbnail_url,
            instructor_name,
            duration,
            level
          )
        `)
        .eq('user_id', user.id)

      if (error) throw error
      setEnrollments(data || [])
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  const enrollInCourse = async (courseId) => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert([
          {
            user_id: user.id,
            course_id: courseId,
          }
        ])
        .select()

      if (error) throw error
      
      await fetchEnrollments()
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  return { enrollments, loading, enrollInCourse, refetch: fetchEnrollments }
}