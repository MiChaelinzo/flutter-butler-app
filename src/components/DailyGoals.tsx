import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Target, Plus, CheckCircle, Circle, Sparkle, TrendUp } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface DailyGoal {
  id: string
  text: string
  completed: boolean
  date: string
  createdAt: number
}

export function DailyGoals() {
  const [goals, setGoals] = useKV<DailyGoal[]>('butler-daily-goals', [])
  const [newGoalText, setNewGoalText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const todayGoals = (goals || []).filter((g) => g.date === today)

  const addGoal = () => {
    if (!newGoalText.trim() || todayGoals.length >= 3) {
      if (todayGoals.length >= 3) {
        toast.error('Maximum 3 daily goals')
      }
      return
    }

    const newGoal: DailyGoal = {
      id: Date.now().toString(),
      text: newGoalText,
      completed: false,
      date: today,
      createdAt: Date.now(),
    }

    setGoals((current) => [...(current || []), newGoal])
    setNewGoalText('')
    toast.success('Goal added to today')
  }

  const toggleGoal = (id: string) => {
    setGoals((current) =>
      (current || []).map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    )
  }

  const getWeeklyStats = () => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const weekStart = sevenDaysAgo.toISOString().split('T')[0]

    const weekGoals = (goals || []).filter((g) => g.date >= weekStart)
    const completed = weekGoals.filter((g) => g.completed).length
    const total = weekGoals.length

    return { completed, total, rate: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }

  const generateInsight = async () => {
    setIsAnalyzing(true)
    try {
      const stats = getWeeklyStats()
      const recentGoals = (goals || [])
        .slice(-10)
        .map((g) => `${g.completed ? '✓' : '○'} ${g.text}`)
        .join(', ')

      const promptText = `Based on these recent goals and completion rate of ${stats.rate}%: ${recentGoals}. Provide one encouraging, actionable insight in 1-2 sentences to help improve productivity.`

      const prompt = window.spark.llmPrompt([promptText], '')
      const response = await window.spark.llm(prompt, 'gpt-4o-mini')

      toast.success('AI Insight', {
        description: response,
        duration: 8000,
      })
    } catch (error) {
      console.error('Failed to generate insight:', error)
      toast.error('Could not generate insight')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const completedToday = todayGoals.filter((g) => g.completed).length
  const progressPercent = todayGoals.length > 0 ? (completedToday / todayGoals.length) * 100 : 0
  const weekStats = getWeeklyStats()

  return (
    <div className="space-y-6 border border-border/20 rounded-2xl p-6 bg-background/20 backdrop-blur-sm card-pulse-gradient-hover">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-4 text-3xl sm:text-4xl font-bold">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border border-white/10 shadow-xl shadow-primary/20">
            <Target className="text-white drop-shadow-lg" size={28} weight="duotone" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Daily Goals
          </span>
        </div>
        <Button
          onClick={generateInsight}
          disabled={isAnalyzing || (goals || []).length < 3}
          type="button"
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-2xl border bg-background/50 hover:bg-primary/20 hover:border-primary/50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <Sparkle className="animate-pulse text-primary" size={24} weight="duotone" />
          ) : (
            <TrendUp className="text-primary" size={24} weight="duotone" />
          )}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-foreground">
              Today's Progress
            </span>
            <span className="text-base font-bold text-primary">
              {completedToday} / {todayGoals.length}
            </span>
          </div>
          <Progress value={progressPercent} className="h-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-white/10 shadow-lg rounded-xl p-5 text-center card-pulse-dramatic-hover">
            <div className="text-3xl font-bold text-primary mb-2">{weekStats.rate}%</div>
            <p className="text-xs text-foreground font-bold">Weekly Completion</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-white/10 shadow-lg rounded-xl p-5 text-center card-pulse-dramatic-hover">
            <div className="text-3xl font-bold text-accent mb-2">{weekStats.completed}</div>
            <p className="text-xs text-foreground font-bold">Goals This Week</p>
          </div>
        </div>

        {todayGoals.length < 3 && (
          <div className="flex gap-3">
            <Input
              placeholder="Add a goal for today..."
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addGoal()}
              id="new-goal-input"
              className="h-14 rounded-2xl border text-base bg-background/50 backdrop-blur-xl font-semibold focus:border-primary/50 focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              onClick={addGoal}
              disabled={!newGoalText.trim()}
              type="button"
              size="icon"
              className="h-14 w-14 rounded-2xl shadow-xl shadow-primary/30 flex-shrink-0 bg-gradient-to-br from-primary via-accent to-primary hover:scale-110 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              <Plus size={24} weight="bold" />
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {todayGoals.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-5 flex items-center justify-center border border-white/10 shadow-xl">
                <Target size={40} className="text-primary opacity-50" weight="duotone" />
              </div>
              <p className="text-lg font-bold text-foreground">No goals set for today</p>
              <p className="text-base font-semibold mt-2">Add 1-3 goals to focus on</p>
            </div>
          ) : (
            todayGoals.map((goal) => (
              <button
                key={goal.id}
                type="button"
                className="flex items-center gap-4 p-5 rounded-2xl border bg-background/40 backdrop-blur-xl hover:bg-primary/5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all group cursor-pointer w-full text-left card-pulse-extreme-hover"
                onClick={() => toggleGoal(goal.id)}
              >
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    goal.completed
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {goal.completed ? (
                    <CheckCircle size={28} weight="fill" />
                  ) : (
                    <Circle size={28} weight="regular" />
                  )}
                </div>
                <p
                  className={`flex-1 text-base font-bold leading-snug ${
                    goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}
                >
                  {goal.text}
                </p>
              </button>
            ))
          )}
        </div>

        {todayGoals.length === 3 && (
          <div className="text-center text-sm text-muted-foreground font-semibold">
            Focus on these 3 goals today 🎯
          </div>
        )}
      </div>
    </div>
  )
}
