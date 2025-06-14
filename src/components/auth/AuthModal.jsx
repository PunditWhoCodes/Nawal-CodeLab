import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useAuth } from '../../contexts/AuthContext'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  const schema = mode === 'signin' ? signInSchema : signUpSchema
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data) => {
    setLoading(true)
    
    try {
      if (mode === 'signin') {
        const { error } = await signIn(data.email, data.password)
        if (!error) {
          onClose()
          reset()
        }
      } else {
        const { error } = await signUp(data.email, data.password, data.fullName)
        if (!error) {
          onClose()
          reset()
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    reset()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'signin' ? 'Sign In' : 'Create Account'}
    >
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
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="Enter your email"
        />
        
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          placeholder="Enter your password"
        />
        
        {mode === 'signup' && (
          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            placeholder="Confirm your password"
          />
        )}

        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-green-600 hover:text-green-700 text-sm"
          >
            {mode === 'signin' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AuthModal