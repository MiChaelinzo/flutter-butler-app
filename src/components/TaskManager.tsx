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
        return 'bg-destructive/20 text-destructive border-destructive/40'
      case 'medium':
        return 'bg-accent/20 text-accent border-accent/40'
      case 'low':
        return 'bg-muted/60 text-muted-foreground border-border'
      default:
        return 'bg-muted/60 text-muted-foreground border-border'
    }
  }

  const incompleteTasks = (tasks || []).filter(t => !t.completed)
  const completedTasks = (tasks || []).filter(t => t.completed)

  return (
    <Card className="shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3.5 text-2xl sm:text-3xl font-bold">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/15 flex items-center justify-center border border-primary/40 shadow-lg shadow-primary/20">
            <ListChecks className="text-primary" size={24} weight="duotone" />
          </div>
          Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3">
          <Input
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            disabled={isAnalyzing}
            id="new-task-input"
            className="h-12 rounded-2xl border border-border/50 text-sm sm:text-base bg-muted/30 backdrop-blur-sm"
          />
          <Button 
            onClick={addTask} 
            disabled={!newTaskText.trim() || isAnalyzing} 
            size="icon"
            className="h-12 w-12 rounded-2xl shadow-lg flex-shrink-0 bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            {isAnalyzing ? <Sparkle className="animate-pulse" size={20} weight="duotone" /> : <Plus size={20} weight="bold" />}
          </Button>
        </div>

        <ScrollArea className="h-[400px] sm:h-[450px] pr-4">
          <div className="space-y-3">
            {incompleteTasks.length === 0 && completedTasks.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 mx-auto mb-5 flex items-center justify-center border border-border/30">
                  <ListChecks size={40} className="opacity-40" />
                </div>
                <p className="text-base sm:text-lg font-bold text-foreground">No tasks yet</p>
                <p className="text-sm sm:text-base mt-2 font-medium">Add one above to get started!</p>
              </div>
            ) : (
              <>
                {incompleteTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/40 hover:shadow-lg transition-all group"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1 h-6 w-6 rounded-lg border-2"
                      id={`task-${task.id}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-bold text-foreground leading-snug">{task.text}</p>
                      <div className="flex items-center gap-2.5 mt-3 flex-wrap">
                        <Badge variant="outline" className={`${getPriorityColor(task.priority)} font-bold text-xs sm:text-sm rounded-lg px-3 py-1 border-2`}>
                          {task.priority}
                        </Badge>
                        {task.estimatedMinutes && (
                          <span className="text-xs sm:text-sm text-muted-foreground font-bold flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                            ~{task.estimatedMinutes} min
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/15 rounded-xl opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                    >
                      <Trash size={18} weight="bold" />
                    </Button>
                  </div>
                ))}

                {completedTasks.length > 0 && (
                  <>
                    {incompleteTasks.length > 0 && (
                      <div className="border-t border-border/50 pt-5 mt-5">
                        <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-3">
                          <div className="h-px flex-1 bg-border/50" />
                          Completed
                          <div className="h-px flex-1 bg-border/50" />
                        </p>
                      </div>
                    )}
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl border border-border/30 bg-muted/20 opacity-60 hover:opacity-80 transition-all group"
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1 h-6 w-6 rounded-lg border-2"
                          id={`task-${task.id}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base font-bold text-foreground line-through leading-snug">{task.text}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/15 rounded-xl opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                        >
                          <Trash size={18} weight="bold" />
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
