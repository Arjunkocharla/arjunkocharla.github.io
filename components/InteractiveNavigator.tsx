'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, Home, Sparkles, X } from 'lucide-react'

interface Section {
  id: string
  name: string
  target: string
  description: string
  icon: string
}

const sections: Section[] = [
  {
    id: 'home',
    name: 'Home',
    target: '#home',
    description: 'Welcome to my portfolio',
    icon: '🏠',
  },
  {
    id: 'about',
    name: 'About',
    target: '#about',
    description: 'Learn about my journey',
    icon: '👤',
  },
  {
    id: 'skills',
    name: 'Skills',
    target: '#skills',
    description: 'Explore my technical expertise',
    icon: '⚡',
  },
  {
    id: 'projects',
    name: 'Projects',
    target: '#projects',
    description: 'See my work',
    icon: '🚀',
  },
  {
    id: 'contact',
    name: 'Contact',
    target: '#contact',
    description: 'Get in touch',
    icon: '💬',
  },
]

export default function InteractiveNavigator() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!isPlaying || isNavigating) return

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % sections.length
        setIsNavigating(true)
        navigateToSection(sections[next].target, () => {
          setIsNavigating(false)
        })
        return next
      })
    }, 8000) // Auto-advance every 8 seconds

    return () => clearTimeout(timeout)
  }, [isPlaying, currentIndex, isNavigating])

  const navigateToSection = (target: string, onComplete?: () => void) => {
    const element = document.querySelector(target)
    if (element) {
      // Scroll to section
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      })
      
      // Wait for scroll to complete before calling onComplete
      const scrollDuration = 1000 // Smooth scroll takes about 1 second
      setTimeout(() => {
        // Double check we're at the right section
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3
        if (isVisible && onComplete) {
          onComplete()
        } else if (onComplete) {
          // If not visible, wait a bit more
          setTimeout(onComplete, 500)
        }
      }, scrollDuration)
    } else if (onComplete) {
      // If element not found, still call onComplete after delay
      setTimeout(onComplete, 500)
    }
  }

  const handleStart = () => {
    setHasStarted(true)
    setIsPlaying(true)
    setIsNavigating(false)
    setCurrentIndex(0)
    // Start from current section or home
    const startSection = sections[0].target
    navigateToSection(startSection, () => {
      setIsNavigating(false)
    })
  }
  
  const handlePause = () => {
    setIsPlaying(false)
    setIsNavigating(false)
  }

  const handleStop = () => {
    setIsPlaying(false)
  }

  const handleNext = () => {
    const next = (currentIndex + 1) % sections.length
    setIsNavigating(true)
    setCurrentIndex(next)
    navigateToSection(sections[next].target, () => {
      setIsNavigating(false)
    })
    // Pause auto-play when manually navigating
    setIsPlaying(false)
  }

  const handleSectionClick = (index: number) => {
    setIsNavigating(true)
    setCurrentIndex(index)
    navigateToSection(sections[index].target, () => {
      setIsNavigating(false)
    })
    setIsPlaying(false) // Stop auto-play when manually selecting
  }

  const handleClose = () => {
    setHasStarted(false)
    setIsPlaying(false)
    setIsNavigating(false)
    setCurrentIndex(0)
    setShowMenu(false)
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-2rem)] sm:w-auto max-w-[calc(100vw-2rem)] sm:max-w-none px-2 sm:px-0">
      {!hasStarted && !showMenu ? (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleStart}
          className="px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-500 dark:to-primary-600 rounded-full text-white dark:text-white font-bold text-base sm:text-lg shadow-2xl dark:shadow-primary-500/50 flex items-center gap-2 sm:gap-3 hover:shadow-primary-500/50 dark:hover:shadow-primary-600/50 transition-all w-full sm:w-auto justify-center"
        >
          <Play size={24} fill="white" />
          <span>Start Tour</span>
          <Sparkles size={20} />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-2xl w-full"
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tour Navigator</h3>
            <motion.button
              onClick={handleClose}
              className="p-2 glass rounded-lg text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Close Tour"
            >
              <X size={18} />
            </motion.button>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-3 mb-4">
            <motion.button
              onClick={isPlaying ? handlePause : handleStart}
              className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-full text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isPlaying ? 'Pause Tour' : 'Resume Tour'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} fill="white" />}
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="p-3 glass rounded-full text-gray-700 dark:text-white hover:bg-white/10 dark:hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipForward size={20} />
            </motion.button>
            <motion.button
              onClick={() => setShowMenu(!showMenu)}
              className="p-3 glass rounded-full text-white hover:bg-white/10 ml-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Home size={20} />
            </motion.button>
          </div>

          {/* Section Indicators */}
          <div className="flex gap-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => handleSectionClick(index)}
                className={`flex-1 p-3 rounded-lg text-center transition-all relative overflow-hidden ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white'
                    : 'glass text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  index === currentIndex
                    ? {
                        boxShadow: [
                          '0 0 0px rgba(14, 165, 233, 0)',
                          '0 0 20px rgba(14, 165, 233, 0.8)',
                          '0 0 0px rgba(14, 165, 233, 0)',
                        ],
                      }
                    : {}
                }
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                  },
                }}
              >
                <div className="text-2xl mb-1">{section.icon}</div>
                <div className="text-xs font-semibold">{section.name}</div>
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Current Section Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-center"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {sections[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* Section Menu (when home button clicked) */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 glass rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl w-[calc(100vw-4rem)] sm:w-auto sm:min-w-[300px] max-w-[calc(100vw-4rem)] sm:max-w-none"
          >
            <h3 className="text-lg font-bold mb-4 text-center gradient-text">
              Navigate Sections
            </h3>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    handleSectionClick(index)
                    setShowMenu(false)
                  }}
                  className={`w-full p-4 rounded-lg text-left flex items-center gap-3 transition-all ${
                    index === currentIndex
                      ? 'bg-primary-500/20 dark:bg-primary-500/30 border-2 border-primary-500'
                      : 'glass hover:bg-white/10 dark:hover:bg-white/10'
                  }`}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{section.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{section.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{section.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

