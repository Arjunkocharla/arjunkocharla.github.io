'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import FlipCard from './FlipCard'
import ClickableTitle from './ClickableTitle'

const projects = [
  {
    title: 'DCrypto - Financial Asset Management',
    description:
      'A Financial Services web application that lets users track and manage their cryptocurrency portfolio. Full-stack application with real-time portfolio tracking and visualization.',
    technologies: ['Python', 'Web Application', 'Financial Tech', 'Backend'],
    image: '💰',
    github: 'https://github.com/Arjunkocharla/DCrypto',
    live: 'https://dcrpyto.com/login',
  },
  {
    title: 'Resume Helper AI',
    description:
      'A web app to supercharge your job search. AI-powered resume optimization and job search assistance tool built with modern web technologies.',
    technologies: ['Python', 'JavaScript', 'AI/ML', 'Web App'],
    image: '📄',
    github: 'https://github.com/Arjunkocharla/resume-helper-ai',
    live: 'https://resumehelperapp.web.app/login',
  },
  {
    title: 'Matching Engine',
    description:
      'High-performance C++ matching engine for order book management. Efficient order matching system with optimized algorithms for financial trading applications.',
    technologies: ['C++', 'C', 'Trading Systems', 'Order Book'],
    image: '⚡',
    github: 'https://github.com/Arjunkocharla/matching_engine',
    live: '',
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 section-morph"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <ClickableTitle className="gradient-text">Projects</ClickableTitle>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of projects I've built, each with its own unique
            challenges and solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 50, rotateY: -15 },
                visible: { opacity: 1, y: 0, rotateY: 0 },
              }}
              whileHover={{ y: -10, z: 10 }}
              transition={{ duration: 0.5 }}
            >
              <FlipCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                github={project.github}
                live={project.live}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

