import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkle, ArrowsClockwise, Sun, Cloud, CloudRain } from '@phosphor-icons/react'
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
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkle className="text-accent" size={24} weight="fill" />
          Daily Briefing
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRegenerate}
          disabled={isLoading}
          className="h-8 w-8"
        >
          <ArrowsClockwise size={18} className={isLoading ? 'animate-spin' : ''} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && !briefing ? (
          <>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </>
        ) : briefing ? (
          <>
            <div>
              <p className="text-base font-medium text-foreground">{briefing.greeting}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {getWeatherIcon()}
              <span>{briefing.weather}</span>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Top Priorities</h4>
              <ul className="space-y-1.5">
                {briefing.priorities.map((priority, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent font-bold mt-0.5">{idx + 1}.</span>
                    <span>{priority}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-accent">
              <p className="text-sm text-foreground italic">{briefing.insight}</p>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
