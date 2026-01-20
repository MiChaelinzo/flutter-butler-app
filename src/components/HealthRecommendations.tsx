import { Card } from '@/components/ui/card'
import { Heart, Drop, Wind, Leaf } from '@phosphor-icons/react'

interface AirQuality {
  aqi: number
  pm25: number
  co2: number
  temperature: number
  humidity: number
  voc: number
}

interface HealthRecommendationsProps {
  airQuality?: AirQuality
}

const defaultAirQuality: AirQuality = {
  aqi: 45,
  pm25: 12,
  co2: 450,
  temperature: 22,
  humidity: 55,
  voc: 180
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
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Wind size={20} weight="duotone" className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Air Quality</p>
            <p className="text-sm font-semibold">{airQuality.aqi} AQI</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Drop size={20} weight="duotone" className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-semibold">{airQuality.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Leaf size={20} weight="duotone" className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">CO₂</p>
            <p className="text-sm font-semibold">{airQuality.co2} ppm</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Heart size={20} weight="duotone" className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Temp</p>
            <p className="text-sm font-semibold">{airQuality.temperature}°C</p>
          </div>
        </div>
      </div>

      <div className={`p-3 rounded-lg border ${aqiLevel.color}`}>
        <p className="text-sm font-medium">
          Air Quality Status: <span className="font-semibold">{aqiLevel.label}</span>
        </p>
      </div>
    </Card>
  )
}
