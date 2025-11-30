'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import ParticleBackground from '@/components/ParticleBackground'
import PortfolioGuide from '@/components/PortfolioGuide'
import AIChatbot from '@/components/AIChatbot'
import InteractiveNavigator from '@/components/InteractiveNavigator'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navigation />
      <PortfolioGuide />
      <AIChatbot />
      <InteractiveNavigator />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}

