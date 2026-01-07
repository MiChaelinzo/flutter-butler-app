import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkle, ArrowsClockwise, Sun, Cloud, CloudRain, Lightbulb } from '@phosphor-icons/react'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface DailyBriefingProps {
  onRegenerate: () => void
}

export function DailyBriefing({ onRegenerate }: DailyBriefingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [briefing, setBriefing] = useState<{
    greeting: string
    weather: string
    priorities: string[]
    insight: string
  } | null>(null)

  const generateBriefing = async () => {
    setIsLoading(true)
    try {
      const hour = new Date().getHours()
      let greeting = 'Good morning'
      if (hour >= 12 && hour < 17) greeting = 'Good afternoon'
      else if (hour >= 17) greeting = 'Good evening'

      const promptText = `Generate a brief daily briefing for a personal assistant app. Include:
1. A personalized ${greeting} message (one sentence, warm and motivating)
2. Weather description (assume current conditions, be specific but brief)
3. Three key priorities for the day (productivity-focused, actionable)
4. One insightful tip or mindset suggestion for the day

Format as JSON with keys: greeting, weather, priorities (array), insight`

      const prompt = window.spark.llmPrompt([promptText], '')
      const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const data = JSON.parse(response)
      setBriefing(data)
    } catch (error) {
      console.error('Failed to generate briefing:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = () => {
    generateBriefing()
    onRegenerate()
  }

  if (!briefing && !isLoading) {
    generateBriefing()
  }

  const getWeatherIcon = () => {
    if (!briefing) return null
    const weather = briefing.weather.toLowerCase()
    if (weather.includes('sun') || weather.includes('clear')) return <Sun className="text-accent" size={24} weight="fill" />
    if (weather.includes('rain')) return <CloudRain className="text-accent" size={24} weight="fill" />
    return <Cloud className="text-accent" size={24} weight="fill" />
  }

  return (
    <Card className="shadow-lg border-2 hover:shadow-xl transition-all backdrop-blur-sm bg-card/90 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between pb-4 relative">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-md">
            <Sparkle className="text-white" size={22} weight="fill" />
          </div>
          Daily Briefing
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRegenerate}
          disabled={isLoading}
          className="h-10 w-10 rounded-xl hover:bg-muted/80"
        >
          <ArrowsClockwise size={20} className={isLoading ? 'animate-spin' : ''} weight="bold" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        {isLoading && !briefing ? (
          <>
            <Skeleton className="h-5 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-1/2 rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </>
        ) : briefing ? (
          <>
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-5 border border-primary/10">
              <p className="text-lg font-semibold text-foreground leading-relaxed">{briefing.greeting}</p>
            </div>

            <div className="flex items-center gap-3 px-1">
              <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
                {getWeatherIcon()}
              </div>
              <span className="text-base text-foreground font-medium">{briefing.weather}</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                <div className="w-1.5 h-5 bg-primary rounded-full" />
                Top Priorities
              </h4>
              <div className="space-y-3 pl-1">
                {briefing.priorities.map((priority, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/25 transition-colors">
                      <span className="text-primary font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-foreground leading-relaxed pt-0.5">{priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-5 border-l-4 border-accent shadow-sm">
              <div className="flex gap-3">
                <Lightbulb size={24} weight="fill" className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground leading-relaxed italic font-medium">{briefing.insight}</p>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
