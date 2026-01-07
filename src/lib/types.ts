export interface Task {
  id: string
  text: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  estimatedMinutes?: number
  createdAt: number
}

export interface Reminder {
  id: string
  text: string
  time: string
  completed: boolean
  createdAt: number
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  prompt: string
}

export interface Automation {
  id: string
  name: string
  description: string
  steps: string[]
  enabled: boolean
  lastRun?: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}
