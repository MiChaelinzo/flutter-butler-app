import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AirQualityData {
  co2: number
  pm25: number
  pm10: number
  tvoc: number
  hcho: number
  aqi: number
}

interface HealthRecommendationsProps {
  airQuality: AirQualityData
}

export function HealthRecommendations({ airQuality }: HealthRecommendationsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Health Recommendations</h3>
        <Badge>AQI {airQuality.aqi}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Health recommendations based on current air quality data.
      </p>
    </Card>
  )
}
