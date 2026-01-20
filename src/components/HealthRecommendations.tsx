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
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: 'bg-orange/20 text-orange border-orange/30' }
  if (aqi <= 200) return { label: 'Unhealthy', color: 'bg-destructive/10 text-destructive border-destructive/20' }
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'bg-destructive/20 text-destructive border-destructive/30' }
  return { label: 'Hazardous', color: 'bg-destructive/30 text-destructive border-destructive/40' }
}

const getRecommendation = (data: AirQualityData) => {
  const { aqi, co2, humidity } = data
  
  if (aqi > 100) {
    return 'Air quality is concerning. Consider using an air purifier and keeping windows closed.'
  }
  if (co2 > 1000) {
    return 'CO2 levels are elevated. Open windows for ventilation or reduce occupancy.'
  }
  if (humidity < 30 || humidity > 60) {
    return humidity < 30 
      ? 'Humidity is low. Consider using a humidifier to improve comfort.'
      : 'Humidity is high. Use a dehumidifier to prevent mold growth.'
  }
  return 'Air quality is good. Maintain current ventilation practices.'
}

export function HealthRecommendations({ airQuality }: HealthRecommendationsProps) {
  const data = airQuality || defaultAirQuality
  const aqiLevel = getAQILevel(data.aqi)
  const recommendation = getRecommendation(data)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart size={20} weight="duotone" className="text-lime" />
          <div>
            <h3 className="text-lg font-semibold">Health Monitor</h3>
            <p className="text-xs text-muted-foreground">Air Quality Index</p>
          </div>
        </div>
        <Badge className={`${aqiLevel.color} border font-medium`}>
          {aqiLevel.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border">
          <Wind size={24} weight="duotone" className="text-primary mb-2" />
          <p className="text-2xl font-bold">{data.aqi}</p>
          <p className="text-xs text-muted-foreground">AQI</p>
        </div>

        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border">
          <Leaf size={24} weight="duotone" className="text-lime mb-2" />
          <p className="text-2xl font-bold">{data.co2}</p>
          <p className="text-xs text-muted-foreground">CO2 ppm</p>
        </div>

        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border">
          <Drop size={24} weight="duotone" className="text-primary mb-2" />
          <p className="text-2xl font-bold">{data.humidity}%</p>
          <p className="text-xs text-muted-foreground">Humidity</p>
        </div>

        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border">
          <Heart size={24} weight="duotone" className="text-primary mb-2" />
          <p className="text-2xl font-bold">{data.pm25}</p>
          <p className="text-xs text-muted-foreground">PM2.5</p>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Recommendation:</strong> {recommendation}
        </p>
      </div>
    </Card>
  )
}
