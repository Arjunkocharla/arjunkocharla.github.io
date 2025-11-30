'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap, Heart, Star } from 'lucide-react'

// Floating interactive particles
export function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-primary-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// Click to reveal component
export function ClickToReveal({ children, revealText }: { children: React.ReactNode; revealText: string }) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  return (
    <motion.div
      onClick={() => {
        setClickCount(clickCount + 1)
        if (clickCount >= 2) {
          setIsRevealed(true)
        }
      }}
      className="relative cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {!isRevealed ? (
        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          {children}
          {clickCount < 2 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: clickCount > 0 ? 1 : 0 }}
            >
              <span className="text-xs text-white">Click {3 - clickCount} more times to reveal</span>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 glass rounded-lg"
        >
          <p className="text-sm">{revealText}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Interactive cursor follower
export function InteractiveCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
      animate={{
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <div className="w-4 h-4 rounded-full bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  )
}

// Easter egg component
export function EasterEgg({ triggerCount = 5 }: { triggerCount?: number }) {
  const [count, setCount] = useState(0)
  const [showEgg, setShowEgg] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'k' || e.key === 'K') {
        setCount(count + 1)
        if (count + 1 >= triggerCount) {
          setShowEgg(true)
          setTimeout(() => setShowEgg(false), 3000)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [count, triggerCount])

  return (
    <AnimatePresence>
      {showEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="text-6xl">🎉</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

