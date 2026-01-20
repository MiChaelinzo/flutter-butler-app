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
    <Card className="shadow-[0_0_40px_rgba(114,192,255,0.25)] border-2 border-primary/50 hover:shadow-[0_0_60px_rgba(114,192,255,0.4)] hover:border-primary/70 transition-all duration-500 bg-card/60 backdrop-blur-2xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-6 relative">
        <CardTitle className="flex items-center gap-4 text-3xl sm:text-4xl font-black tracking-[0.06em] uppercase">
          <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/35 to-accent/30 flex items-center justify-center border-2 border-primary/60 shadow-[0_0_30px_rgba(114,192,255,0.35)] group-hover:shadow-[0_0_50px_rgba(114,192,255,0.5)] group-hover:scale-110 transition-all duration-300">
            <Sparkle className="text-primary drop-shadow-[0_0_15px_rgba(114,192,255,1)]" size={28} weight="duotone" />
          </div>
          <span className="text-gradient-cyber">Daily Intel</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRegenerate}
          disabled={isLoading}
          className="h-12 w-12 rounded-xl hover:bg-primary/20 hover:scale-110 transition-all border-2 border-primary/40 hover:border-primary/70 backdrop-blur-xl hover:shadow-[0_0_25px_rgba(114,192,255,0.4)]"
        >
          <ArrowsClockwise size={24} className={isLoading ? 'animate-spin text-primary drop-shadow-[0_0_12px_rgba(114,192,255,0.9)]' : 'text-primary'} weight="bold" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-7 relative">
        {isLoading && !briefing ? (
          <>
            <Skeleton className="h-6 w-3/4 rounded-xl bg-muted/50 border border-primary/20" />
            <Skeleton className="h-6 w-1/2 rounded-xl bg-muted/50 border border-primary/20" />
            <Skeleton className="h-32 w-full rounded-xl bg-muted/50 border border-primary/20" />
            <Skeleton className="h-24 w-full rounded-xl bg-muted/50 border border-primary/20" />
          </>
        ) : briefing ? (
          <>
            <div className="bg-gradient-to-r from-primary/18 via-accent/12 to-primary/18 rounded-xl p-6 sm:p-7 border-2 border-primary/50 shadow-[0_0_30px_rgba(114,192,255,0.2)] backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
              <p className="text-lg sm:text-xl font-bold text-foreground leading-relaxed relative tracking-wide">{briefing.greeting}</p>
            </div>

            <div className="flex items-center gap-4 px-2">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-2 border-accent/50 shadow-[0_0_20px_rgba(173,77,213,0.3)]">
                {getWeatherIcon()}
              </div>
              <span className="text-base sm:text-lg text-foreground font-bold tracking-wide">{briefing.weather}</span>
            </div>

            <div className="space-y-5">
              <h4 className="text-lg sm:text-xl font-black text-foreground flex items-center gap-4 tracking-[0.04em] uppercase">
                <div className="w-1 h-8 bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-[0_0_15px_rgba(114,192,255,0.6)]" />
                <span className="text-gradient-cyber">Priority Queue</span>
              </h4>
              <div className="space-y-4 pl-2">
                {briefing.priorities.map((priority, idx) => (
                  <div key={idx} className="flex items-start gap-4 group/priority">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/priority:from-primary/50 group-hover/priority:to-accent/50 transition-all border-2 border-primary/50 shadow-[0_0_15px_rgba(114,192,255,0.2)] group-hover/priority:shadow-[0_0_25px_rgba(114,192,255,0.4)] group-hover/priority:scale-110 duration-300">
                      <span className="text-primary font-black text-base drop-shadow-[0_0_5px_rgba(114,192,255,0.9)]">{idx + 1}</span>
                    </div>
                    <span className="text-base sm:text-lg text-foreground leading-relaxed pt-1.5 font-semibold">{priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/18 via-accent/12 to-accent/10 rounded-xl p-6 sm:p-7 border-l-4 border-accent shadow-[0_0_30px_rgba(173,77,213,0.2)] backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
              <div className="flex gap-5 relative">
                <Lightbulb size={28} weight="duotone" className="text-accent drop-shadow-[0_0_10px_rgba(173,77,213,0.9)] flex-shrink-0 mt-1" />
                <p className="text-base sm:text-lg text-foreground leading-relaxed font-semibold">{briefing.insight}</p>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
