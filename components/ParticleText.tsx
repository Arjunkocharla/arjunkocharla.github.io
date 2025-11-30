'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ParticleTextProps {
  text: string
  className?: string
}

export default function ParticleText({ text, className = '' }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Create particles
    const particles: Array<{
      x: number
      y: number
      targetX: number
      targetY: number
      vx: number
      vy: number
      size: number
    }> = []

    const fontSize = 60
    ctx.font = `bold ${fontSize}px Inter, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Create particle grid
    const cols = 30
    const rows = 10
    const cellWidth = canvas.width / cols
    const cellHeight = canvas.height / rows

    for (let i = 0; i < cols * rows; i++) {
      const x = (i % cols) * cellWidth + cellWidth / 2
      const y = Math.floor(i / cols) * cellHeight + cellHeight / 2
      particles.push({
        x,
        y,
        targetX: x,
        targetY: y,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1,
      })
    }

    let animationFrame: number
    let lastTime = 0

    function animate(currentTime: number) {
      if (!ctx) return

      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw text to get pixel data
      ctx.fillStyle = '#0ea5e9'
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Update particles
      particles.forEach((particle, i) => {
        const x = Math.floor(particle.x)
        const y = Math.floor(particle.y)
        const index = (y * canvas.width + x) * 4

        if (index >= 0 && index < data.length && data[index + 3] > 128) {
          // Particle is on text
          particle.targetX = x
          particle.targetY = y
        } else {
          // Particle is off text - move to random position
          particle.targetX = particle.x + (Math.random() - 0.5) * 2
          particle.targetY = particle.y + (Math.random() - 0.5) * 2
        }

        // Smooth movement
        particle.vx += (particle.targetX - particle.x) * 0.05
        particle.vy += (particle.targetY - particle.y) * 0.05
        particle.vx *= 0.9
        particle.vy *= 0.9

        particle.x += particle.vx
        particle.y += particle.vy

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(14, 165, 233, ${0.8})`
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [text, mounted])

  if (!mounted) {
    return <div className={className}>{text}</div>
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100px' }}
    />
  )
}

