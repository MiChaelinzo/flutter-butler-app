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
    <Card className="shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3.5 text-2xl sm:text-3xl font-bold">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/15 flex items-center justify-center border border-primary/40 shadow-lg shadow-primary/20">
            <ChartBar className="text-primary" size={24} weight="duotone" />
          </div>
          Your Progress
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
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  isAccent
                    ? 'bg-gradient-to-br from-accent/15 to-accent/5 border-accent/30'
                    : 'bg-gradient-to-br from-primary/15 to-primary/5 border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                    isAccent
                      ? 'bg-accent/20 border border-accent/40'
                      : 'bg-primary/20 border border-primary/40'
                  }`}>
                    <Icon className={isAccent ? 'text-accent' : 'text-primary'} size={24} weight="duotone" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</span>
                    {stat.total > 0 && (
                      <span className="text-lg text-muted-foreground font-bold">/ {stat.total}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-bold uppercase tracking-wide mb-3">
                    {stat.label}
                  </p>
                  {stat.percent !== null && (
                    <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
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
