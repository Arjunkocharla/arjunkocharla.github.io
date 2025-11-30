'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowDown, ArrowRight, X, CheckCircle2 } from 'lucide-react'

interface GuideStep {
  id: string
  title: string
  description: string
  target: string
  position: 'top' | 'bottom' | 'left' | 'right'
}

const guideSteps: GuideStep[] = [
  {
    id: 'hero',
    title: 'Welcome! 👋',
    description: "I'm your guide! Let me show you around my portfolio.",
    target: '#home',
    position: 'bottom',
  },
  {
    id: 'about',
    title: 'About Me',
    description: 'Learn about my journey and what drives me.',
    target: '#about',
    position: 'right',
  },
  {
    id: 'skills',
    title: 'My Skills',
    description: 'Explore my technical expertise and capabilities.',
    target: '#skills',
    position: 'right',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Check out my work and creative solutions.',
    target: '#projects',
    position: 'right',
  },
  {
    id: 'contact',
    title: 'Get In Touch',
    description: 'Ready to connect? Let\'s start a conversation!',
    target: '#contact',
    position: 'top',
  },
]

export default function PortfolioGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [hasSeenGuide, setHasSeenGuide] = useState(false)

  useEffect(() => {
    // Check if user has seen the guide before
    const seen = localStorage.getItem('hasSeenPortfolioGuide')
    if (seen === 'true') {
      setHasSeenGuide(true)
      setIsVisible(false)
    } else {
      // Show guide on first visit
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    // Auto-advance guide after user interaction
    const handleScroll = () => {
      const sections = guideSteps.map((step) => {
        const element = document.querySelector(step.target)
        if (element) {
          const rect = element.getBoundingClientRect()
          return {
            step,
            inView: rect.top < window.innerHeight * 0.7 && rect.bottom > 0,
          }
        }
        return { step, inView: false }
      })

      sections.forEach(({ step, inView }) => {
        if (inView && !completedSteps.has(step.id)) {
          setCompletedSteps((prev) => new Set([...prev, step.id]))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [completedSteps])

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      const nextTarget = guideSteps[currentStep + 1].target
      const element = document.querySelector(nextTarget)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else {
      setIsVisible(false)
    }
  }

  const handleSkip = () => {
    setIsVisible(false)
    localStorage.setItem('hasSeenPortfolioGuide', 'true')
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    const target = guideSteps[stepIndex].target
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Hide the guide button if user has seen it - use InteractiveNavigator instead
  // Don't show the guide button if user has already seen the guide
  // Use InteractiveNavigator for ongoing tour functionality
  if (!isVisible) {
    // Only show button if they haven't seen it yet (for first-time visitors)
    if (hasSeenGuide) {
      return null
    }
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => {
          setIsVisible(true)
          setIsMinimized(false)
          setCurrentStep(0)
        }}
        className="fixed bottom-6 left-6 z-40 p-4 glass rounded-full shadow-lg hover:bg-primary-500/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Quick Guide (First Time)"
      >
        <Sparkles className="text-primary-400" size={24} />
      </motion.button>
    )
  }

  const currentGuide = guideSteps[currentStep]
  const progress = ((currentStep + 1) / guideSteps.length) * 100

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed z-50 ${
            isMinimized
              ? 'bottom-6 right-6'
              : currentGuide.position === 'right'
              ? 'right-6 top-1/2 -translate-y-1/2'
              : currentGuide.position === 'left'
              ? 'left-6 top-1/2 -translate-y-1/2'
              : currentGuide.position === 'top'
              ? 'top-6 left-1/2 -translate-x-1/2'
              : 'bottom-6 left-1/2 -translate-x-1/2'
          }`}
        >
          {!isMinimized ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="glass rounded-2xl p-6 max-w-sm shadow-2xl backdrop-blur-xl"
            >
              {/* Guide Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="relative"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                    <Sparkles className="text-white" size={32} />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 gradient-text">
                    {currentGuide.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentGuide.description}
                  </p>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Step {currentStep + 1} of {guideSteps.length}
                  </span>
                  <span className="text-xs text-primary-400 font-semibold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {guideSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                      index === currentStep
                        ? 'bg-primary-500 text-white scale-110'
                        : completedSteps.has(step.id)
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {completedSteps.has(step.id) ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      index + 1
                    )}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {currentStep < guideSteps.length - 1 ? (
                  <>
                    <motion.button
                      onClick={handleNext}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next
                      <ArrowRight size={16} />
                    </motion.button>
                    <motion.button
                      onClick={handleSkip}
                      className="px-4 py-2 glass rounded-lg text-gray-600 dark:text-gray-400 hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Skip Tour
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={handleSkip}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Exploring
                    <ArrowDown size={16} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsMinimized(false)}
              className="p-4 glass rounded-full shadow-lg hover:bg-primary-500/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Sparkles className="text-primary-400" size={24} />
            </motion.button>
          )}

          {/* Arrow Pointer */}
          {!isMinimized && (
            <motion.div
              className={`absolute ${
                currentGuide.position === 'right'
                  ? '-left-8 top-1/2 -translate-y-1/2'
                  : currentGuide.position === 'left'
                  ? '-right-8 top-1/2 -translate-y-1/2'
                  : currentGuide.position === 'top'
                  ? 'top-full left-1/2 -translate-x-1/2 mt-2'
                  : 'bottom-full left-1/2 -translate-x-1/2 mb-2'
              }`}
              animate={{
                [currentGuide.position === 'right' || currentGuide.position === 'left'
                  ? 'x'
                  : 'y']: [0, 10, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight
                size={32}
                className={`text-primary-400 ${
                  currentGuide.position === 'left'
                    ? 'rotate-180'
                    : currentGuide.position === 'top'
                    ? 'rotate-90'
                    : currentGuide.position === 'bottom'
                    ? '-rotate-90'
                    : ''
                }`}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

