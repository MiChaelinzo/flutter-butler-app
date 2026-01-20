import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
interface AirQualityData {

  tvoc: number
  aqi: number
}
interface Heal
  description:
  priority: 'h
}
interface HealthRecommendationsProps {
}

interface HealthRecommendation {
  title: string
  description: string
  icon: any
  priority: 'high' | 'medium' | 'low'
  category: 'exercise' | 'indoor' | 'protection' | 'ventilation' | 'medical'
}

interface HealthRecommendationsProps {
  airQuality: AirQualityData
}

export function HealthRecommendations({ airQuality }: HealthRecommendationsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const getHealthRisks = (): string[] => {
    const risks: string[] = []

    if (airQuality.co2 > 2000) {
      risks.push('High CO₂ levels can cause drowsiness, headaches, and reduced cognitive function')
    } else if (airQuality.co2 > 1000) {
      risks.push('Elevated CO₂ may impact concentration and decision-making')
    }

    if (airQuality.pm25 > 35) {
      risks.push('High PM2.5 can irritate airways, worsen asthma, and affect heart function')
    } else if (airQuality.pm25 > 12) {
      risks.push('Moderate PM2.5 may cause mild respiratory irritation in sensitive individuals')
    }

    if (airQuality.pm10 > 155) {
      risks.push('High PM10 levels can trigger respiratory symptoms and allergies')
    } else if (airQuality.pm10 > 54) {
      risks.push('Elevated PM10 may irritate nose, throat, and airways')
    }

    if (airQuality.tvoc > 660) {
      risks.push('High VOC levels can cause eye irritation, headaches, and nausea')
    } else if (airQuality.tvoc > 220) {
      risks.push('Moderate VOCs may lead to mild discomfort and fatigue')
    }

    if (airQuality.hcho > 100) {
      risks.push('High formaldehyde can cause severe respiratory irritation and allergic reactions')
    } else if (airQuality.hcho > 50) {
      risks.push('Elevated formaldehyde may irritate eyes, nose, and throat')
    }

        icon: PersonSimpleRun
        category: 'exercise',
     

        priority
   

        description: 'Air quality is good for most people. Y
        priority: 'low',

        title: 'Moderate Ventil
        icon: House,
        category: 'ventilation',
    } else if (airQuality.aqi <= 150) {
        title: 'Reduce Outdoor
        icon: Warning,
        category: 'exercise',
      re
        description: 'Keep w
        priority: 'medium',
      })
        title: 'Con
        icon: MaskHappy,
        category: 'protection',
    } el
        title: 'Avoid Outdoor Exercise'
        icon: X,
        category: 'exercise',
      recommendations.push({
        description: '
        priority: 'high'
      })
        
        icon: MaskHappy,
        category: 'protection',
      recommendations.push({
        description:
        priority: 'high',
      })
      re
        description: 'Air quality is ha
        priority: 'high',
      })
        title: 'Maximum Air Filtration',
        icon: Wind,
        category: 'indoor',
      recommendations.push({
        
        priority: 'high',
      })
        title: 'Seek Medical Attention if Needed',
        icon: First
        category: 'medical'
    }
    if (
        title: 'Improve Indo
        icon: Wind,
        category: 'ventilation',
    }
    if (airQuality.hcho > 5
        title: 'Reduce Formalde
        
        category: 'indoor',
    }
    if (airQuality.tvoc > 220) {
        title: 'Minimize VOC Exposure',
        icon: Le
        category: 'indoor
    }
    retu

    switch (status) {
      case 'good':
      case 'moderate
      case 'poor':
      case 'unhealthy':
      de
    }

    switch (status) {
      case 'good': retur
      case 'poor': return
      default: return 'text-mut
  }
  const getPriorityColor = (
      case 'high': return 'task-priority-
      case 'low': return 'task-priority-low'
    }

    switch (category) {
      ca
      case '
      default: return Heart
  }
  const healthRisks = getHealthRisks()

    <div className="space
        <div className="w-1
        
          <h3 className="tex
            Personalized guidance based 
        </div>
          AQI {airQ
      </div>
      <Card className="p-6 
        
          </div>
        </div>
          {healthRisks.map((risk, idx) => (
              {healthRis
              ) : (
              )}
        
        </div>

        <div className="flex items-center gap-3">
            <ListChecks
          <h4 className="
        
        
     

              <Card
                className={`
              >
                  <div className="flex items-start justify-between gap-3">
                   
                          ? 'bg-red-500/15 border border-red
                          ? 'bg-
        
     

                              ?
                            
                          }
                      </div>
                   
                          <p className="text-sm text-muted-f
                          <
        
     

                          rec.pr
                            
                            : 'border-l
                      >
                   
                        <CategoryIcon size={14} weight="duot
                    </div>
        
     

                    >
   

            )
        </div>

        <div class
          <div className="space-y-2">
            <ul classN
              <li>• Monitor symptoms and consult healthcare providers if condit
              <li>
          </div>
      </Card>
  )




















































































































































































