import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ListChecks, Plus, Trash, Sparkle } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Task } from '@/lib/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'

export function TaskManager() {
  const [tasks, setTasks] = useKV<Task[]>('butler-tasks', [])
  const [newTaskText, setNewTaskText] = useState('')
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
        estimatedMinutes: analysis.estimatedMinutes || 30,
        createdAt: Date.now()
      }

      setTasks((current) => [...(current || []), newTask])
      setNewTaskText('')
      toast.success('Task added with AI insights')
    } catch (error) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText,
        completed: false,
        priority: 'medium',
        createdAt: Date.now()
      }
      setTasks((current) => [...(current || []), newTask])
      setNewTaskText('')
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
        return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'medium':
        return 'bg-accent/10 text-accent-foreground border-accent/20'
      case 'low':
        return 'bg-muted text-muted-foreground border-border'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const incompleteTasks = (tasks || []).filter(t => !t.completed)
  const completedTasks = (tasks || []).filter(t => t.completed)

  return (
    <Card className="shadow-sm border hover:shadow-md transition-all duration-200 bg-card">
      <CardHeader className="pb-5">
        <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-semibold">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
            <ListChecks className="text-primary" size={20} weight="duotone" />
          </div>
          Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-2.5">
          <Input
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            disabled={isAnalyzing}
            id="new-task-input"
            className="h-11 rounded-xl border text-sm sm:text-[15px]"
          />
          <Button 
            onClick={addTask} 
            disabled={!newTaskText.trim() || isAnalyzing} 
            size="icon"
            className="h-11 w-11 rounded-xl shadow-sm flex-shrink-0"
          >
            {isAnalyzing ? <Sparkle className="animate-pulse" size={18} weight="duotone" /> : <Plus size={18} weight="bold" />}
          </Button>
        </div>

        <ScrollArea className="h-[400px] sm:h-[450px] pr-3">
          <div className="space-y-2.5">
            {incompleteTasks.length === 0 && completedTasks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-muted mx-auto mb-4 flex items-center justify-center">
                  <ListChecks size={32} className="opacity-50" />
                </div>
                <p className="text-sm sm:text-[15px] font-semibold text-foreground">No tasks yet</p>
                <p className="text-xs sm:text-sm mt-1">Add one above to get started!</p>
              </div>
            ) : (
              <>
                {incompleteTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border bg-card hover:bg-primary/5 hover:border-primary/30 transition-all group"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-0.5 h-5 w-5 rounded-lg"
                      id={`task-${task.id}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-[15px] font-semibold text-foreground leading-snug">{task.text}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="outline" className={`${getPriorityColor(task.priority)} font-semibold text-[11px] sm:text-xs rounded-lg px-2 py-0.5`}>
                          {task.priority}
                        </Badge>
                        {task.estimatedMinutes && (
                          <span className="text-[11px] sm:text-xs text-muted-foreground font-medium flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                            ~{task.estimatedMinutes} min
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <Trash size={16} weight="bold" />
                    </Button>
                  </div>
                ))}

                {completedTasks.length > 0 && (
                  <>
                    {incompleteTasks.length > 0 && (
                      <div className="border-t pt-4 mt-4">
                        <p className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                          <div className="h-px flex-1 bg-border" />
                          Completed
                          <div className="h-px flex-1 bg-border" />
                        </p>
                      </div>
                    )}
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border bg-muted/30 opacity-60 hover:opacity-80 transition-opacity group"
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-0.5 h-5 w-5 rounded-lg"
                          id={`task-${task.id}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-[15px] font-semibold text-foreground line-through leading-snug">{task.text}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        >
                          <Trash size={16} weight="bold" />
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
