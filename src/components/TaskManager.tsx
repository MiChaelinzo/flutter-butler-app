import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ListChecks, Plus, Trash, Sparkle, Briefcase, Heart, Warning, Repeat, Palette } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Task } from '@/lib/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function TaskManager() {
  const [tasks, setTasks] = useKV<Task[]>('butler-tasks', [])
  const [newTaskText, setNewTaskText] = useState('')
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('work')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const addTask = async () => {
    if (!newTaskText.trim()) return

    setIsAnalyzing(true)
    try {
      const promptText = `Analyze this task and suggest: 1) Priority (high/medium/low) 2) Estimated minutes to complete. Task: "${newTaskText}". Respond with JSON: {"priority": "...", "estimatedMinutes": number}`
      const prompt = window.spark.llmPrompt([promptText], '')
      const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const analysis = JSON.parse(response)

      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText,
        completed: false,
        priority: analysis.priority || 'medium',
        category: newTaskCategory || 'work',
        estimatedMinutes: analysis.estimatedMinutes || 30,
        createdAt: Date.now()
      }

      setTasks((current) => [...(current || []), newTask])
      setNewTaskText('')
      setNewTaskCategory('work')
      toast.success('Task added with AI insights')
    } catch (error) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText,
        completed: false,
        priority: 'medium',
        category: newTaskCategory || 'work',
        createdAt: Date.now()
      }
      setTasks((current) => [...(current || []), newTask])
      setNewTaskText('')
      setNewTaskCategory('work')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const toggleTask = (id: string) => {
    setTasks((current) =>
      (current || []).map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks((current) => (current || []).filter((task) => task.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/30 text-destructive border-destructive/50 shadow-lg shadow-destructive/30'
      case 'medium':
        return 'bg-accent/30 text-accent border-accent/50 shadow-lg shadow-accent/30'
      case 'low':
        return 'bg-muted/60 text-muted-foreground border-white/20 shadow-lg'
      default:
        return 'bg-muted/60 text-muted-foreground border-white/20 shadow-lg'
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'work':
        return 'bg-primary/30 text-primary border-primary/50 shadow-lg shadow-primary/20'
      case 'personal':
        return 'bg-lime/30 text-lime border-lime/50 shadow-lg shadow-lime/20'
      case 'urgent':
        return 'bg-orange/30 text-orange border-orange/50 shadow-lg shadow-orange/20'
      case 'routine':
        return 'bg-secondary/30 text-secondary-foreground border-secondary/50 shadow-lg shadow-secondary/20'
      case 'creative':
        return 'bg-accent/30 text-accent border-accent/50 shadow-lg shadow-accent/20'
      default:
        return 'bg-muted/60 text-muted-foreground border-white/20 shadow-lg'
    }
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'work':
        return <Briefcase size={14} weight="bold" />
      case 'personal':
        return <Heart size={14} weight="bold" />
      case 'urgent':
        return <Warning size={14} weight="bold" />
      case 'routine':
        return <Repeat size={14} weight="bold" />
      case 'creative':
        return <Palette size={14} weight="bold" />
      default:
        return null
    }
  }

  const getTaskPulseClass = (priority: string, category?: string) => {
    const priorityClass = `task-priority-${priority}`
    const categoryClass = category ? `task-category-${category}` : ''
    return `${priorityClass} ${categoryClass}`.trim()
  }

  const incompleteTasks = (tasks || []).filter(t => !t.completed)
  const completedTasks = (tasks || []).filter(t => t.completed)

  return (
    <div className="space-y-6 border border-border/20 rounded-2xl p-6 bg-background/20 backdrop-blur-sm card-pulse-gradient-hover">
      <div className="flex items-center gap-4 pb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border border-white/10 shadow-xl shadow-primary/20">
          <ListChecks className="text-white drop-shadow-lg" size={28} weight="duotone" />
        </div>
        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Tasks</span>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex gap-3">
            <Input
              placeholder="Add a new task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              disabled={isAnalyzing}
              id="new-task-input"
              className="h-14 rounded-2xl border border-white/10 text-base sm:text-lg bg-background/50 backdrop-blur-xl font-semibold focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
            <Button 
              onClick={addTask} 
              disabled={!newTaskText.trim() || isAnalyzing} 
              size="icon"
              className="h-14 w-14 rounded-2xl shadow-xl shadow-primary/30 flex-shrink-0 bg-gradient-to-br from-primary via-accent to-primary hover:scale-110 transition-all border border-white/10"
            >
              {isAnalyzing ? <Sparkle className="animate-pulse text-white" size={24} weight="duotone" /> : <Plus className="text-white" size={24} weight="bold" />}
            </Button>
          </div>
          
          <Select value={newTaskCategory} onValueChange={(value) => setNewTaskCategory(value as Task['category'])}>
            <SelectTrigger className="w-full h-12 rounded-xl border border-white/10 bg-background/50 backdrop-blur-xl font-semibold">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-white/10 bg-card/95 backdrop-blur-xl">
              <SelectItem value="work" className="font-semibold">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} weight="bold" className="text-primary" />
                  Work
                </div>
              </SelectItem>
              <SelectItem value="personal" className="font-semibold">
                <div className="flex items-center gap-2">
                  <Heart size={16} weight="bold" className="text-lime" />
                  Personal
                </div>
              </SelectItem>
              <SelectItem value="urgent" className="font-semibold">
                <div className="flex items-center gap-2">
                  <Warning size={16} weight="bold" className="text-orange" />
                  Urgent
                </div>
              </SelectItem>
              <SelectItem value="routine" className="font-semibold">
                <div className="flex items-center gap-2">
                  <Repeat size={16} weight="bold" className="text-secondary-foreground" />
                  Routine
                </div>
              </SelectItem>
              <SelectItem value="creative" className="font-semibold">
                <div className="flex items-center gap-2">
                  <Palette size={16} weight="bold" className="text-accent" />
                  Creative
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[400px] sm:h-[450px] pr-4">
          <div className="space-y-4">
            {incompleteTasks.length === 0 && completedTasks.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-6 flex items-center justify-center border border-white/10 shadow-xl">
                  <ListChecks size={48} className="opacity-50 text-primary" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground">No tasks yet</p>
                <p className="text-base sm:text-lg mt-3 font-semibold">Add one above to get started!</p>
              </div>
            ) : (
              <>
                {incompleteTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-white/10 bg-background/40 backdrop-blur-xl hover:bg-primary/5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all group ${getTaskPulseClass(task.priority, task.category)}`}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1.5 h-7 w-7 rounded-xl border-2 border-white/20"
                      id={`task-${task.id}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg font-bold text-foreground leading-snug">{task.text}</p>
                      <div className="flex items-center gap-3 mt-4 flex-wrap">
                        <Badge variant="outline" className={`${getPriorityColor(task.priority)} font-bold text-sm sm:text-base rounded-xl px-4 py-1.5 border-2`}>
                          {task.priority}
                        </Badge>
                        {task.category && (
                          <Badge variant="outline" className={`${getCategoryColor(task.category)} font-bold text-sm sm:text-base rounded-xl px-4 py-1.5 border-2 flex items-center gap-1.5`}>
                            {getCategoryIcon(task.category)}
                            {task.category}
                          </Badge>
                        )}
                        {task.estimatedMinutes && (
                          <span className="text-sm sm:text-base text-muted-foreground font-bold flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
                            ~{task.estimatedMinutes} min
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      className="h-12 w-12 text-muted-foreground hover:text-destructive hover:bg-destructive/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 border border-transparent hover:border-destructive/30"
                    >
                      <Trash size={20} weight="bold" />
                    </Button>
                  </div>
                ))}

                {completedTasks.length > 0 && (
                  <>
                    {incompleteTasks.length > 0 && (
                      <div className="border-t border-white/10 pt-6 mt-6">
                        <p className="text-sm sm:text-base font-bold text-muted-foreground uppercase tracking-wider mb-5 flex items-center gap-4">
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                          Completed
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                        </p>
                      </div>
                    )}
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-white/5 bg-background/20 opacity-50 hover:opacity-70 transition-all group backdrop-blur-xl"
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1.5 h-7 w-7 rounded-xl border-2 border-white/20"
                          id={`task-${task.id}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-base sm:text-lg font-bold text-foreground line-through leading-snug">{task.text}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          className="h-12 w-12 text-muted-foreground hover:text-destructive hover:bg-destructive/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 border border-transparent hover:border-destructive/30"
                        >
                          <Trash size={20} weight="bold" />
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
