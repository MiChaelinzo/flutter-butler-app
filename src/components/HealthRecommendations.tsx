import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Drop, Wind, Leaf } from '@phosphor-icons/react'

  hcho: number
}
interface Heal
}
  hcho: number
  aqi: number
}

interface HealthRecommendationsProps {
  airQuality?: AirQualityData
}

  const data = airQuality || defaultAirQuality

    <Card className="p-6">
        <div className="flex items-center gap-3">
            <Heart size={20} weight="duotone" className="text-lime" />
          <div>
   

          {aqiLevel.label}
      </div>
      <div cl
          <Win
            <p 
          <


            <p className="text-xs text-muted-f
          </div>

          
            <p className="
          </div>

          <Heart size={24} weight="duotone" className="text-primary" />
            <p className="text-xs text-muted-foreground">HCHO</p>
          </div>
      </div>
      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-
          <strong className="text-foreground">Recommendation:</strong> Air qual
          {data.
        </p>
    </Card>
}
















































