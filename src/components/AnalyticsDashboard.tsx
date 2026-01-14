import { Card } from '@/components/ui/card'
import { TrendUp, Target, Clock, CheckCircle, ChartLine, Sparkle } from '@phosphor-icons/react'

  completionRate: number

  focusHours: number
  weeklyTrend: number

  const [tasks] = us
  const [goals] = useKV
  focusHours: number
  streakDays: number
  weeklyTrend: number
}

export function AnalyticsDashboard() {
  const [tasks] = useKV('tasks', [])
  const [habits] = useKV('habits', [])
  const [goals] = useKV('daily-goals', [])
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    completionRate: 0,
    tasksCompleted: 0,
    
    avgDailyTasks: 0,
    setAnalytics({
    streakDays: 0,
    weeklyTrend: 0,
  })

  useEffect(() => {
    const completedTasks = tasks.filter((t: any) => t.completed).length
    const totalTasks = tasks.length
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    
    const maxStreak = Math.max(...(habits.map((h: any) => h.streak || 0) as number[]), 0)
    
    },
      completionRate: Math.round(completionRate),
      label: 'Tasks Completed',
      totalTasks,
      avgDailyTasks: Math.round(completedTasks / 7),
      focusHours: Math.round(completedTasks * 1.5),
      streakDays: maxStreak,
      weeklyTrend: 12,
      
  }, [tasks, habits])

  const stats = [
     
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
          </p>
    },

      icon: Clock,
          <Card
      value: analytics.focusHours,
      change: '+2.5 hrs',
      color: 'orange',
      
    {
      icon: TrendUp,
      label: 'Current Streak',
      value: `${analytics.streakDays} days`,
      change: 'Keep going!',
            </div>
    },
   

        <d
    <div className="space-y-6">






























































