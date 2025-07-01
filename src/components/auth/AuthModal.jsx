import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useAuth } from '../../contexts/AuthContext'

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
})

const signUpSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').min(2, 'Full name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth()

  const getSchema = () => {
    switch (mode) {
      case 'signin': return signInSchema
      case 'signup': return signUpSchema
      case 'forgot': return forgotPasswordSchema
      default: return signInSchema
    }
  }

  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm({
    resolver: zodResolver(getSchema()),
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    setLoading(true)
    
    try {
      if (mode === 'signin') {
        const result = await signIn(data.email, data.password)
        if (result && !result.error) {
          onClose()
          reset()
        }
      } else if (mode === 'signup') {
        const result = await signUp(data.email, data.password, data.fullName)
        if (result && !result.error) {
          onClose()
          reset()
        }
      } else if (mode === 'forgot') {
        const result = await resetPassword(data.email)
        if (result && !result.error) {
          setResetEmailSent(true)
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const result = await signInWithGoogle()
      if (result && !result.error) {
        onClose()
        reset()
      }
    } catch (error) {
      console.error('Google auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setResetEmailSent(false)
    reset()
    clearErrors()
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const handleClose = () => {
    onClose()
    setMode('signin')
    setResetEmailSent(false)
    reset()
    clearErrors()
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const getTitle = () => {
    switch (mode) {
      case 'signin': return 'Welcome Back'
      case 'signup': return 'Create Your Account'
      case 'forgot': return 'Reset Your Password'
      default: return 'Authentication'
    }
  }

  const getSubtitle = () => {
    switch (mode) {
      case 'signin': return 'Sign in to continue your learning journey'
      case 'signup': return 'Join thousands of learners worldwide'
      case 'forgot': return 'Enter your email to receive reset instructions'
      default: return ''
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      size="md"
    >
      <div className="text-center mb-6">
        <p className="text-gray-600">{getSubtitle()}</p>
      </div>

      {mode === 'forgot' && resetEmailSent ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
          <p className="text-gray-600 mb-6">
            We've sent password reset instructions to your email address.
          </p>
          <Button
            onClick={() => switchMode('signin')}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'signup' && (
            <Input
              label="Full Name"
              {...register('fullName')}
              error={errors.fullName?.message}
              placeholder="Enter your full name"
            />
          )}
          
          <Input
            label="Email Address"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="Enter your email address"
          />
          
          {mode !== 'forgot' && (
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={errors.password?.message}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}
          
          {mode === 'signup' && (
            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {mode === 'signin' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => switchMode('forgot')}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Please wait...' : 
             mode === 'signin' ? 'Sign In' : 
             mode === 'signup' ? 'Create Account' : 
             'Send Reset Email'}
          </Button>

          {mode !== 'forgot' && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google</span>
              </Button>
            </>
          )}

          <div className="text-center space-y-2">
            {mode === 'signin' && (
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Don't have an account? Sign up
              </button>
            )}
            
            {mode === 'signup' && (
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Already have an account? Sign in
              </button>
            )}

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center justify-center"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to Sign In
              </button>
            )}
          </div>
        </form>
      )}
    </Modal>
  )
}

export default AuthModal