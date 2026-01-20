import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkle, ArrowsClockwise, Sun, Cloud, CloudRain, Lightbulb } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
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
      let timeOfDay = 'Good morning'
      if (hour >= 12 && hour < 17) timeOfDay = 'Good afternoon'
      else if (hour >= 17) timeOfDay = 'Good evening'

      const prompt = window.spark.llmPrompt`Generate a brief daily briefing for a personal assistant app. Include:
1. A personalized ${timeOfDay} message (one sentence, warm and motivating)
2. Weather description (assume current conditions, be specific but brief - make it realistic and interesting)
3. Three key priorities for the day (productivity-focused, actionable)
4. One insightful tip or mindset suggestion for the day

Return the result as a valid JSON object with keys: greeting, weather, priorities (array), insight`
      
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

  useEffect(() => {
    if (!briefing && !isLoading) {
      generateBriefing()
    }
  }, [])

  const getWeatherIcon = () => {
    if (!briefing) return null
    const weather = briefing.weather.toLowerCase()
    if (weather.includes('sun') || weather.includes('clear')) return <Sun className="text-accent" size={24} weight="duotone" />
    if (weather.includes('rain')) return <CloudRain className="text-accent" size={24} weight="duotone" />
    return <Cloud className="text-accent" size={24} weight="duotone" />
  }

  return (
    <Card className="border border-border/50 hover:border-primary/40 transition-all duration-300 bg-card/80 backdrop-blur-sm overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-4 relative">
        <CardTitle className="flex items-center gap-3 text-2xl sm:text-3xl font-bold">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/30">
            <Sparkle className="text-primary" size={24} weight="duotone" />
          </div>
          <span>Daily Intel</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRegenerate}
          disabled={isLoading}
          className="h-10 w-10 rounded-lg hover:bg-primary/10 transition-all"
        >
          <ArrowsClockwise size={20} className={isLoading ? 'animate-spin text-primary' : 'text-muted-foreground'} weight="bold" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6 relative">
        {isLoading && !briefing ? (
          <>
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-1/2 rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </>
        ) : briefing ? (
          <>
            <div className="rounded-lg p-5 border border-border/30">
              <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium">{briefing.greeting}</p>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border border-border/30">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                {getWeatherIcon()}
              </div>
              <span className="text-sm sm:text-base text-foreground">{briefing.weather}</span>
            </div>

            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                Priority Queue
              </h4>
              <div className="space-y-3">
                {briefing.priorities.map((priority, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border/30 hover:border-primary/40 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-sm sm:text-base text-foreground leading-relaxed pt-1">{priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-5 border-l-4 border-accent bg-accent/5">
              <div className="flex gap-3">
                <Lightbulb size={24} weight="duotone" className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-foreground leading-relaxed">{briefing.insight}</p>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
