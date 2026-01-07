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
    if (weather.includes('sun') || weather.includes('clear')) return <Sun className="text-accent" size={22} weight="duotone" />
    if (weather.includes('rain')) return <CloudRain className="text-accent" size={22} weight="duotone" />
    return <Cloud className="text-accent" size={22} weight="duotone" />
  }

  return (
    <Card className="shadow-sm border hover:shadow-md transition-all duration-200 bg-card overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between pb-5 relative">
        <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-semibold">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/20">
            <Sparkle className="text-accent" size={20} weight="duotone" />
          </div>
          Daily Briefing
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRegenerate}
          disabled={isLoading}
          className="h-9 w-9 rounded-lg hover:bg-muted/80"
        >
          <ArrowsClockwise size={18} className={isLoading ? 'animate-spin' : ''} weight="bold" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-5 relative">
        {isLoading && !briefing ? (
          <>
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </>
        ) : briefing ? (
          <>
            <div className="bg-gradient-to-r from-primary/8 to-accent/8 rounded-xl p-4 sm:p-5 border border-primary/10">
              <p className="text-[15px] sm:text-base font-medium text-foreground leading-relaxed">{briefing.greeting}</p>
            </div>

            <div className="flex items-center gap-3 px-0.5">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                {getWeatherIcon()}
              </div>
              <span className="text-sm sm:text-[15px] text-foreground font-medium">{briefing.weather}</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm sm:text-[15px] font-semibold text-foreground flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                Top Priorities
              </h4>
              <div className="space-y-2.5 pl-0.5">
                {briefing.priorities.map((priority, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors border border-primary/20">
                      <span className="text-primary font-bold text-xs">{idx + 1}</span>
                    </div>
                    <span className="text-sm sm:text-[15px] text-foreground leading-relaxed pt-0.5">{priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-4 sm:p-5 border-l-4 border-accent shadow-sm">
              <div className="flex gap-3">
                <Lightbulb size={22} weight="duotone" className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-[15px] text-foreground leading-relaxed italic font-medium">{briefing.insight}</p>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
