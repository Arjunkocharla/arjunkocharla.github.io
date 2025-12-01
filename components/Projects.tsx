'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import FlipCard from './FlipCard'
import ClickableTitle from './ClickableTitle'

const projects = [
  {
    title: 'Resume Helper AI — Agentic Resume Platform',
    description:
      'AI-powered resume optimization tool using React, Node.js, Python, Azure Functions, and Azure OpenAI. Implements agentic LLM workflows, embeddings, vector similarity scoring, and multi-step rewriting to evaluate job–resume fit and autonomously refine content.',
    technologies: ['React', 'Node.js', 'Python', 'Azure Functions', 'Azure OpenAI', 'LLMs'],
    image: '📄',
    github: 'https://github.com/Arjunkocharla/resume-helper-ai',
    live: 'https://resumehelperapp.web.app/login',
  },
  {
    title: 'Custom Order Book Engine — C++',
    description:
      'High-performance limit order book written in modern C++, with cache-efficient data structures, custom memory pools, and lock-free ingestion using std::atomic and ring buffers. Designed for low-latency matching and microsecond-level performance measurement.',
    technologies: ['C++', 'Low-Latency', 'Lock-Free', 'Memory Optimization', 'Trading Systems'],
    image: '⚡',
    github: 'https://github.com/Arjunkocharla/matching_engine',
    live: '',
  },
  {
    title: 'DCrypto — Financial Asset Management',
    description:
      'Full-stack financial services web application for cryptocurrency portfolio tracking and management. Built with Python backend, real-time data processing, SQL Server/PostgreSQL for data persistence, and React frontend. Features real-time portfolio tracking, transaction history, and data visualization.',
    technologies: ['Python', 'React', 'SQL Server', 'PostgreSQL', 'Financial Tech', 'Backend'],
    image: '💰',
    github: 'https://github.com/Arjunkocharla/DCrypto',
    live: 'https://dcrpyto.com/login',
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

