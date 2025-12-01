import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY

    const lastUserMessage = messages[messages.length - 1]?.content || ''

    if (!apiKey) {
      // Fallback: Simple rule-based responses when no API key is configured
      return NextResponse.json({
        message: getFallbackResponse(lastUserMessage),
      })
    }

    // Use OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      console.error('OpenAI API error status:', response.status, await response.text())
      // Graceful fallback to rule-based responses
      return NextResponse.json({
        message: getFallbackResponse(lastUserMessage),
      })
    }

    const data = await response.json()
    return NextResponse.json({
      message: data.choices[0]?.message?.content || getFallbackResponse(lastUserMessage),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        // On any unexpected error, still fall back to rule-based responses
        message: getFallbackResponse(''),
      },
      { status: 500 }
    )
  }
}

// Fallback responses when OpenAI API is not configured
function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  // Low-latency / performance / high-throughput backend
  if (
    lowerMessage.includes('low latency') ||
    lowerMessage.includes('low-latency') ||
    lowerMessage.includes('latency') ||
    (lowerMessage.includes('high') && lowerMessage.includes('throughput')) ||
    (lowerMessage.includes('performance') && lowerMessage.includes('backend'))
  ) {
    return `Yes – Arjun has strong experience with low-latency, high-performance backend systems.

Key examples:
• Matching Engine (C++): Built a high-performance order matching engine for order book management, focused on efficient algorithms and fast execution.
• Enterprise Backends at TCS: Worked on large-scale enterprise systems where throughput, reliability, and response times mattered.
• Alerting and Monitoring at CentrAlert: Full Stack Software Engineer building high-availability systems for real-time alerting.

He’s comfortable thinking about performance, concurrency, and system design tradeoffs when building backend services.`
  }

  // Current role / where working
  if (
    lowerMessage.includes('current role') ||
    lowerMessage.includes('currently work') ||
    lowerMessage.includes('currently working') ||
    (lowerMessage.includes('where') && lowerMessage.includes('work'))
  ) {
    return `Arjun is currently working as a Full Stack Software Engineer at CentrAlert in Charlotte, NC (since 2023).

Previous experience:
• Software Engineer Intern at CAMP Systems International (2022)
• Graduate Assistant & Peer Tutor in Data Science at UMASS Lowell (2021–2022)
• Software Engineer at TCS in Hyderabad (2019–2022)

Would you like to know more about his current role at CentrAlert or previous experience?`
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    return `Arjun is a Full Stack Developer with expertise in:
• Frontend: React, Next.js, TypeScript, Three.js, Tailwind CSS
• Backend: Node.js, Python, Flask, .NET, C#
• Tools: Docker, Kubernetes, Kafka, SQL, Git

He's passionate about creating interactive web experiences and solving complex problems. Would you like to know more about any specific technology?`
  }

  // Projects / work done
  if (
    lowerMessage.includes('project') ||
    lowerMessage.includes('projects') ||
    lowerMessage.includes('worked on')
  ) {
    return `Arjun has worked on various projects including:
• Full-stack web applications
• 3D interactive dashboards
• Real-time applications
• Cloud infrastructure solutions

Check out the Projects section to see detailed examples! Would you like to know more about a specific type of project?`
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
• Email (check the contact section)
• Social media links in the navigation

He's always open to discussing new projects and opportunities!`
  }

  return `I'm here to help answer questions about Arjun's skills, experience, and projects. You can ask about:
• Technical skills and technologies
• Projects and work experience
• Background and expertise
• How to get in touch

What would you like to know?`
}

