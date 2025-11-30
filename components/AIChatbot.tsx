'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatbotProps {
  resumeContext?: string
}

// Resume context - resume is available at /resumes/Nagarjuna_Kocharla_Resume_Updated.pdf
const RESUME_CONTEXT = `
Resume is available at: /resumes/Nagarjuna_Kocharla_Resume_Updated.pdf
You can reference this resume for detailed information about Arjun's experience, education, and projects.
Key highlights:
- 6+ years of software engineering experience
- Full Stack Developer with expertise in multiple technologies
- Experience with Machine Learning and AI
- Worked at multiple companies including CentrAlert, CAMP Systems, TCS
- Master's in Computer Science from UMASS Lowell
- Multiple projects including DCrypto, Resume Helper AI, Matching Engine
`

export default function AIChatbot({ resumeContext = RESUME_CONTEXT }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Show a subtle hint after a few seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        // Subtle pulse animation will be handled by CSS
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [hasInteracted, isOpen])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to answer questions about Arjun's skills, experience, and projects. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const defaultContext = `You are a helpful assistant representing Arjun Kocharla (Nagarjuna Kocharla), a Software Engineer with 6+ years of experience. 

Key Information:
- Software Engineer with 6+ years of experience building high performance applications
- Full Stack Developer with expertise in React, Next.js, TypeScript, Python, Flask, .NET, C#, C++
- Frontend: Flutter (90%), Angular (80%), JavaScript (60%), React (85%)
- Backend: C# (90%), C++ (80%), Python (80%), Node JS (65%)
- Machine Learning: Neural Networks (90%), NLP (85%), Data Analysis (85%)
- Experienced with Three.js for 3D web experiences
- Proficient in Docker, Kubernetes, Kafka for cloud infrastructure
- Strong in SQL and database management
- Work Experience: Full Stack Software Engineer at CentrAlert (2023-present), Software Engineer Intern at CAMP Systems (2022), Peer Tutor at UMASS Lowell (2021-2022), Assistant Systems Engineer at TCS (2019-2022)
- Education: Master's in Computer Science from UMASS Lowell (2021-2023), Bachelor's in Electronics and Communications from SNIST (2015-2019)
- Key Projects: DCrypto (Financial Asset Management), Resume Helper AI, Matching Engine (C++)
- Location: Charlotte, North Carolina
- Passionate about creating interactive web experiences and solving complex problems

${resumeContext ? `Additional Context:\n${resumeContext}` : ''}

Answer questions about Arjun's skills, experience, and capabilities in a friendly, professional manner. Keep responses concise but informative. For detailed information, reference the resume available at /resumes/Nagarjuna_Kocharla_Resume_Updated.pdf`

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Try API route first (works on Vercel)
      // Fallback to client-side responses if API fails
      let response: Response
      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: defaultContext,
              },
              ...messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
              {
                role: 'user',
                content: input,
              },
            ],
          }),
        })
      } catch (apiError) {
        // If API route fails, use fallback
        throw new Error('API unavailable')
      }

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message || 'I apologize, but I encountered an error.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        return
      }

      // If API returns error, fall through to fallback
      throw new Error('API error')
    } catch (apiError) {
      // Fallback: Client-side responses
      const getFallbackResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase()

        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
          return `Arjun is a Software Engineer with 6+ years of experience and expertise in:
• Frontend: React, Next.js, Flutter, Angular, JavaScript/TypeScript
• Backend: C#, C++, Python, Node.js
• Machine Learning: Neural Networks, NLP, Data Analysis
• Tools: Docker, Kubernetes, SQL, Git

He's passionate about creating interactive web experiences and solving complex problems. Would you like to know more about any specific technology?`
        }

        if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
          return `Arjun has worked on various projects including:
• DCrypto - Financial Asset Management Application
• Resume Helper AI - AI-powered resume optimization
• Matching Engine - High-performance C++ order matching system
• Machine Learning projects for financial forecasting

Check out the Projects section to see detailed examples! Would you like to know more about a specific project?`
        }

        if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
          return `Arjun is a Software Engineer with 6+ years of experience in both frontend and backend development. He specializes in creating responsive, performant web applications using modern technologies.

Current Role: Full Stack Software Engineer at CentrAlert (Charlotte, NC) since 2023
Previous Experience: 
- Software Engineer Intern at CAMP Systems International (2022)
- Peer Tutor in Data Science at UMASS Lowell (2021-2022)
- Assistant Systems Engineer at TCS, Hyderabad (2019-2022)

He's worked on projects ranging from small startups to enterprise applications, with a focus on creating beautiful, interactive user experiences.`
        }

        if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
          return `You can reach out to Arjun through:
• The contact form on this website
• Email: arjunkocharla98@gmail.com
• Phone: 973-975-8193
• Location: Charlotte, North Carolina
• LinkedIn: https://www.linkedin.com/in/nagarjuna-kocharla-7982b6162/
• GitHub: https://github.com/Arjunkocharla

He's always open to discussing new projects and opportunities!`
        }

        return `I'm here to help answer questions about Arjun's skills, experience, and projects. You can ask about:
• Technical skills and technologies
• Projects and work experience
• Background and expertise
• How to get in touch

What would you like to know?`
      }

        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const fallbackResponse = getFallbackResponse(input)
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fallbackResponse,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Please try again later, or feel free to reach out directly through the contact form!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            y: [0, -5, 0]
          }}
          transition={{
            scale: { duration: 0.3 },
            y: { duration: 2, repeat: Infinity, repeatDelay: 1 }
          }}
          onClick={() => {
            setIsOpen(true)
            setHasInteracted(true)
          }}
          className="fixed bottom-6 right-6 z-50 p-4 glass rounded-full shadow-lg hover:bg-primary-500/20 transition-colors group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="text-primary-400 group-hover:text-primary-300" size={28} />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {!hasInteracted && (
            <motion.div
              className="absolute -top-2 -right-2 px-2 py-1 bg-primary-500 text-white text-xs rounded-full whitespace-nowrap"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: [0, 1, 0], x: [10, 0, 10] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              Ask me anything!
            </motion.div>
          )}
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Ask Me Anything</h3>
                  <p className="text-xs text-gray-400">About Arjun's work</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-primary-500'
                        : 'bg-gradient-to-r from-primary-400 to-primary-600'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="text-white" size={16} />
                    ) : (
                      <Bot className="text-white" size={16} />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary-500/20 text-white'
                        : 'bg-white/5 text-gray-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                    <Bot className="text-white" size={16} />
                  </div>
                  <div className="bg-white/5 rounded-2xl px-4 py-2">
                    <Loader2 className="text-primary-400 animate-spin" size={16} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about skills, experience, projects..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 text-white placeholder-gray-400"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by AI • Ask about skills, projects, or experience
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

