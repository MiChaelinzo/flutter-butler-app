import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Drop, Wind, Leaf } from '@phosphor-icons/react'

interface AirQualityData {
  pm25: number
  pm10: number
  co2: number
  humidity: number
  temperature: number
  voc: number
  hcho: number
  aqi: number
}

interface HealthRecommendationsProps {
  airQuality?: AirQualityData
}

const defaultAirQuality: AirQualityData = {
  pm25: 12,
  pm10: 18,
  co2: 450,
  humidity: 45,
  temperature: 22,
  voc: 150,
  hcho: 0.02,
  aqi: 35
}

const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return { label: 'Good', color: 'bg-lime/10 text-lime border-lime/20' }
  if (aqi <= 100) return { label: 'Moderate', color: 'bg-orange/10 text-orange border-orange/20' }
  if (aqi <= 150) return { label: 'Unhealthy', color: 'bg-destructive/10 text-destructive border-destructive/20' }
  return { label: 'Hazardous', color: 'bg-destructive/20 text-destructive border-destructive/30' }
}

export function HealthRecommendations({ airQuality = defaultAirQuality }: HealthRecommendationsProps) {
  const aqiLevel = getAQILevel(airQuality.aqi)

  return (
    <Card className="p-6 card-gradient-hover-success">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-lime/10 border border-lime/20 flex items-center justify-center">
          <Heart size={20} weight="duotone" className="text-lime" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Health Monitor</h3>
          <p className="text-xs text-muted-foreground">Environment Status</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-card border flex items-center justify-center">
            <Wind size={20} weight="duotone" className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Air Quality Index</p>
            <Badge className={`mt-1 ${aqiLevel.color}`}>
              {aqiLevel.label}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-card border flex items-center justify-center">
            <Leaf size={20} weight="duotone" className="text-lime" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">CO2 ppm</p>
            <p className="text-lg font-bold mt-1">{airQuality.co2}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-card border flex items-center justify-center">
            <Drop size={20} weight="duotone" className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-lg font-bold mt-1">{airQuality.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-card border flex items-center justify-center">
            <Heart size={20} weight="duotone" className="text-destructive" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Temperature</p>
            <p className="text-lg font-bold mt-1">{airQuality.temperature}°C</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-sm font-medium mb-2">Recommendations</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Take regular breaks every 50 minutes</li>
          <li>• Stay hydrated - drink water every hour</li>
          <li>• Open windows for fresh air circulation</li>
        </ul>
      </div>
    </Card>
  )
}
