import { QuickAction } from './types'

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'email-draft',
    title: 'Draft Email',
    description: 'Generate professional email',
    icon: 'envelope',
    prompt: 'Write a professional email about: '
  },
  {
    id: 'meeting-prep',
    title: 'Meeting Prep',
    description: 'Prepare for upcoming meeting',
    icon: 'users',
    prompt: 'Help me prepare for a meeting about: '
  },
  {
    id: 'summarize',
    title: 'Summarize',
    description: 'Create concise summary',
    icon: 'note',
    prompt: 'Summarize the following in 3-4 key points: '
  },
  {
    id: 'brainstorm',
    title: 'Brainstorm',
    description: 'Generate creative ideas',
    icon: 'lightbulb',
    prompt: 'Help me brainstorm ideas for: '
  },
  {
    id: 'task-breakdown',
    title: 'Break Down Task',
    description: 'Split into smaller steps',
    icon: 'list-checks',
    prompt: 'Break down this task into actionable steps: '
  },
  {
    id: 'quick-research',
    title: 'Quick Research',
    description: 'Get key information fast',
    icon: 'magnifying-glass',
    prompt: 'Provide a quick overview of: '
  }
]

export const AUTOMATION_TEMPLATES = [
  {
    id: 'morning-routine',
    name: 'Morning Routine',
    description: 'Daily briefing with weather, priorities, and motivation',
    steps: ['Check weather', 'Review top 3 priorities', 'Get motivational insight']
  },
  {
    id: 'meeting-prep',
    name: 'Pre-Meeting Checklist',
    description: 'Prepare agenda, goals, and key points',
    steps: ['Review meeting agenda', 'Identify key objectives', 'Prepare talking points']
  },
  {
    id: 'end-of-day',
    name: 'End of Day Review',
    description: 'Reflect on accomplishments and plan tomorrow',
    steps: ['List completed tasks', 'Note key learnings', 'Set tomorrow priorities']
  }
]
