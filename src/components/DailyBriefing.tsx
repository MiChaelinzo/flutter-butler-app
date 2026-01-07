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
    if (weather.includes('sun') || weather.includes('clear')) return <Sun className="text-accent" size={24} weight="duotone" />
    if (weather.includes('rain')) return <CloudRain className="text-accent" size={24} weight="duotone" />
    return <Cloud className="text-accent" size={24} weight="duotone" />
  }

  return (
    <Card className="shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-30" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-6 relative">
        <CardTitle className="flex items-center gap-3.5 text-2xl sm:text-3xl font-bold">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center border border-primary/40 shadow-lg shadow-primary/20">
            <Sparkle className="text-primary" size={24} weight="duotone" />
          </div>
          Daily Briefing
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRegenerate}
          disabled={isLoading}
          className="h-10 w-10 rounded-xl hover:bg-muted/80 hover:scale-110 transition-all"
        >
          <ArrowsClockwise size={20} className={isLoading ? 'animate-spin' : ''} weight="bold" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6 relative">
        {isLoading && !briefing ? (
          <>
            <Skeleton className="h-5 w-3/4 rounded-lg bg-muted/50" />
            <Skeleton className="h-5 w-1/2 rounded-lg bg-muted/50" />
            <Skeleton className="h-24 w-full rounded-xl bg-muted/50" />
            <Skeleton className="h-20 w-full rounded-xl bg-muted/50" />
          </>
        ) : briefing ? (
          <>
            <div className="bg-gradient-to-r from-primary/20 via-primary/15 to-accent/15 rounded-2xl p-5 sm:p-6 border border-primary/30 shadow-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.72_0.19_145)_0%,transparent_50%)] opacity-10" />
              <p className="text-base sm:text-lg font-semibold text-foreground leading-relaxed relative">{briefing.greeting}</p>
            </div>

            <div className="flex items-center gap-4 px-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/25 to-accent/15 flex items-center justify-center border border-accent/40 shadow-md">
                {getWeatherIcon()}
              </div>
              <span className="text-sm sm:text-base text-foreground font-semibold">{briefing.weather}</span>
            </div>

            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-3">
                <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full shadow-lg shadow-primary/50" />
                Top Priorities
              </h4>
              <div className="space-y-3 pl-1">
                {briefing.priorities.map((priority, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:from-primary/30 group-hover:to-primary/20 transition-all border border-primary/30 shadow-md">
                      <span className="text-primary font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-sm sm:text-base text-foreground leading-relaxed pt-1 font-medium">{priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/20 via-accent/15 to-accent/10 rounded-2xl p-5 sm:p-6 border-l-4 border-accent shadow-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.75_0.20_80)_0%,transparent_50%)] opacity-10" />
              <div className="flex gap-4 relative">
                <Lightbulb size={24} weight="duotone" className="text-accent flex-shrink-0 mt-1" />
                <p className="text-sm sm:text-base text-foreground leading-relaxed italic font-semibold">{briefing.insight}</p>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
