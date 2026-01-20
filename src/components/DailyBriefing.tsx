import { Button } from '@/components/ui/button'
import { Sparkle, ArrowsClockwise, Sun, Cloud, CloudRain, Lightbulb, CloudSnow, CloudFog, CloudLightning, Wind, Moon, Snowflake, Drop, Thermometer, Eye, Leaf, Skull, Plant, Fire, AirplaneTilt, User } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useKV } from '@github/spark/hooks'
import { Badge } from '@/components/ui/badge'

interface DailyBriefingProps {
  onRegenerate: () => void
}

interface AirQualityData {
  co2: number
  pm25: number
  pm10: number
  tvoc: number
  hcho: number
  aqi: number
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'unhealthy'
}

interface DailyBriefingData {
  greeting: string
  personalizedGreeting: string
  weather: string
  temperature: number
  feelsLike: number
  humidity: number
  priorities: string[]
  insight: string
  airQuality: AirQualityData
  userTips: string[]
}

export function DailyBriefing({ onRegenerate }: DailyBriefingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [briefing, setBriefing] = useState<DailyBriefingData | null>(null)
  const [tempUnit, setTempUnit] = useKV('temperature-unit', 'fahrenheit')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await window.spark.user()
        setUsername(user?.login || 'User')
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUsername('User')
      }
    }
    fetchUser()
  }, [])

  const generateBriefing = async () => {
    setIsLoading(true)
    try {
      const hour = new Date().getHours()
      let timeOfDay = 'Good morning'
      if (hour >= 12 && hour < 17) timeOfDay = 'Good afternoon'
      else if (hour >= 17) timeOfDay = 'Good evening'

      const displayName = username || 'User'

      const promptText = `Generate a comprehensive daily briefing for a personal assistant app. Include:
1. A general ${timeOfDay} message (one sentence, warm and motivating - DO NOT include username)
2. A personalized greeting for user "${displayName}" (creative, warm, maybe reference their username creatively if it's interesting, one sentence)
3. Weather description (choose from diverse conditions like: sunny, partly cloudy, overcast, rain, drizzle, thunderstorm, snow, blizzard, fog, mist, windy, hot, cold, freezing, clear night, hail, sleet - be specific and realistic for current season)
4. Temperature in Fahrenheit (realistic number between -20 and 110 based on weather condition and season)
5. Feels like temperature in Fahrenheit (usually within 5-10 degrees of actual temp)
6. Humidity percentage (realistic number between 20 and 95 based on weather)
7. Three key priorities for the day (productivity-focused, actionable)
8. One insightful tip or mindset suggestion for the day
9. Air quality data with realistic values:
   - CO2 in ppm (normal: 400-1000, moderate: 1000-2000, poor: 2000+)
   - PM2.5 in μg/m³ (good: 0-12, moderate: 12-35, unhealthy: 35+)
   - PM10 in μg/m³ (good: 0-54, moderate: 55-154, unhealthy: 155+)
   - TVOC in ppb (good: 0-220, moderate: 220-660, poor: 660+)
   - HCHO (formaldehyde) in μg/m³ (good: 0-50, moderate: 50-100, poor: 100+)
   - AQI (Air Quality Index: 0-50 excellent, 51-100 good, 101-150 moderate, 151-200 poor, 201+ unhealthy)
   - status (one of: excellent, good, moderate, poor, unhealthy)
10. Three helpful user tips (practical productivity, health, or mindfulness tips - be specific and actionable, 1-2 sentences each)

Return the result as a valid JSON object with keys: greeting, personalizedGreeting, weather, temperature (number), feelsLike (number), humidity (number), priorities (array), insight, airQuality (object with: co2, pm25, pm10, tvoc, hcho, aqi, status), userTips (array of 3 strings)`
      const prompt = window.spark.llmPrompt([promptText], timeOfDay, displayName)
      
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
    if (!briefing && !isLoading && username) {
      generateBriefing()
    }
  }, [username])

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

  const getAirQualityColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-lime bg-lime/10 border-lime/20'
      case 'good': return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'moderate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'poor': return 'text-orange bg-orange/10 border-orange/20'
      case 'unhealthy': return 'text-red-500 bg-red-500/10 border-red-500/20'
      default: return 'text-muted-foreground bg-muted/10 border-border/20'
    }
  }

  const getAirQualityIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <Leaf className="text-lime" size={20} weight="duotone" />
      case 'moderate':
        return <Plant className="text-yellow-500" size={20} weight="duotone" />
      case 'poor':
        return <Fire className="text-orange" size={20} weight="duotone" />
      case 'unhealthy':
        return <Skull className="text-red-500" size={20} weight="duotone" />
      default:
        return <AirplaneTilt className="text-muted-foreground" size={20} weight="duotone" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3 text-2xl sm:text-3xl font-bold">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/30">
            <Sparkle className="text-primary" size={24} weight="duotone" />
          </div>
          <span>Daily Intel</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRegenerate}
          disabled={isLoading}
          className="h-10 w-10 rounded-lg hover:bg-primary/10 transition-all"
        >
          <ArrowsClockwise size={20} className={isLoading ? 'animate-spin text-primary' : 'text-muted-foreground'} weight="bold" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {isLoading && !briefing ? (
          <>
            <Skeleton className="h-6 w-3/4 rounded-lg bg-muted/20" />
            <Skeleton className="h-6 w-1/2 rounded-lg bg-muted/20" />
            <Skeleton className="h-32 w-full rounded-lg bg-muted/20" />
            <Skeleton className="h-24 w-full rounded-lg bg-muted/20" />
          </>
        ) : briefing ? (
          <>
            <div className="rounded-lg p-5 border border-border/20 bg-background/40 backdrop-blur-sm card-pulse-gradient-hover">
              <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium">{briefing.greeting}</p>
            </div>

            <div className="rounded-lg p-5 border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm card-pulse-gradient-primary">
              <div className="flex items-start gap-3">
                <User size={24} weight="duotone" className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium">{briefing.personalizedGreeting}</p>
              </div>
            </div>

            <div className="rounded-lg p-5 border border-border/20 bg-background/40 backdrop-blur-sm card-pulse-dramatic-hover">
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

            <div className="rounded-lg p-5 border border-border/20 bg-background/40 backdrop-blur-sm card-pulse-gradient-success">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lime/20 to-lime/5 flex items-center justify-center border border-lime/20">
                    {getAirQualityIcon(briefing.airQuality.status)}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Air Quality</h4>
                    <p className="text-xs text-muted-foreground">Environmental Metrics</p>
                  </div>
                </div>
                <Badge className={`${getAirQualityColor(briefing.airQuality.status)} border font-semibold px-3 py-1`}>
                  {briefing.airQuality.status.toUpperCase()} · AQI {briefing.airQuality.aqi}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="rounded-lg p-3 bg-background/60 border border-border/20 hover:border-primary/30 transition-colors">
                  <div className="text-xs text-muted-foreground mb-1">CO₂</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">{briefing.airQuality.co2}</div>
                  <div className="text-xs text-muted-foreground">ppm</div>
                </div>
                
                <div className="rounded-lg p-3 bg-background/60 border border-border/20 hover:border-primary/30 transition-colors">
                  <div className="text-xs text-muted-foreground mb-1">PM2.5</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">{briefing.airQuality.pm25}</div>
                  <div className="text-xs text-muted-foreground">μg/m³</div>
                </div>
                
                <div className="rounded-lg p-3 bg-background/60 border border-border/20 hover:border-primary/30 transition-colors">
                  <div className="text-xs text-muted-foreground mb-1">PM10</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">{briefing.airQuality.pm10}</div>
                  <div className="text-xs text-muted-foreground">μg/m³</div>
                </div>
                
                <div className="rounded-lg p-3 bg-background/60 border border-border/20 hover:border-primary/30 transition-colors">
                  <div className="text-xs text-muted-foreground mb-1">TVOC</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">{briefing.airQuality.tvoc}</div>
                  <div className="text-xs text-muted-foreground">ppb</div>
                </div>
                
                <div className="rounded-lg p-3 bg-background/60 border border-border/20 hover:border-primary/30 transition-colors">
                  <div className="text-xs text-muted-foreground mb-1">HCHO</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">{briefing.airQuality.hcho}</div>
                  <div className="text-xs text-muted-foreground">μg/m³</div>
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
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border/20 bg-background/40 backdrop-blur-sm hover:border-primary/40 transition-colors card-pulse-gradient-fast">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-sm sm:text-base text-foreground leading-relaxed pt-1">{priority}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-accent to-primary rounded-full" />
                Tips for You
              </h4>
              <div className="space-y-3">
                {briefing.userTips.map((tip, idx) => (
                  <div key={idx} className="rounded-lg p-4 border border-border/20 bg-background/40 backdrop-blur-sm hover:border-accent/40 transition-colors card-gradient-hover-accent">
                    <div className="flex gap-3">
                      <Sparkle size={18} weight="duotone" className="text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-foreground leading-relaxed">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-5 border-l-4 border-accent bg-background/40 backdrop-blur-sm card-pulse-gradient-accent">
              <div className="flex gap-3">
                <Lightbulb size={24} weight="duotone" className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-foreground leading-relaxed">{briefing.insight}</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
