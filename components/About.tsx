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
              Software Engineer with 6+ years of experience building high quality
              mobile and web applications and high-performance backend systems for multinational companies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I've worked across startups and enterprise environments, designing and delivering
              distributed systems, AI-powered tools, and interactive products that balance
              reliability, performance, and developer experience.
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
                { text: 'Design and build distributed backend systems and APIs that scale', emoji: '🕸️' },
                { text: 'Machine Learning and NLP for real-world products (chatbots, analytics, automation)', emoji: '🤖' },
                { text: 'Frontend development with React, Next.js, Angular, and Flutter', emoji: '⚛️' },
                { text: 'End-to-end solution design: from architecture to deployment', emoji: '🚀' },
                { text: 'Improving performance, reliability, and developer experience', emoji: '⚡' },
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

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass p-8 rounded-2xl morph-section mt-16 space-y-8"
        >
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h3 className="text-2xl font-bold">Experience Timeline</h3>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-400">
              Professional Experience
            </h4>
            <div className="space-y-4">
              {[
                {
                  role: 'Full Stack Software Engineer',
                  company: 'CentrAlert · Charlotte, NC',
                  period: '2023 – Present',
                  impact:
                    'Leading full-stack development of high-availability alerting and monitoring systems.',
                },
                {
                  role: 'Software Engineer Intern',
                  company: 'CAMP Systems International · Merrimack, NH',
                  period: '2022',
                  impact:
                    'Built features for aviation software, focusing on performance and data reliability.',
                },
                {
                  role: 'Software Engineer',
                  company: 'TCS · Hyderabad, India',
                  period: '2019 – 2022',
                  impact:
                    'Worked on large-scale enterprise systems and backend services in a core engineering role.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-300 text-xs font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {item.role}
                      </h4>
                      <span className="text-xs text-primary-400 font-semibold">
                        {item.period}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.company}
                    </div>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {item.impact}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Academic & Teaching Experience */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-400">
              Academic & Teaching Experience
            </h4>
            <div className="space-y-4">
              {[
                {
                  role: 'Graduate Assistant',
                  company: 'University of Massachusetts · Lowell, MA',
                  period: 'Oct 2021 – Jul 2022',
                  impact:
                    'Supported faculty and students using Python, SQL, Pandas, and NumPy for grading automation, data preprocessing, and debugging across graduate-level CS courses.',
                },
                {
                  role: 'Peer Tutor · Data Science',
                  company: 'University of Massachusetts · Lowell, MA',
                  period: 'Oct 2021 – Jan 2022',
                  impact:
                    'Tutored students in Python, Pandas, NumPy, SQL, and ML fundamentals (regression, classification, EDA) using Scikit-Learn and Jupyter.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-300 text-xs font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {item.role}
                      </h4>
                      <span className="text-xs text-primary-400 font-semibold">
                        {item.period}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.company}
                    </div>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {item.impact}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6 + index * 0.1,
                  rotate: { duration: 0.5 }
                }}
                className="glass p-6 rounded-xl text-center hover:bg-white/10 transition-colors morph-section cursor-pointer"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], y: -5 }}
                whileTap={{ scale: 0.95 }}
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

