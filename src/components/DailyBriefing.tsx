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
    <Card className="shadow-2xl border-2 border-white/10 hover:shadow-accent/30 transition-all duration-300 bg-card backdrop-blur-2xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-6 relative">
        <CardTitle className="flex items-center gap-4 text-3xl sm:text-4xl font-bold">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border-2 border-white/20 shadow-2xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
            <Sparkle className="text-white drop-shadow-lg" size={28} weight="duotone" />
          </div>
          <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">Daily Briefing</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRegenerate}
          disabled={isLoading}
          className="h-12 w-12 rounded-2xl hover:bg-primary/20 hover:scale-110 transition-all border-2 border-transparent hover:border-white/10 backdrop-blur-xl"
        >
          <ArrowsClockwise size={24} className={isLoading ? 'animate-spin text-primary' : 'text-foreground'} weight="bold" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-7 relative">
        {isLoading && !briefing ? (
          <>
            <Skeleton className="h-6 w-3/4 rounded-xl bg-muted/70" />
            <Skeleton className="h-6 w-1/2 rounded-xl bg-muted/70" />
            <Skeleton className="h-32 w-full rounded-2xl bg-muted/70" />
            <Skeleton className="h-24 w-full rounded-2xl bg-muted/70" />
          </>
        ) : briefing ? (
          <>
            <div className="bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-2xl p-6 sm:p-7 border-2 border-white/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.70_0.25_190)_0%,transparent_60%)] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              <p className="text-lg sm:text-xl font-bold text-white leading-relaxed relative drop-shadow-lg">{briefing.greeting}</p>
            </div>

            <div className="flex items-center gap-4 px-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/40 to-accent/20 flex items-center justify-center border-2 border-white/20 shadow-xl shadow-accent/20">
                {getWeatherIcon()}
              </div>
              <span className="text-base sm:text-lg text-foreground font-bold">{briefing.weather}</span>
            </div>

            <div className="space-y-5">
              <h4 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-4">
                <div className="w-2 h-8 bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-xl shadow-primary/50" />
                <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Top Priorities</span>
              </h4>
              <div className="space-y-4 pl-2">
                {briefing.priorities.map((priority, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:from-primary/60 group-hover:to-accent/60 transition-all border-2 border-white/20 shadow-xl shadow-primary/20 group-hover:scale-110">
                      <span className="text-white font-bold text-base drop-shadow-lg">{idx + 1}</span>
                    </div>
                    <span className="text-base sm:text-lg text-foreground leading-relaxed pt-1.5 font-semibold">{priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/30 via-accent/25 to-accent/20 rounded-2xl p-6 sm:p-7 border-l-4 border-accent shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.75_0.25_330)_0%,transparent_60%)] opacity-20" />
              <div className="flex gap-5 relative">
                <Lightbulb size={28} weight="duotone" className="text-accent drop-shadow-lg flex-shrink-0 mt-1" />
                <p className="text-base sm:text-lg text-foreground leading-relaxed italic font-bold">{briefing.insight}</p>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
