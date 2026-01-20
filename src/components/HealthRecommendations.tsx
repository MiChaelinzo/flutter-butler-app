import { Card } from '@/components/ui/card'
import { Heart, Drop, Wind, Leaf } from '@pho
import { Heart, Drop, Wind, Leaf } from '@phosphor-icons/react'

  humidity: number
  voc: number
  aqi: number

  airQuality?: Air

  pm25: 12,
  co2: 450,
  temperature
 

const getAQILevel = (aqi: number) => {
  if (aqi <= 100) return { la
 

  const aqiLevel = getAQILevel(airQuality.a
  return (
      <div 
          <
        <div>
          <p class
      </div
      <div cl
         
 

              {aqiLevel.label}
          </div>
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
}





















































