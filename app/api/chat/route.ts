import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      // Fallback: Simple rule-based responses
      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1]?.content || ''),
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
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    return NextResponse.json({
      message: data.choices[0]?.message?.content || 'I apologize, but I encountered an error.',
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        message:
          "I'm having trouble connecting right now. Please try again later or use the contact form!",
      },
      { status: 500 }
    )
  }
}

// Fallback responses when OpenAI API is not configured
function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    return `Arjun is a Full Stack Developer with expertise in:
• Frontend: React, Next.js, TypeScript, Three.js, Tailwind CSS
• Backend: Node.js, Python, Flask, .NET, C#
• Tools: Docker, Kubernetes, Kafka, SQL, Git

He's passionate about creating interactive web experiences and solving complex problems. Would you like to know more about any specific technology?`
  }

  if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
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

