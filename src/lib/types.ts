export interface Task {
  id: string
  text: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category?: 'work' | 'personal' | 'urgent' | 'routine' | 'creative'
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

export interface Habit {
  id: string
  name: string
  completedDates: string[]
  createdAt: number
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: number
  updatedAt: number
}

export interface SmartSuggestion {
  id: string
  type: 'productivity' | 'habit' | 'task' | 'automation'
  title: string
  description: string
  action?: string
  dismissed: boolean
  createdAt: number
}
