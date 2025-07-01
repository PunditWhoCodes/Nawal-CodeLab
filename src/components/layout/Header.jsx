import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, User, LogOut, BookOpen, Home } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from '../auth/AuthModal'
import Button from '../ui/Button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' })
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, profile, signOut } = useAuth()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
  ]

  const handleSignOut = async () => {
    await signOut()
    setIsProfileOpen(false)
  }

  const openSignIn = () => {
    setAuthModal({ isOpen: true, mode: 'signin' })
    setIsMenuOpen(false)
  }

  const openSignUp = () => {
    setAuthModal({ isOpen: true, mode: 'signup' })
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <a href="/" className="text-2xl font-bold text-green-600">
                Nawal's CodeLab
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium">
                      {profile?.full_name || user.email}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2"
                    >
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Dashboard
                      </a>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={openSignIn}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={openSignUp}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t py-4"
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                {user ? (
                  <>
                    <a
                      href="/dashboard"
                      className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-gray-700 hover:text-green-600 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button
                      variant="ghost"
                      onClick={openSignIn}
                      className="justify-start"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={openSignUp}
                      className="justify-start"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signin' })}
        defaultMode={authModal.mode}
      />
    </>
  )
}

export default Header