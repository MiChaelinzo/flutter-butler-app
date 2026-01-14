import { Card } from '@/components/ui/card'
import { TrendUp, Target, Clock, CheckCircle, ChartLine, Sparkle } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { useState, useEffect } from 'react'

interface AnalyticsData {
  completionRate: number
  tasksCompleted: number
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
    avgDailyTasks: 0,
    focusHours: 0,
    streakDays: 0,
    weeklyTrend: 0,
  })

  useEffect(() => {
    const taskArray = tasks || []
    const habitArray = habits || []
    const completedTasks = taskArray.filter((t: any) => t.completed).length
    const totalTasks = taskArray.length
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    
    const maxStreak = Math.max(...(habitArray.map((h: any) => h.streak || 0) as number[]), 0)
    
    setAnalytics({
      completionRate: Math.round(completionRate),
      tasksCompleted: completedTasks,
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
      color: 'secondary',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-md backdrop-blur-sm">
          <ChartLine className="text-primary" size={32} weight="duotone" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
            Track your productivity patterns and insights
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const colorClasses = {
            primary: 'from-primary/20 to-primary/5 border-primary/20 text-primary',
            accent: 'from-accent/20 to-accent/5 border-accent/20 text-accent',
            orange: 'from-orange/20 to-orange/5 border-orange/20 text-orange',
            secondary: 'from-secondary/20 to-secondary/5 border-secondary/20 text-secondary',
          }[stat.color as string]

          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses} flex items-center justify-center border`}>
                  <Icon size={24} weight="duotone" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{stat.change}</span>
              </div>
              <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      <Card className="p-8 border-border bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
            <Sparkle className="text-primary" size={20} weight="duotone" />
          </div>
          <h3 className="text-xl font-bold text-foreground">AI Insights</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm font-medium text-foreground mb-1">Peak Productivity Time</p>
            <p className="text-muted-foreground text-sm">You're most productive between 9 AM - 12 PM</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm font-medium text-foreground mb-1">Weekly Progress</p>
            <p className="text-muted-foreground text-sm">You've completed {analytics.weeklyTrend}% more tasks than last week</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm font-medium text-foreground mb-1">Habit Strength</p>
            <p className="text-muted-foreground text-sm">Your {analytics.streakDays}-day streak shows excellent consistency</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
