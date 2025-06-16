import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  console.log('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY')
  console.log('Current values:', { 
    url: supabaseUrl ? 'Set' : 'Missing', 
    key: supabaseAnonKey ? 'Set' : 'Missing' 
  })
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Test connection with better error handling
const testConnection = async () => {
  try {
    const { count, error } = await supabase
      .from('courses')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Supabase connection error:', error.message)
      if (error.message.includes('JWT')) {
        console.error('Authentication token issue. Check your VITE_SUPABASE_ANON_KEY.')
      } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.error('Database table not found. Make sure your migrations have run.')
      }
    } else {
      console.log('✅ Supabase connected successfully. Courses count:', count)
    }
  } catch (err) {
    console.error('Failed to test Supabase connection:', err.message)
  }
}

// Test connection on load
testConnection()