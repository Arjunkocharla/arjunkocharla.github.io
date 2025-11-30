'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'

interface FlipCardProps {
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  live: string
  index: number
}

export default function FlipCard({
  title,
  description,
  technologies,
  image,
  github,
  live,
  index,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="h-[400px] perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
            <motion.div
              className="glass h-full rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-500"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            <motion.div
              className="text-7xl mb-6 relative z-10"
              animate={{ 
                rotate: isFlipped ? 180 : 0,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 0.6 },
                scale: { duration: 2, repeat: Infinity, repeatDelay: 1 }
              }}
              whileHover={{ 
                rotate: [0, 10, -10, 0],
                scale: 1.2,
              }}
            >
              {image}
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
            <motion.div
              className="mt-4 px-4 py-2 glass rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Click to explore →
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <motion.div
            className="glass h-full rounded-2xl p-6 flex flex-col cursor-pointer hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-5xl mb-4 text-center">{image}</div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed flex-1">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 dark:text-primary-200 text-xs rounded-full border border-primary-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              {github && (
                <motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  <span className="text-sm">Code</span>
                </motion.a>
              )}
              {live && (
                <motion.a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={20} />
                  <span className="text-sm">Live</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

