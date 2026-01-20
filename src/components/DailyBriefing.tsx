import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkle, ArrowsClockwise, Sun, Cloud, CloudRain, Lightbulb, CloudSnow, CloudFog, CloudLightning, Wind, Moon, Snowflake, Drop, Thermometer, Eye } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useKV } from '@github/spark/hooks'

interface DailyBriefingProps {
  onRegenerate: () => void
}

export function DailyBriefing({ onRegenerate }: DailyBriefingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [briefing, setBriefing] = useState<{
    greeting: string
    weather: string
    temperature: number
    feelsLike: number
    humidity: number
    priorities: string[]
    insight: string
  } | null>(null)
  const [tempUnit, setTempUnit] = useKV('temperature-unit', 'fahrenheit')

  const generateBriefing = async () => {
    setIsLoading(true)
    try {
      const hour = new Date().getHours()
      let timeOfDay = 'Good morning'
      if (hour >= 12 && hour < 17) timeOfDay = 'Good afternoon'
      else if (hour >= 17) timeOfDay = 'Good evening'

      const promptText = `Generate a brief daily briefing for a personal assistant app. Include:
1. A personalized ${timeOfDay} message (one sentence, warm and motivating)
2. Weather description (choose from diverse conditions like: sunny, partly cloudy, overcast, rain, drizzle, thunderstorm, snow, blizzard, fog, mist, windy, hot, cold, freezing, clear night, hail, sleet - be specific and realistic for current season)
3. Temperature in Fahrenheit (realistic number between -20 and 110 based on weather condition and season)
4. Feels like temperature in Fahrenheit (usually within 5-10 degrees of actual temp)
5. Humidity percentage (realistic number between 20 and 95 based on weather)
6. Three key priorities for the day (productivity-focused, actionable)
7. One insightful tip or mindset suggestion for the day

Return the result as a valid JSON object with keys: greeting, weather, temperature (number), feelsLike (number), humidity (number), priorities (array), insight`
      const prompt = window.spark.llmPrompt([promptText], timeOfDay)
      
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

  const convertToC = (fahrenheit: number) => {
    return Math.round((fahrenheit - 32) * 5 / 9)
  }

  const isCelsius = tempUnit === 'celsius'

  const getDisplayTemp = (fahrenheit: number) => {
    return isCelsius ? convertToC(fahrenheit) : fahrenheit
  }

  const getTempUnit = () => {
    return isCelsius ? '°C' : '°F'
  }

  const toggleUnit = () => {
    setTempUnit((current) => current === 'celsius' ? 'fahrenheit' : 'celsius')
  }

  const getWeatherIcon = () => {
    if (!briefing) return null
    const weather = briefing.weather.toLowerCase()
    
    if (weather.includes('thunder') || weather.includes('storm') || weather.includes('lightning')) {
      return (
        <div className="relative">
          <CloudLightning className="text-yellow-400 animate-pulse" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('snow') || weather.includes('blizzard')) {
      return (
        <div className="relative animate-bounce-slow">
          <CloudSnow className="text-blue-300" size={24} weight="duotone" />
          <Snowflake className="absolute -bottom-1 -right-1 text-blue-200 animate-spin-slow" size={12} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('fog') || weather.includes('mist') || weather.includes('hazy')) {
      return (
        <div className="relative opacity-80 animate-pulse-slow">
          <CloudFog className="text-gray-400" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('wind') || weather.includes('breezy') || weather.includes('gusty')) {
      return (
        <div className="animate-sway">
          <Wind className="text-cyan-400" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('drizzle') || weather.includes('sprinkle')) {
      return (
        <div className="relative">
          <Cloud className="text-gray-400" size={24} weight="duotone" />
          <Drop className="absolute -bottom-1 -right-1 text-blue-400 animate-drip" size={10} weight="fill" />
        </div>
      )
    }
    
    if (weather.includes('rain') || weather.includes('shower') || weather.includes('downpour')) {
      return (
        <div className="animate-bounce-gentle">
          <CloudRain className="text-blue-500" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('partly cloudy') || weather.includes('scattered clouds')) {
      return (
        <div className="relative">
          <Sun className="text-amber-400 animate-spin-very-slow" size={20} weight="duotone" />
          <Cloud className="absolute -bottom-1 -right-2 text-gray-300" size={16} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('overcast') || weather.includes('cloudy')) {
      return (
        <div className="animate-float">
          <Cloud className="text-gray-400" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('hot') || weather.includes('heat')) {
      return (
        <div className="relative">
          <Sun className="text-red-500 animate-pulse" size={24} weight="duotone" />
          <Thermometer className="absolute -bottom-1 -right-1 text-red-400" size={12} weight="fill" />
        </div>
      )
    }
    
    if (weather.includes('cold') || weather.includes('freezing') || weather.includes('frost')) {
      return (
        <div className="relative animate-shiver">
          <Snowflake className="text-cyan-300" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('night') || weather.includes('clear night') || weather.includes('evening')) {
      return (
        <div className="animate-glow">
          <Moon className="text-indigo-300" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('hail') || weather.includes('sleet')) {
      return (
        <div className="relative animate-shake">
          <CloudSnow className="text-gray-300" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('dust') || weather.includes('sand')) {
      return (
        <div className="relative opacity-70 animate-drift">
          <Eye className="text-amber-600" size={24} weight="duotone" />
        </div>
      )
    }
    
    if (weather.includes('sun') || weather.includes('clear') || weather.includes('bright')) {
      return (
        <div className="animate-spin-very-slow">
          <Sun className="text-amber-400" size={24} weight="duotone" />
        </div>
      )
    }
    
    return (
      <div className="animate-float">
        <Cloud className="text-gray-400" size={24} weight="duotone" />
      </div>
    )
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

            <div className="rounded-lg p-5 border border-border/30 bg-gradient-to-br from-accent/5 to-primary/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center border border-primary/20">
                    {getWeatherIcon()}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-base sm:text-lg font-semibold text-foreground">{briefing.weather}</span>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Drop size={14} weight="fill" className="text-blue-400" />
                      <span>{briefing.humidity}% humidity</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-start gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-foreground">{getDisplayTemp(briefing.temperature)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleUnit}
                      className="text-2xl font-semibold text-muted-foreground hover:text-foreground mt-1 h-auto p-1 hover:bg-transparent transition-colors"
                    >
                      {getTempUnit()}
                    </Button>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Thermometer size={14} weight="duotone" />
                    <span>Feels like {getDisplayTemp(briefing.feelsLike)}{getTempUnit()}</span>
                  </div>
                </div>
              </div>
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
