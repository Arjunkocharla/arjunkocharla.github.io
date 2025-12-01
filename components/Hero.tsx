'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import PortfolioGuide from './PortfolioGuide'
import InteractiveDemo from './InteractiveDemo'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                Hi, I'm{' '}
              </motion.span>
              <motion.span
                className="gradient-text inline-block cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: '0 0 20px rgba(14, 165, 233, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Nagarjuna Kocharla
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Software Engineer specializing in .NET, Python, distributed systems, and cloud-native platforms.
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              I build high-performance backend services, event-driven pipelines, and AI-powered tools using C#, .NET Core, Python, Kafka/Event Hub, SQL Server/PostgreSQL, Docker, Kubernetes, and Azure/AWS.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="https://github.com/Arjunkocharla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:bg-primary-500/20 transition-colors relative group"
                whileHover={{ scale: 1.2, rotate: 360, zIndex: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ rotate: { duration: 0.5 } }}
              >
                <Github size={24} />
                <motion.span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  initial={{ y: 5 }}
                  whileHover={{ y: 0 }}
                >
                  GitHub
                </motion.span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/nagarjuna-kocharla-7982b6162/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:bg-primary-500/20 transition-colors relative group"
                whileHover={{ scale: 1.2, rotate: -360, zIndex: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ rotate: { duration: 0.5 } }}
              >
                <Linkedin size={24} />
                <motion.span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  initial={{ y: 5 }}
                  whileHover={{ y: 0 }}
                >
                  LinkedIn
                </motion.span>
              </motion.a>
              <motion.a
                href="mailto:arjunkocharla98@gmail.com"
                className="p-3 glass rounded-full hover:bg-primary-500/20 transition-colors relative group"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0], zIndex: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ rotate: { duration: 0.5 } }}
              >
                <Mail size={24} />
                <motion.span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  initial={{ y: 5 }}
                  whileHover={{ y: 0 }}
                >
                  Email
                </motion.span>
              </motion.a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.a
                  href="/resumes/Nagarjuna_Kocharla_Resume_Updated.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold text-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.a>
                <motion.a
                  href="#projects"
                  className="px-8 py-4 glass rounded-lg font-semibold text-center hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-8 py-4 glass rounded-lg font-semibold text-center hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Demo */}
          <motion.div
            className="hidden md:flex items-center justify-center h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <InteractiveDemo />
          </motion.div>
        </div>

      </div>
    </section>
  )
}

