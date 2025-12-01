'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SkillWeb from './SkillWeb'
import ClickableTitle from './ClickableTitle'

const skillCategories = [
  {
    title: 'Frontend Developer',
    icon: '⚛️',
    skills: [
      { 
        name: 'Flutter', 
        experience: '3+ years',
        proficiency: 'Expert',
        description: 'Built cross-platform mobile applications with complex state management',
        projects: ['Multiple production apps']
      },
      { 
        name: 'React', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Developed interactive web applications with modern React patterns',
        projects: ['DCrypto', 'Resume Helper AI', 'This Portfolio']
      },
      { 
        name: 'Angular', 
        experience: '2+ years',
        proficiency: 'Advanced',
        description: 'Built enterprise-scale applications with TypeScript and RxJS',
        projects: ['Enterprise solutions']
      },
      { 
        name: 'JavaScript/TypeScript', 
        experience: '5+ years',
        proficiency: 'Expert',
        description: 'Core language expertise across multiple frameworks and environments',
        projects: ['All web projects']
      },
    ],
  },
  {
    title: 'Backend Developer',
    icon: '🔧',
    skills: [
      { 
        name: 'C#', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Enterprise backend development with .NET framework and Core',
        projects: ['Production systems at TCS, CentrAlert']
      },
      { 
        name: 'Python', 
        experience: '5+ years',
        proficiency: 'Expert',
        description: 'Backend APIs, data processing, and machine learning applications',
        projects: ['DCrypto', 'Resume Helper AI', 'ML Projects']
      },
      { 
        name: 'C++', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'High-performance systems and algorithmic solutions',
        projects: ['Matching Engine', 'Performance-critical systems']
      },
      { 
        name: 'Node.js', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'Scalable server-side applications and real-time systems',
        projects: ['Web applications', 'API development']
      },
    ],
  },
  {
    title: 'Machine Learning & AI',
    icon: '🤖',
    skills: [
      { 
        name: 'Neural Networks', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Deep learning models for prediction and classification tasks',
        projects: ['Bitcoin Price Forecasting', 'Financial Analysis']
      },
      { 
        name: 'Natural Language Processing', 
        experience: '3+ years',
        proficiency: 'Advanced',
        description: 'NLP models for chatbots and text analysis applications',
        projects: ['Resume Helper AI', 'Chatbot systems']
      },
      { 
        name: 'Data Analysis', 
        experience: '4+ years',
        proficiency: 'Expert',
        description: 'Statistical analysis, data visualization, and insights generation',
        projects: ['Financial data analysis', 'ML research projects']
      },
    ],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
            or browse the detailed skill cards below.
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

        {/* Skill Cards with Experience & Proficiency */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
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
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="glass p-4 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-primary-500/30">
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
      </div>
    </section>
  )
}

