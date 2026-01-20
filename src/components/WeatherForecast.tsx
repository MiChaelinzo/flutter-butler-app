import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { CalendarBlank, ArrowsClockwise, Sun, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, Wind, Moon, Drop } from '@phosphor-icons/react'
import { Skeleton } from '@/components/ui/skeleton'

interface ForecastDay {
  day: string
  date: string
  weather: string
  temperature: number
  tempLow: number
  tempHigh: number
  humidity: number
  windSpeed: number
  description: string
}

export function WeatherForecast() {
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [numDays, setNumDays] = useKV<number>('forecast-days', 5)
  const [tempUnit, setTempUnit] = useKV<string>('temperature-unit', 'fahrenheit')

  const generateForecast = async () => {
    setIsLoading(true)
    try {
      const days = numDays || 5
      const today = new Date()
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      const nextDays = Array.from({ length: days }).map((_, i) => {
        const date = new Date(today)
        date.setDate(today.getDate() + i + 1)
        return {
          day: daysOfWeek[date.getDay()],
          date: `${months[date.getMonth()]} ${date.getDate()}`
        }
      })

      const promptText = `Generate a realistic ${days}-day weather forecast. For each day, provide:
1. Weather condition (choose from: sunny, partly cloudy, overcast, rain, drizzle, thunderstorm, light snow, heavy snow, fog, mist, windy, clear)
2. Temperature in Fahrenheit (realistic number between 20 and 95, showing gradual changes between days)
3. Low temperature (5-15 degrees below main temp)
4. High temperature (5-15 degrees above main temp)
5. Humidity percentage (realistic number between 30 and 90)
6. Wind speed in mph (realistic number between 3 and 25)
7. Short description (2-4 words, like "Clear skies ahead" or "Expect afternoon showers")

Create a realistic forecast with gradual weather pattern changes, not random jumps.

Return as a JSON object with a "days" property containing an array of ${days} forecast objects with keys: weather, temperature (number), tempLow (number), tempHigh (number), humidity (number), windSpeed (number), description`
      
      const prompt = window.spark.llmPrompt([promptText], days.toString())
      const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const data = JSON.parse(response)
      
      const forecastDays = data.days.map((day: any, index: number) => ({
        ...nextDays[index],
        ...day
      }))
      
      setForecast(forecastDays)
    } catch (error) {
      console.error('Failed to generate forecast:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!forecast && !isLoading) {
      generateForecast()
    }
  }, [])

  useEffect(() => {
    if (forecast) {
      generateForecast()
    }
  }, [numDays])

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

  const getWeatherIcon = (weather: string, size: number = 32) => {
    const weatherLower = weather.toLowerCase()
    
    if (weatherLower.includes('thunder') || weatherLower.includes('storm') || weatherLower.includes('lightning')) {
      return <CloudLightning className="text-yellow-400 animate-pulse" size={size} weight="duotone" />
    }
    
    if (weatherLower.includes('snow') || weatherLower.includes('blizzard')) {
      return (
        <div className="relative animate-bounce-slow">
          <CloudSnow className="text-blue-300" size={size} weight="duotone" />
        </div>
      )
    }
    
    if (weatherLower.includes('fog') || weatherLower.includes('mist') || weatherLower.includes('hazy')) {
      return <CloudFog className="text-gray-400 opacity-80 animate-pulse-slow" size={size} weight="duotone" />
    }
    
    if (weatherLower.includes('wind') || weatherLower.includes('breezy') || weatherLower.includes('gusty')) {
      return <Wind className="text-cyan-400 animate-sway" size={size} weight="duotone" />
    }
    
    if (weatherLower.includes('drizzle') || weatherLower.includes('sprinkle')) {
      return (
        <div className="relative">
          <Cloud className="text-gray-400" size={size} weight="duotone" />
          <Drop className="absolute -bottom-1 -right-1 text-blue-400 animate-drip" size={size * 0.35} weight="fill" />
        </div>
      )
    }
    
    if (weatherLower.includes('rain') || weatherLower.includes('shower') || weatherLower.includes('downpour')) {
      return <CloudRain className="text-blue-500 animate-bounce-gentle" size={size} weight="duotone" />
    }
    
    if (weatherLower.includes('partly cloudy') || weatherLower.includes('scattered clouds')) {
      return (
        <div className="relative">
          <Sun className="text-amber-400 animate-spin-very-slow" size={size * 0.8} weight="duotone" />
          <Cloud className="absolute -bottom-1 -right-2 text-gray-300" size={size * 0.65} weight="duotone" />
        </div>
      )
    }
    
    if (weatherLower.includes('overcast') || weatherLower.includes('cloudy')) {
      return <Cloud className="text-gray-400 animate-float" size={size} weight="duotone" />
    }
    
    if (weatherLower.includes('clear') && (weatherLower.includes('night') || weatherLower.includes('evening'))) {
      return <Moon className="text-indigo-300 animate-glow" size={size} weight="duotone" />
    }
    
    if (weatherLower.includes('sun') || weatherLower.includes('clear') || weatherLower.includes('bright')) {
      return <Sun className="text-amber-400 animate-spin-very-slow" size={size} weight="duotone" />
    }
    
    return <Cloud className="text-gray-400 animate-float" size={size} weight="duotone" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 glass-border-subtle flex items-center justify-center">
            <CalendarBlank className="text-accent" size={20} weight="duotone" />
          </div>
          <span>{numDays}-Day Forecast</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            {[3, 5, 7].map(days => (
              <Button
                key={days}
                variant={numDays === days ? "default" : "ghost"}
                size="sm"
                onClick={() => setNumDays(days)}
                className="h-8 px-3 text-xs font-semibold"
              >
                {days}d
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleUnit}
            className="h-8 px-3 text-xs font-semibold hover:bg-primary/10"
          >
            {getTempUnit()}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={generateForecast}
            disabled={isLoading}
            className="h-8 w-8 rounded-lg hover:bg-primary/10 transition-all"
          >
            <ArrowsClockwise size={16} className={isLoading ? 'animate-spin text-primary' : 'text-muted-foreground'} weight="bold" />
          </Button>
        </div>
      </div>
      
      <div>
        {isLoading && !forecast ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: numDays || 5 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg bg-muted/20" />
            ))}
          </div>
        ) : forecast ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4 glass-border bg-background/40 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group/card"
                >
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-foreground">{day.day}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{day.date}</div>
                    </div>

                    <div className="flex justify-center py-2">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 glass-border-subtle flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                        {getWeatherIcon(day.weather, 32)}
                      </div>
                    </div>

                    <div className="text-center space-y-1">
                      <div className="text-xs font-medium text-muted-foreground capitalize">{day.weather}</div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-bold text-foreground">{getDisplayTemp(day.temperature)}</span>
                        <span className="text-sm text-muted-foreground">{getTempUnit()}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <span>↓{getDisplayTemp(day.tempLow)}</span>
                        <span className="text-border">|</span>
                        <span>↑{getDisplayTemp(day.tempHigh)}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/20 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Drop size={12} weight="fill" className="text-blue-400" />
                          <span>{day.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Wind size={12} weight="duotone" className="text-cyan-400" />
                          <span>{day.windSpeed} mph</span>
                        </div>
                      </div>
                      <div className="text-xs text-center text-muted-foreground italic">
                        {day.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
