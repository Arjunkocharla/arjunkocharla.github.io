'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown, ChevronUp } from 'lucide-react'
import SkillWeb from './SkillWeb'
import ClickableTitle from './ClickableTitle'

const skillCategories = [
  {
    title: 'Languages',
    icon: '💻',
    skills: [
      { 
        name: 'C#', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Enterprise backend development with .NET Framework and .NET Core',
        projects: ['Production systems at TCS, CentrAlert'],
        usage: 'Built distributed alerting platform APIs at CentrAlert using .NET Core, processing real-time alerts across thousands of counties.'
      },
      { 
        name: 'Python', 
        experience: '5+ years',
        proficiency: 'Expert',
        description: 'Backend APIs, data processing, ML pipelines, and automation',
        projects: ['DCrypto', 'Resume Helper AI', 'ML Projects'],
        usage: 'Developed AI-powered resume optimization tool with Azure OpenAI integration and built financial data processing pipelines for DCrypto.'
      },
      { 
        name: 'C++', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'High-performance systems, low-latency algorithms, and memory optimization',
        projects: ['Matching Engine', 'Performance-critical systems'],
        usage: 'Built high-performance limit order book with lock-free data structures and custom memory pools for microsecond-level matching.'
      },
      { 
        name: 'JavaScript/TypeScript', 
        experience: '5+ years',
        proficiency: 'Expert',
        description: 'Full-stack development with Node.js, React, and modern frameworks',
        projects: ['All web projects'],
        usage: 'Developed full-stack applications with React/Next.js frontends and Node.js backends, including this interactive portfolio.'
      },
      { 
        name: 'SQL', 
        experience: '6+ years',
        proficiency: 'Expert',
        description: 'Complex queries, stored procedures, database optimization, and ETL',
        projects: ['All backend systems'],
        usage: 'Optimized database queries and designed schemas for high-volume systems at CentrAlert and TCS, reducing query times by 60%.'
      },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: '🔧',
    skills: [
      { 
        name: '.NET Core / ASP.NET Core', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'RESTful APIs, microservices, middleware, dependency injection',
        projects: ['CentrAlert platform', 'Enterprise systems'],
        usage: 'Architected high-throughput REST APIs and microservices for emergency alerting system, handling thousands of requests per second.'
      },
      { 
        name: 'Node.js', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'Scalable server-side applications, real-time systems, Express.js',
        projects: ['Web applications', 'API development'],
        usage: 'Built scalable Node.js APIs with Express.js for real-time portfolio tracking and data visualization in DCrypto.'
      },
      { 
        name: 'Django / Flask', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Python web frameworks for rapid API development and data services',
        projects: ['DCrypto', 'Resume Helper AI'],
        usage: 'Developed Flask APIs for financial data processing and Django backends for AI-powered resume analysis workflows.'
      },
      { 
        name: 'REST APIs / gRPC', 
        experience: '5+ years',
        proficiency: 'Expert',
        description: 'Designing and implementing high-performance API architectures',
        projects: ['All backend projects'],
        usage: 'Designed and implemented RESTful APIs for enterprise systems, focusing on performance, reliability, and scalability.'
      },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { 
        name: 'Azure', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'Functions, AKS, Event Hub, App Service, Key Vault, Storage',
        projects: ['CentrAlert cloud infrastructure', 'Resume Helper AI'],
        usage: 'Deployed distributed alerting platform on Azure using Functions, Event Hub, and AKS, ensuring 99.9% uptime.'
      },
      { 
        name: 'AWS', 
        experience: '2+ years',
        proficiency: 'Intermediate',
        description: 'EC2, RDS, S3, Lambda, CloudWatch, infrastructure automation',
        projects: ['DCrypto', 'ML deployments'],
        usage: 'Hosted DCrypto on AWS with EC2, RDS, and S3, implementing auto-scaling and monitoring with CloudWatch.'
      },
      { 
        name: 'Docker & Kubernetes', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'Containerization, orchestration, scaling, and deployment pipelines',
        projects: ['Production deployments', 'Microservices'],
        usage: 'Containerized microservices with Docker and orchestrated deployments on Kubernetes for scalable, resilient systems.'
      },
      { 
        name: 'CI/CD & Infrastructure', 
        experience: '4+ years',
        proficiency: 'Advanced',
        description: 'GitHub Actions, Terraform, infrastructure as code, automation',
        projects: ['All production systems'],
        usage: 'Automated deployments with GitHub Actions and managed infrastructure as code, reducing deployment time by 80%.'
      },
    ],
  },
  {
    title: 'Data & Messaging',
    icon: '📊',
    skills: [
      { 
        name: 'Databases', 
        experience: '6+ years',
        proficiency: 'Expert',
        description: 'SQL Server, PostgreSQL, MySQL, MongoDB, Redis, query optimization',
        projects: ['All backend systems'],
        usage: 'Designed and optimized database schemas for high-volume systems, reducing query latency by 60% through indexing and query tuning.'
      },
      { 
        name: 'Kafka / Event Hub', 
        experience: '2+ years',
        proficiency: 'Advanced',
        description: 'Event-driven architecture, stream processing, message queues',
        projects: ['CentrAlert event pipelines', 'Real-time systems'],
        usage: 'Built event-driven alerting pipelines using Azure Event Hub, processing millions of events per day with low latency.'
      },
      { 
        name: 'Caching & Search', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'Redis, Elasticsearch, distributed caching strategies',
        projects: ['Performance optimization', 'Search features'],
        usage: 'Implemented Redis caching layers to reduce database load by 70% and improve API response times for high-traffic endpoints.'
      },
    ],
  },
  {
    title: 'Systems & Architecture',
    icon: '🏗️',
    skills: [
      { 
        name: 'Distributed Systems', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Microservices, event-driven architecture, scalability patterns',
        projects: ['CentrAlert platform', 'Enterprise systems'],
        usage: 'Architected distributed alerting platform with microservices and event-driven patterns, scaling to handle millions of alerts.'
      },
      { 
        name: 'Performance & Optimization', 
        experience: '5+ years',
        proficiency: 'Expert',
        description: 'Multithreading, caching, low-latency design, profiling',
        projects: ['Matching Engine', 'High-throughput APIs'],
        usage: 'Optimized C++ matching engine for microsecond-level performance and improved API response times by 50% through profiling.'
      },
      { 
        name: 'Observability', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'Logging, monitoring, tracing, performance metrics',
        projects: ['Production systems'],
        usage: 'Implemented comprehensive logging and monitoring for production systems, enabling rapid issue detection and resolution.'
      },
    ],
  },
  {
    title: 'AI / LLMs',
    icon: '🤖',
    skills: [
      { 
        name: 'Azure OpenAI', 
        experience: '1+ years',
        proficiency: 'Advanced',
        description: 'LLM integration, embeddings, vector search, agentic workflows',
        projects: ['Resume Helper AI'],
        usage: 'Built agentic LLM workflows with Azure OpenAI for resume optimization, using embeddings and vector similarity for job-resume matching.'
      },
      { 
        name: 'NLP & ML', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Neural networks, NLP pipelines, text analysis, classification',
        projects: ['Resume Helper AI', 'Financial forecasting'],
        usage: 'Developed NLP pipelines for text analysis and built neural network models for financial forecasting with 85%+ accuracy.'
      },
      { 
        name: 'Data Analysis', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Statistical analysis, data visualization, insights generation',
        projects: ['Financial data analysis', 'ML research'],
        usage: 'Performed statistical analysis and data visualization for financial datasets, generating actionable insights for trading strategies.'
      },
    ],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isExpanded, setIsExpanded] = useState(false)

  // Flatten all skills for the web visualization (using experience years as level for visualization)
  const allSkills = skillCategories.flatMap((category) =>
    category.skills.map((skill) => {
      // Extract years from experience string (e.g., "3+ years" -> 3)
      const yearsMatch = skill.experience.match(/(\d+)\+/)
      const years = yearsMatch ? parseInt(yearsMatch[1]) : 3
      
      return {
        name: skill.name,
        level: Math.min(years * 15 + 50, 95), // Convert years to a visual level (50-95 range)
        category: category.title,
        usage: skill.usage || skill.description.split('.')[0] + '.', // Use provided usage or fallback to description
      }
    })
  )

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 section-morph"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            My <ClickableTitle className="gradient-text">Skills</ClickableTitle>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A map of the technologies I use day-to-day. Hover over the interactive web to explore,
            or expand the detailed skill cards below for more information.
          </p>
        </motion.div>

        {/* Interactive Skill Web */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-3"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            Interactive skill web · hover or tap the nodes to reveal skills and connections.
          </p>
          <SkillWeb skills={allSkills} />
        </motion.div>

        {/* Expandable Skill Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full glass p-4 rounded-xl flex items-center justify-between hover:bg-white/10 dark:hover:bg-white/5 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <h3 className="text-xl sm:text-2xl font-bold gradient-text">
                Detailed Skill Cards
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isExpanded ? 'Click to collapse' : 'Click to expand'}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <ChevronUp className="text-gray-600 dark:text-gray-400 group-hover:text-primary-400" size={24} />
              ) : (
                <ChevronDown className="text-gray-600 dark:text-gray-400 group-hover:text-primary-400" size={24} />
              )}
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {skillCategories.map((category, categoryIndex) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                      className="glass p-4 sm:p-6 md:p-8 rounded-2xl morph-section"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <span className="text-2xl sm:text-3xl">{category.icon}</span>
                        <h3 className="text-xl sm:text-2xl font-bold gradient-text">
                          {category.title}
                        </h3>
                      </div>
                      <div className="space-y-6">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                            className="group cursor-pointer"
                          >
                            <div className="glass p-4 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-all border border-transparent hover:border-primary-500/30">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <motion.h4
                                    className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors mb-1"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {skill.name}
                                  </motion.h4>
                                  <div className="flex items-center gap-2 flex-wrap mt-2">
                                    <span className="px-2 py-1 bg-primary-500/20 text-primary-300 dark:text-primary-200 text-xs font-semibold rounded-full border border-primary-500/30">
                                      {skill.proficiency}
                                    </span>
                                    <span className="px-2 py-1 bg-gray-200/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                                      {skill.experience}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                                {skill.description}
                              </p>
                              {skill.projects && skill.projects.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-white/10">
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Used in:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {skill.projects.map((project, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs px-2 py-0.5 bg-primary-500/10 text-primary-400 rounded"
                                      >
                                        {project}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

