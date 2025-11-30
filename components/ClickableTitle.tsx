'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ClickableTitleProps {
  children: React.ReactNode
  className?: string
}

export default function ClickableTitle({ children, className = '' }: ClickableTitleProps) {
  const [clickCount, setClickCount] = useState(0)

  return (
    <motion.div
      className={`inline-block cursor-pointer ${className}`}
      onClick={() => setClickCount(clickCount + 1)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        clickCount > 0
          ? {
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }
          : {}
      }
      transition={{ duration: 0.5 }}
    >
      {children}
      {clickCount > 5 && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-2 text-2xl"
        >
          🎉
        </motion.span>
      )}
    </motion.div>
  )
}

