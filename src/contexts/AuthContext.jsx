import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const createProfile = async (userId, userData) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            full_name: userData.full_name || userData.fullName,
            email: userData.email,
            avatar_url: userData.avatar_url,
            bio: userData.bio || null
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error creating profile:', error)
      return null
    }
  }

  const signUp = async (email, password, fullName) => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      })

      if (error) {
        console.error('Signup error:', error)
        
        // Handle specific error cases
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please sign in instead.')
        } else if (error.message.includes('Password should be at least')) {
          toast.error('Password must be at least 6 characters long.')
        } else if (error.message.includes('Unable to validate email address')) {
          toast.error('Please enter a valid email address.')
        } else {
          toast.error(error.message)
        }
        return { data: null, error }
      }

      if (data.user && !data.user.email_confirmed_at) {
        toast.success('Account created! Please check your email and click the confirmation link to complete your registration.')
      } else if (data.user) {
        // If email confirmation is disabled, create profile immediately
        await createProfile(data.user.id, { 
          full_name: fullName, 
          email: email 
        })
        toast.success('Account created successfully!')
      }

      return { data, error: null }
    } catch (error) {
      console.error('Signup error:', error)
      toast.error(error.message || 'Failed to create account')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Signin error:', error)
        
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and click the confirmation link before signing in.')
        } else if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials and try again.')
        } else if (error.message.includes('Too many requests')) {
          toast.error('Too many login attempts. Please wait a moment before trying again.')
        } else if (error.message.includes('Signup requires a valid password')) {
          toast.error('Please enter a valid password.')
        } else {
          toast.error(error.message)
        }
        return { data: null, error }
      }

      // Check if profile exists, create if it doesn't
      if (data.user) {
        const existingProfile = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single()

        if (existingProfile.error && existingProfile.error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          await createProfile(data.user.id, {
            full_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
            email: data.user.email,
            avatar_url: data.user.user_metadata?.avatar_url
          })
        }
      }

      toast.success('Signed in successfully!')
      return { data, error: null }
    } catch (error) {
      console.error('Signin error:', error)
      toast.error(error.message || 'Failed to sign in')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error('Google signin error:', error)
        
        // Handle specific Google OAuth errors
        if (error.message.includes('OAuth provider not enabled')) {
          toast.error('Google sign-in is not configured. Please contact support.')
        } else if (error.message.includes('redirect_uri_mismatch')) {
          toast.error('Authentication configuration error. Please contact support.')
        } else {
          toast.error('Failed to sign in with Google. Please try again or use email/password.')
        }
        return { data: null, error }
      }

      // Note: For OAuth, the actual sign-in happens after redirect
      // so we don't show success message here
      return { data, error: null }
    } catch (error) {
      console.error('Google signin error:', error)
      toast.error('Failed to sign in with Google. Please try again.')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Signout error:', error)
        toast.error(error.message)
        return
      }
      
      setProfile(null)
      toast.success('Signed out successfully!')
    } catch (error) {
      console.error('Signout error:', error)
      toast.error(error.message || 'Failed to sign out')
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    fetchProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}