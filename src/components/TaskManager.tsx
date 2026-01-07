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
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <ListChecks className="text-primary" size={24} weight="bold" />
          Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            disabled={isAnalyzing}
            id="new-task-input"
          />
          <Button onClick={addTask} disabled={!newTaskText.trim() || isAnalyzing} size="icon">
            {isAnalyzing ? <Sparkle className="animate-pulse" size={18} /> : <Plus size={18} />}
          </Button>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {incompleteTasks.length === 0 && completedTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ListChecks size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              <>
                {incompleteTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-0.5"
                      id={`task-${task.id}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{task.text}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        {task.estimatedMinutes && (
                          <span className="text-xs text-muted-foreground">
                            ~{task.estimatedMinutes} min
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ))}

                {completedTasks.length > 0 && (
                  <>
                    {incompleteTasks.length > 0 && (
                      <div className="border-t pt-3 mt-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Completed
                        </p>
                      </div>
                    )}
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50 opacity-60"
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-0.5"
                          id={`task-${task.id}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-through">{task.text}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash size={16} />
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
