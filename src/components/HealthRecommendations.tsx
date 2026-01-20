import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Drop, Wind, Leaf } from '@phosphor-icons/react'

interface AirQualityData {
  pm25: number
  pm10: number
  tvoc: number
  hcho: number
  aqi: number
}

interface HealthRecommendationsProps {
  airQuality?: AirQualityData
}

export function HealthRecommendations({ airQuality }: HealthRecommendationsProps) {
  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: 'bg-lime text-lime-foreground' }
    if (aqi <= 100) return { label: 'Moderate', color: 'bg-orange text-orange-foreground' }
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'bg-destructive text-destructive-foreground' }
    return { label: 'Unhealthy', color: 'bg-destructive text-destructive-foreground' }
  }

  const defaultAirQuality: AirQualityData = {
    pm25: 12,
    pm10: 25,
    tvoc: 0.3,
    hcho: 0.02,
    aqi: 45
  }

  const data = airQuality || defaultAirQuality
  const aqiLevel = getAQILevel(data.aqi)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lime/15 to-lime/5 border border-lime/20 flex items-center justify-center">
            <Heart size={20} weight="duotone" className="text-lime" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Health Monitor</h3>
            <p className="text-sm text-muted-foreground">Air Quality Status</p>
          </div>
        </div>
        <Badge className={aqiLevel.color}>
          {aqiLevel.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <Wind size={24} weight="duotone" className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">PM2.5</p>
            <p className="font-semibold">{data.pm25} µg/m³</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <Drop size={24} weight="duotone" className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">PM10</p>
            <p className="font-semibold">{data.pm10} µg/m³</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <Leaf size={24} weight="duotone" className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">TVOC</p>
            <p className="font-semibold">{data.tvoc} mg/m³</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <Heart size={24} weight="duotone" className="text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">HCHO</p>
            <p className="font-semibold">{data.hcho} mg/m³</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Recommendation:</strong> Air quality is {aqiLevel.label.toLowerCase()}. 
          {data.aqi <= 50 && " Great conditions for outdoor activities!"}
          {data.aqi > 50 && data.aqi <= 100 && " Consider reducing prolonged outdoor activities."}
          {data.aqi > 100 && " Limit outdoor exposure and keep windows closed."}
        </p>
      </div>
    </Card>
  )
}
