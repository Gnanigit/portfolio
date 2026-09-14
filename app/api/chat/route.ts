import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/constants'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

let client: GoogleGenAI | null = null

function getVertexAIClient(): GoogleGenAI {
  if (client) return client

  const projectId = process.env.GOOGLE_CLOUD_PROJECT
  const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON

  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT environment variable is required')
  }

  // If credentials are provided as base64 JSON, write them to a temp file for ADC
  if (credentialsJson && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      const credentialsStr = Buffer.from(credentialsJson, 'base64').toString('utf-8')
      const tmpDir = join('/tmp', 'gcp')
      mkdirSync(tmpDir, { recursive: true })
      const credPath = join(tmpDir, 'credentials.json')
      writeFileSync(credPath, credentialsStr, { encoding: 'utf-8', mode: 0o600 })
      process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath
    } catch (e) {
      console.warn('Failed to write credentials file, relying on ADC:', e)
    }
  }

  client = new GoogleGenAI({
    vertexai: true,
    project: projectId,
    location,
  })

  return client
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const ai = getVertexAIClient()

    // Convert to Gemini format: "assistant" → "model", all prior messages as history
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))

    const lastMessage = messages[messages.length - 1].content

    // Create a chat session with history and system instruction
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: CHATBOT_SYSTEM_PROMPT,
      },
      history,
    })

    const result = await chat.sendMessage({ message: lastMessage })
    const text = result.text

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Vertex AI Gemini error:', error)
    return NextResponse.json(
      { message: 'Sorry, I am unable to respond right now. Please try again later.' },
      { status: 500 }
    )
  }
}
