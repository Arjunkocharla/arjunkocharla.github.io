'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Zap, Rocket, Sparkles, MousePointerClick } from 'lucide-react'

interface DemoItem {
  icon: string
  title: string
  description: string
  color: string
}

const demoItems: DemoItem[] = [
  {
    icon: '💼',
    title: '6+ Years Experience',
    description: 'Building high performance applications',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: '🚀',
    title: '10+ Projects',
    description: 'From startups to enterprise solutions',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: '🏢',
    title: '3+ Companies',
    description: 'Worked with multinational companies',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: '⚡',
    title: 'Full Stack',
    description: 'Frontend, Backend & Machine Learning',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: '🎯',
    title: 'Expert Developer',
    description: 'Expert at backend systems & ML models',
    color: 'from-pink-400 to-rose-500',
  },
]

export default function InteractiveDemo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % demoItems.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    setClickCount(clickCount + 1)
    setActiveIndex((activeIndex + 1) % demoItems.length)
    
    if (clickCount >= 9) {
      setShowEasterEgg(true)
      setTimeout(() => setShowEasterEgg(false), 3000)
      setClickCount(0)
    }
  }

  const currentItem = demoItems[activeIndex]

  return (
    <div className="relative w-full h-full glass rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden cursor-pointer group">
      {/* Background gradient that changes */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentItem.color} opacity-10`}
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Click to interact hint */}
      <motion.div
        className="absolute top-4 right-4 text-xs text-gray-400 flex items-center gap-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MousePointerClick size={14} />
        <span>Click me!</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        onClick={handleClick}
        className="relative z-10 text-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 90 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <motion.div
              className="text-7xl mb-4"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              {currentItem.icon}
            </motion.div>
            <h3
              className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r ${currentItem.color} bg-clip-text text-transparent`}
            >
              {currentItem.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
              {currentItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Progress indicators */}
      <div className="absolute bottom-6 flex gap-2">
        {demoItems.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex
                ? 'w-8 bg-primary-400'
                : 'w-2 bg-gray-400 dark:bg-gray-600'
            }`}
            animate={
              index === activeIndex
                ? { scale: [1, 1.2, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>

      {/* Easter egg */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl z-20"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 1 },
                scale: { duration: 0.5, repeat: Infinity },
              }}
              className="text-6xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive particles on hover */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

