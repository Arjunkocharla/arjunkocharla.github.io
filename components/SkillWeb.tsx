'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number
  category: string
  x?: number
  y?: number
  vx?: number
  vy?: number
}

interface SkillWebProps {
  skills: Skill[]
}

export default function SkillWeb({ skills }: SkillWebProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize positions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) * 0.3

    skills.forEach((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      skill.x = centerX + Math.cos(angle) * radius
      skill.y = centerY + Math.sin(angle) * radius
      skill.vx = 0
      skill.vy = 0
    })

    let animationFrame: number

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      skills.forEach((skill1, i) => {
        skills.slice(i + 1).forEach((skill2) => {
          const dx = (skill1.x || 0) - (skill2.x || 0)
          const dy = (skill1.y || 0) - (skill2.y || 0)
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(skill1.x || 0, skill1.y || 0)
            ctx.lineTo(skill2.x || 0, skill2.y || 0)
            const opacity = (1 - distance / maxDistance) * 0.3
            ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      skills.forEach((skill) => {
        const isHovered = hoveredSkill?.name === skill.name
        const isSelected = selectedSkill?.name === skill.name
        const size = isHovered ? 12 : isSelected ? 10 : 8

        // Glow effect
        if (isHovered || isSelected) {
          ctx.beginPath()
          ctx.arc(skill.x || 0, skill.y || 0, size + 5, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            skill.x || 0,
            skill.y || 0,
            size,
            skill.x || 0,
            skill.y || 0,
            size + 5
          )
          gradient.addColorStop(0, 'rgba(14, 165, 233, 0.8)')
          gradient.addColorStop(1, 'rgba(14, 165, 233, 0)')
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Node
        ctx.beginPath()
        ctx.arc(skill.x || 0, skill.y || 0, size, 0, Math.PI * 2)
        const nodeGradient = ctx.createRadialGradient(
          skill.x || 0,
          skill.y || 0,
          0,
          skill.x || 0,
          skill.y || 0,
          size
        )
        nodeGradient.addColorStop(0, '#38bdf8')
        nodeGradient.addColorStop(1, '#0ea5e9')
        ctx.fillStyle = nodeGradient
        ctx.fill()

        // Label
        if (isHovered || isSelected) {
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 12px Inter, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'bottom'
          ctx.fillText(skill.name, skill.x || 0, (skill.y || 0) - size - 8)
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasInteracted) {
        setHasInteracted(true)
      }
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let found = false
      skills.forEach((skill) => {
        const dx = x - (skill.x || 0)
        const dy = y - (skill.y || 0)
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 20 && !found) {
          setHoveredSkill(skill)
          found = true
        }
      })

      if (!found) {
        setHoveredSkill(null)
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!hasInteracted) {
        setHasInteracted(true)
      }
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      skills.forEach((skill) => {
        const dx = x - (skill.x || 0)
        const dy = y - (skill.y || 0)
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 20) {
          setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)
        }
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [skills, hoveredSkill, selectedSkill, hasInteracted])

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] glass rounded-2xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
      />
      {!hasInteracted && !selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-xs sm:text-sm text-gray-100 border border-white/10">
            Hover or tap the nodes to explore my skills.
          </div>
          <motion.div
            className="mt-3 flex items-center gap-2 text-[11px] sm:text-xs text-gray-300"
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Interactive skill web</span>
          </motion.div>
        </motion.div>
      )}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass px-6 py-4 rounded-lg max-w-md"
        >
          <h3 className="text-xl font-bold text-center mb-2 gradient-text">
            {selectedSkill.name}
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
            Click on other skills to explore connections
          </p>
        </motion.div>
      )}
    </div>
  )
}

