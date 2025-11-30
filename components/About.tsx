'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Coffee, Rocket, Heart } from 'lucide-react'
import ClickableTitle from './ClickableTitle'

const features = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code that stands the test of time.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimizing for speed and efficiency in every project I build.',
  },
  {
    icon: Coffee,
    title: 'Problem Solving',
    description: 'Turning complex challenges into elegant solutions.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Love what I do, and it shows in every line of code.',
  },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="about"
      className="relative py-32 px-6 section-morph"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <ClickableTitle className="gradient-text">Me</ClickableTitle>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Software Engineer with extensive experience in building high quality mobile and web applications across multitude of frameworks and languages.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 rounded-2xl morph-section"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Software Engineer with extensive experience in building high quality
              mobile and web applications across multitude of frameworks and languages. Expert at developing backend
              systems for multinational companies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I've worked on projects ranging from small startups to enterprise
              applications, specializing in creating responsive, performant applications using modern technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass p-8 rounded-2xl morph-section"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-4">What I Do</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {[
                { text: 'Machine Learning Models and Natural Language Processing', emoji: '🤖' },
                { text: 'Building scalable backend systems and APIs', emoji: '🔧' },
                { text: 'Frontend development with React, Angular, Flutter', emoji: '⚛️' },
                { text: 'Full-stack development across multiple frameworks', emoji: '🚀' },
                { text: 'High performance application development', emoji: '⚡' },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start cursor-pointer group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <motion.span
                    className="text-primary-400 mr-2 text-xl"
                    animate={inView ? { rotate: [0, 180, 360] } : {}}
                    transition={{ delay: 0.4 + index * 0.1 + 0.3, duration: 0.5 }}
                  >
                    {item.emoji}
                  </motion.span>
                  <span className="group-hover:text-primary-300 transition-colors">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="glass p-6 rounded-xl text-center hover:bg-white/10 transition-colors morph-section cursor-pointer"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ rotate: { duration: 0.5 } }}
              >
                <div className="inline-block p-4 bg-primary-500/20 rounded-full mb-4">
                  <Icon size={32} className="text-primary-400" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

