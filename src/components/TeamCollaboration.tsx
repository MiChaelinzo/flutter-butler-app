import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, ShareNetwork, Plus, CheckCircle, Clock } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

interface SharedTask {
  id: string
  title: string
  assignedTo: string
  status: 'pending' | 'in-progress' | 'completed'
  sharedBy: string
}

export function TeamCollaboration() {
  const [sharedTasks, setSharedTasks] = useKV<SharedTask[]>('shared-tasks', [])
  const [newTask, setNewTask] = useState('')
  const [assignee, setAssignee] = useState('')

  const handleAddTask = () => {
    if (!newTask.trim() || !assignee.trim()) {
      toast.error('Please enter both task and assignee')
      return
    }

    const task: SharedTask = {
      id: Date.now().toString(),
      title: newTask,
      assignedTo: assignee,
      status: 'pending',
      sharedBy: 'You',
    }

    setSharedTasks((current) => [...(current || []), task])
    setNewTask('')
    setAssignee('')
    toast.success('Task shared with team!')
  }

  const handleStatusUpdate = (id: string) => {
    setSharedTasks((current) =>
      (current || []).map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === 'pending'
                  ? 'in-progress'
                  : task.status === 'in-progress'
                  ? 'completed'
                  : 'pending',
            }
          : task
      )
    )
    toast.success('Status updated!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-2 border-accent/30 shadow-xl shadow-accent/20 backdrop-blur-xl">
          <Users className="text-accent drop-shadow-lg" size={28} weight="duotone" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Team Collaboration
          </h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
            Share tasks and coordinate with your team
          </p>
        </div>
      </div>

      <Card className="p-6 bg-card/80 backdrop-blur-xl border-2 border-white/10 shadow-xl">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <ShareNetwork size={20} weight="duotone" className="text-accent" />
          Share New Task
        </h3>
        <div className="space-y-3">
          <Input
            placeholder="Task description..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="bg-background/50"
          />
          <Input
            placeholder="Assign to (name or email)..."
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="bg-background/50"
          />
          <Button
            onClick={handleAddTask}
            className="w-full gap-2 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
          >
            <Plus size={20} weight="bold" />
            Share Task
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-card/80 backdrop-blur-xl border-2 border-white/10 shadow-xl">
        <h3 className="text-lg font-bold text-foreground mb-4">Shared Tasks</h3>
        {(sharedTasks || []).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users size={48} weight="duotone" className="mx-auto mb-3 opacity-50" />
            <p className="font-medium">No shared tasks yet</p>
            <p className="text-sm mt-1">Share tasks with your team to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(sharedTasks || []).map((task) => (
              <div
                key={task.id}
                className="p-4 bg-background/50 rounded-xl border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{task.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Assigned to: <span className="text-accent font-medium">{task.assignedTo}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Shared by {task.sharedBy}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={task.status === 'completed' ? 'default' : 'outline'}
                    onClick={() => handleStatusUpdate(task.id)}
                    className="gap-2"
                  >
                    {task.status === 'completed' && <CheckCircle size={16} weight="fill" />}
                    {task.status === 'in-progress' && <Clock size={16} weight="duotone" />}
                    {task.status === 'completed'
                      ? 'Done'
                      : task.status === 'in-progress'
                      ? 'In Progress'
                      : 'Start'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
