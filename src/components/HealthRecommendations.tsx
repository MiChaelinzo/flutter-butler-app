import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Drop, Wind, Leaf } from '@phosphor-icons/react'

  pm10: number
  pm25: number
  pm10: number
  co2: number
  airQuality?: Air

  pm25: 12,
  co2: 450,
  temperature
 

const getAQILevel = (aqi: number) => {
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
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Air Quality Index</p>
        </div>
          {aqiLevel.label}
 

          <Wind size={24} weight="duotone" className=
          <p className="text-xs text-

          <Leaf si
          <p className="text-xs text-muted-foreground">CO2 ppm</p>

          <Drop siz
          <p className="text-xs text-muted-foreground">Humidity</p>

          <Heart size={24} weight="duot
          <p className="t
      </div>
      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-p
   
      </div>
 























































