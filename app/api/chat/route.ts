import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/constants'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
      systemInstruction: CHATBOT_SYSTEM_PROMPT,
    })

    // Convert to Gemini format: "assistant" → "model", all prior messages as history
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))

    const lastMessage = messages[messages.length - 1].content

    const chat = model.startChat({ history })
    const result = await chat.sendMessage(lastMessage)
    const text = result.response.text()

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { message: 'Sorry, I am unable to respond right now. Please try again later.' },
      { status: 500 }
    )
  }
}
