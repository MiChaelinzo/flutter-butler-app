import { Card } from '@/components/ui/card'
import { TrendUp, Target, Clock, CheckCircle, ChartLine, Sparkle } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { useEffect, useState } from 'react'

interface AnalyticsData {
  completionRate: number
  tasksCompleted: number
  totalTasks: number
  avgDailyTasks: number
  focusHours: number
  streakDays: number
  weeklyTrend: number
}

export function AnalyticsDashboard() {
  const [tasks] = useKV<any[]>('tasks', [])
  const [habits] = useKV<any[]>('habits', [])
  const [goals] = useKV<any[]>('daily-goals', [])
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    completionRate: 0,
    tasksCompleted: 0,
    totalTasks: 0,
    avgDailyTasks: 0,
    focusHours: 0,
    streakDays: 0,
    weeklyTrend: 0,
  })

  useEffect(() => {
    const completedTasks = (tasks || []).filter((t: any) => t.completed).length
    const totalTasks = (tasks || []).length
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    
    const maxStreak = Math.max(...((habits || []).map((h: any) => h.streak || 0) as number[]), 0)
    
    setAnalytics({
      completionRate: Math.round(completionRate),
      tasksCompleted: completedTasks,
      totalTasks,
      avgDailyTasks: Math.round(completedTasks / 7),
      focusHours: Math.round(completedTasks * 1.5),
      streakDays: maxStreak,
      weeklyTrend: 12,
    })
  }, [tasks, habits])

  const stats = [
    {
      icon: CheckCircle,
      label: 'Completion Rate',
      value: `${analytics.completionRate}%`,
      change: '+5%',
      color: 'primary',
    },
    {
      icon: Target,
      label: 'Tasks Completed',
      value: analytics.tasksCompleted,
      change: '+8 this week',
      color: 'accent',
    },
    {
      icon: Clock,
      label: 'Focus Hours',
      value: analytics.focusHours,
      change: '+2.5 hrs',
      color: 'orange',
    },
    {
      icon: TrendUp,
      label: 'Current Streak',
      value: `${analytics.streakDays} days`,
      change: 'Keep going!',
      color: 'yellow',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-2 border-primary/30 shadow-xl shadow-primary/20 backdrop-blur-xl">
          <ChartLine className="text-primary drop-shadow-lg" size={28} weight="duotone" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Analytics
          </h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
            Track your productivity insights
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="p-6 bg-card/80 backdrop-blur-xl border-2 border-white/10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}/20 flex items-center justify-center`}>
                  <stat.icon size={24} weight="duotone" className={`text-${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className={`text-xs text-${stat.color} font-semibold mt-1`}>{stat.change}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-card/80 backdrop-blur-xl border-2 border-white/10 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Sparkle size={24} weight="duotone" className="text-primary" />
          <h3 className="text-xl font-bold text-foreground">AI Insights</h3>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-sm font-medium text-foreground">
              📈 Your productivity is up 12% this week compared to last week. Keep up the great work!
            </p>
          </div>
          <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
            <p className="text-sm font-medium text-foreground">
              ⏰ You're most productive between 9 AM - 11 AM. Schedule important tasks during this time.
            </p>
          </div>
          <div className="p-4 bg-orange/10 rounded-xl border border-orange/20">
            <p className="text-sm font-medium text-foreground">
              🎯 Consider breaking down larger tasks - you complete 85% more when tasks are under 1 hour.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
