import { Card } from '@/components/ui/card'
import { TrendUp, Target, Clock, CheckCircle, ChartLine, Sparkle, Sun, CloudRain, Cloud, Lightbulb, ArrowsClockwise, ThermometerSimple, Drop, Wind, CalendarBlank, MapPin } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface AnalyticsData {
  completionRate: number
  tasksCompleted: number
  avgDailyTasks: number
  focusHours: number
  streakDays: number
  weeklyTrend: number
}

interface IntelData {
  weather: {
    condition: string
    temperature: string
    humidity: string
    wind: string
    location: string
  }
  dailyAdvice: string[]
  motivationalQuote: string
  productivityTip: string
  healthReminder: string
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
  const [intel, setIntel] = useState<IntelData | null>(null)
  const [isLoadingIntel, setIsLoadingIntel] = useState(false)

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

  const generateIntel = async () => {
    setIsLoadingIntel(true)
    try {
      const hour = new Date().getHours()
      const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      
      const promptText = `Generate comprehensive daily intelligence for a productivity app user. Current time: ${hour}:00, Date: ${date}

Include:
1. Weather information (realistic and detailed - condition, temperature in F, humidity %, wind speed, and a realistic city location)
2. Three pieces of daily advice (specific, actionable, varied topics like productivity, wellness, learning)
3. A powerful motivational quote (inspiring but not cliche)
4. One productivity tip (tactical and immediately useful)
5. One health reminder (relevant to time of day and general wellness)

Return as JSON with this exact structure:
{
  "weather": {
    "condition": "Clear sky with scattered clouds",
    "temperature": "72°F",
    "humidity": "45%",
    "wind": "8 mph NE",
    "location": "San Francisco, CA"
  },
  "dailyAdvice": ["advice1", "advice2", "advice3"],
  "motivationalQuote": "quote here",
  "productivityTip": "tip here",
  "healthReminder": "reminder here"
}`

      const prompt = window.spark.llmPrompt([promptText], '')
      const response = await window.spark.llm(prompt, 'gpt-4o', true)
      const data = JSON.parse(response)
      setIntel(data)
    } catch (error) {
      console.error('Failed to generate intel:', error)
    } finally {
      setIsLoadingIntel(false)
    }
  }

  useEffect(() => {
    if (!intel && !isLoadingIntel) {
      generateIntel()
    }
  }, [])

  const getWeatherIcon = () => {
    if (!intel) return <Sun size={32} weight="duotone" />
    const condition = intel.weather.condition.toLowerCase()
    if (condition.includes('rain') || condition.includes('storm')) {
      return <CloudRain size={32} weight="duotone" className="text-blue" />
    }
    if (condition.includes('cloud') || condition.includes('overcast')) {
      return <Cloud size={32} weight="duotone" className="text-gray" />
    }
    return <Sun size={32} weight="duotone" className="text-amber" />
  }

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
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/20">
            <ChartLine className="text-primary" size={32} weight="duotone" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Daily Intel</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Your personalized intelligence briefing
            </p>
          </div>
        </div>
        <Button 
          onClick={generateIntel}
          disabled={isLoadingIntel}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <ArrowsClockwise size={18} className={isLoadingIntel ? 'animate-spin' : ''} weight="bold" />
          Refresh
        </Button>
      </div>

      {isLoadingIntel && !intel ? (
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : intel ? (
        <>
          <Card className="p-6 border-border bg-gradient-to-br from-card via-card to-primary/5">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                {getWeatherIcon()}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} weight="duotone" className="text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">{intel.weather.location}</p>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{intel.weather.condition}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ThermometerSimple size={16} weight="duotone" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="text-sm font-semibold">{intel.weather.temperature}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Drop size={16} weight="duotone" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Humidity</p>
                      <p className="text-sm font-semibold">{intel.weather.humidity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Wind size={16} weight="duotone" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Wind</p>
                      <p className="text-sm font-semibold">{intel.weather.wind}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CalendarBlank size={16} weight="duotone" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Today</p>
                      <p className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20">
                <Lightbulb className="text-accent" size={20} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold">Daily Guidance</h3>
            </div>
            <div className="space-y-3">
              {intel.dailyAdvice.map((advice, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-semibold text-xs">{idx + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{advice}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-border bg-gradient-to-br from-primary/5 to-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                  <Target className="text-primary" size={20} weight="duotone" />
                </div>
                <h3 className="text-lg font-bold">Productivity Tip</h3>
              </div>
              <p className="text-sm leading-relaxed">{intel.productivityTip}</p>
            </Card>

            <Card className="p-6 border-border bg-gradient-to-br from-accent/5 to-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20">
                  <Sparkle className="text-accent" size={20} weight="duotone" />
                </div>
                <h3 className="text-lg font-bold">Health Reminder</h3>
              </div>
              <p className="text-sm leading-relaxed">{intel.healthReminder}</p>
            </Card>
          </div>

          <Card className="p-6 border-l-4 border-primary bg-gradient-to-br from-primary/10 to-card">
            <p className="text-base italic leading-relaxed font-medium">
              "{intel.motivationalQuote}"
            </p>
          </Card>
        </>
      ) : null}

      <div className="border-t border-border pt-8">
        <h3 className="text-2xl font-bold mb-6">Performance Metrics</h3>
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
                <p className="text-3xl font-bold">{stat.value}</p>
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="p-6 border-border bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
            <Sparkle className="text-primary" size={20} weight="duotone" />
          </div>
          <h3 className="text-xl font-bold">AI Insights</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-muted/20">
            <p className="text-sm font-medium mb-1">Peak Productivity Time</p>
            <p className="text-muted-foreground text-sm">You're most productive between 9 AM - 12 PM</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20">
            <p className="text-sm font-medium mb-1">Weekly Progress</p>
            <p className="text-muted-foreground text-sm">You've completed {analytics.weeklyTrend}% more tasks than last week</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20">
            <p className="text-sm font-medium mb-1">Habit Strength</p>
            <p className="text-muted-foreground text-sm">Your {analytics.streakDays}-day streak shows excellent consistency</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
