import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartBar, CheckCircle, Flame, ListChecks, Note } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { Task, Habit, Note as NoteType } from '@/lib/types'

export function ProductivityStats() {
  const [tasks] = useKV<Task[]>('butler-tasks', [])
  const [habits] = useKV<Habit[]>('butler-habits', [])
  const [notes] = useKV<NoteType[]>('butler-notes', [])

  const completedTasks = (tasks || []).filter(t => t.completed).length
  const totalTasks = (tasks || []).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const getActiveStreaks = () => {
    return (habits || []).filter(habit => {
      if (habit.completedDates.length === 0) return false
      const today = new Date().toISOString().split('T')[0]
      const sortedDates = [...habit.completedDates].sort().reverse()
      return sortedDates[0] === today
    }).length
  }

  const activeStreaks = getActiveStreaks()
  const totalHabits = (habits || []).length

  const getWeeklyNotes = () => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return (notes || []).filter(note => note.createdAt >= weekAgo).length
  }

  const weeklyNotes = getWeeklyNotes()

  const stats = [
    {
      label: 'Tasks Completed',
      value: completedTasks,
      total: totalTasks,
      icon: CheckCircle,
      color: 'primary',
      percent: completionRate
    },
    {
      label: 'Active Streaks',
      value: activeStreaks,
      total: totalHabits,
      icon: Flame,
      color: 'accent',
      percent: totalHabits > 0 ? Math.round((activeStreaks / totalHabits) * 100) : 0
    },
    {
      label: 'Notes This Week',
      value: weeklyNotes,
      total: (notes || []).length,
      icon: Note,
      color: 'primary',
      percent: null
    }
  ]

  return (
    <Card className="border border-border/50 hover:border-primary/40 transition-all duration-300 card-pulse-gradient-hover">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30">
            <ChartBar className="text-primary" size={20} weight="duotone" />
          </div>
          <span>Your Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            const isAccent = stat.color === 'accent'
            
            return (
              <div
                key={idx}
                className={`p-5 rounded-lg border transition-all duration-300 hover:shadow-md card-gradient-hover card-pulse-dramatic-hover ${
                  isAccent
                    ? 'bg-accent/5 border-accent/30 hover:border-accent/50'
                    : 'bg-primary/5 border-primary/30 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isAccent
                      ? 'bg-accent/15 text-accent'
                      : 'bg-primary/15 text-primary'
                  }`}>
                    <Icon size={20} weight="duotone" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-semibold text-foreground">{stat.value}</span>
                    {stat.total > 0 && (
                      <span className="text-base text-muted-foreground">/ {stat.total}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {stat.label}
                  </p>
                  {stat.percent !== null && (
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isAccent ? 'bg-accent' : 'bg-primary'
                        }`}
                        style={{ width: `${stat.percent}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
