'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Stat {
  label: string
  value: string
  icon: string
  detail: string
}

export default function InteractiveStatCard({ stat, index }: { stat: Stat; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 + index * 0.1 }}
      className="glass p-6 rounded-xl text-center hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
      whileHover={{ scale: 1.05, y: -5, rotate: [0, -2, 2, 0] }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        setClickCount(clickCount + 1)
        if (clickCount >= 4) {
          // Easter egg after 5 clicks
          alert(`🎉 You found an easter egg! ${stat.label} are awesome!`)
          setClickCount(0)
        }
      }}
    >
      {/* Ripple effect on click */}
      <AnimatePresence>
        {clickCount > 0 && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary-400/20"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="text-4xl mb-2"
        animate={isHovered ? { rotate: [0, 10, -10, 0], scale: 1.2 } : {}}
        transition={{ duration: 0.5 }}
      >
        {stat.icon}
      </motion.div>
      <motion.div
        className="text-3xl font-bold gradient-text mb-1"
        animate={isHovered ? { scale: 1.1 } : {}}
      >
        {stat.value}
      </motion.div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {stat.label}
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-primary-400 mt-2"
          >
            {stat.detail}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

