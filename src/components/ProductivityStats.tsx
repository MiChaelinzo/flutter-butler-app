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
    <Card className="shadow-2xl border-2 border-white/10 hover:shadow-accent/30 transition-all duration-300 bg-card backdrop-blur-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 pointer-events-none opacity-50" />
      <CardHeader className="pb-6 relative">
        <CardTitle className="flex items-center gap-4 text-3xl sm:text-4xl font-bold">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/40 to-primary/40 flex items-center justify-center border-2 border-white/20 shadow-2xl shadow-accent/30">
            <ChartBar className="text-white drop-shadow-lg" size={28} weight="duotone" />
          </div>
          <span className="bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">Your Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            const isAccent = stat.color === 'accent'
            
            return (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 relative overflow-hidden backdrop-blur-xl ${
                  isAccent
                    ? 'bg-gradient-to-br from-accent/25 to-accent/10 border-accent/30 hover:border-accent/50 hover:shadow-accent/30'
                    : 'bg-gradient-to-br from-primary/25 to-primary/10 border-primary/30 hover:border-primary/50 hover:shadow-primary/30'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between mb-5 relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border-2 ${
                    isAccent
                      ? 'bg-accent/30 border-accent/50 shadow-accent/20'
                      : 'bg-primary/30 border-primary/50 shadow-primary/20'
                  }`}>
                    <Icon className={`${isAccent ? 'text-accent' : 'text-primary'} drop-shadow-lg`} size={28} weight="duotone" />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-baseline gap-2.5 mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-foreground drop-shadow-lg">{stat.value}</span>
                    {stat.total > 0 && (
                      <span className="text-xl text-muted-foreground font-bold">/ {stat.total}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-bold uppercase tracking-wide mb-4">
                    {stat.label}
                  </p>
                  {stat.percent !== null && (
                    <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden border border-white/10">
                      <div
                        className={`h-full rounded-full transition-all duration-700 shadow-lg ${
                          isAccent ? 'bg-gradient-to-r from-accent to-accent/80 shadow-accent/50' : 'bg-gradient-to-r from-primary to-primary/80 shadow-primary/50'
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
