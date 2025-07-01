import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const AuthCallbackPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const type = searchParams.get('type')
        
        if (type === 'recovery') {
          // Handle password recovery
          const { data, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('Recovery callback error:', error)
            toast.error('Password recovery failed')
            navigate('/')
            return
          }

          if (data.session) {
            toast.success('You can now update your password')
            // Redirect to a password update page or show a modal
            navigate('/dashboard')
          } else {
            toast.error('Invalid recovery link')
            navigate('/')
          }
        } else {
          // Handle regular authentication
          const { data, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('Auth callback error:', error)
            toast.error('Authentication failed')
            navigate('/')
            return
          }

          if (data.session) {
            toast.success('Successfully signed in!')
            navigate('/dashboard')
          } else {
            navigate('/')
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        toast.error('Authentication failed')
        navigate('/')
      }
    }

    handleAuthCallback()
  }, [navigate, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  )
}

export default AuthCallbackPage