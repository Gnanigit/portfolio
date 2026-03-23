export type Theme = 'dark-green' | 'light-green' | 'dark-purple' | 'light-purple'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface Skill {
  name: string
  icon: string
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools & DevOps' | 'Cloud & DevOps' | 'AI & ML' | 'Tools'
}

export interface Experience {
  id: string
  company: string
  role: string
  duration: string
  startDate: string
  endDate: string
  location: string
  description: string[]
  techStack: string[]
  current: boolean
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Stat {
  label: string
  value: number
  suffix: string
}
