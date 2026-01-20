import { Card } from '@/components/ui/card'
import { Heart, Bicycle, Wind, X, CheckCircle, Warning, FirstAid, ListChecks, Leaf, Skull, Plant, Fire, AirplaneTilt, House, PersonSimpleRun, MaskHappy, Sunglasses, Drop } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface AirQualityData {
  co2: number
  pm25: number
  pm10: number
  tvoc: number
  hcho: number
  aqi: number
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'unhealthy'
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

    if (risks.length === 0) {
      risks.push('Air quality is excellent - no significant health risks detected')
    }

    return risks
  }

  const getRecommendations = (): HealthRecommendation[] => {
    const recommendations: HealthRecommendation[] = []

    if (airQuality.aqi <= 50) {
      recommendations.push({
        title: 'Perfect for Outdoor Activities',
        description: 'Air quality is excellent. This is an ideal time for outdoor exercise, running, cycling, or any physical activities. All age groups can enjoy extended outdoor time.',
        icon: PersonSimpleRun,
        priority: 'low',
        category: 'exercise',
      })
      recommendations.push({
        title: 'Natural Ventilation',
        description: 'Open windows and doors to bring fresh air indoors. This will naturally improve indoor air quality and reduce any accumulated indoor pollutants.',
        icon: Wind,
        priority: 'low',
        category: 'ventilation',
      })
    } else if (airQuality.aqi <= 100) {
      recommendations.push({
        title: 'Safe for Most Activities',
        description: 'Air quality is good for most people. You can engage in outdoor activities, but sensitive individuals (children, elderly, those with respiratory conditions) should monitor for any symptoms.',
        icon: Bicycle,
        priority: 'low',
        category: 'exercise',
      })
      recommendations.push({
        title: 'Moderate Ventilation',
        description: 'Ventilate indoor spaces periodically. Open windows during times of peak outdoor air quality, typically early morning or late evening.',
        icon: House,
        priority: 'medium',
        category: 'ventilation',
      })
    } else if (airQuality.aqi <= 150) {
      recommendations.push({
        title: 'Reduce Outdoor Exertion',
        description: 'Sensitive groups should reduce prolonged or heavy outdoor exertion. Take more breaks and limit time spent outdoors if you experience coughing or breathing discomfort.',
        icon: Warning,
        priority: 'medium',
        category: 'exercise',
      })
      recommendations.push({
        title: 'Use Air Filtration',
        description: 'Keep windows closed and use air purifiers with HEPA filters indoors. Consider using exhaust fans when cooking to prevent indoor pollutant buildup.',
        icon: Wind,
        priority: 'medium',
        category: 'indoor',
      })
      recommendations.push({
        title: 'Consider Light Protection',
        description: 'If you must go outside, consider wearing a face mask rated N95 or higher, especially during extended outdoor activities.',
        icon: MaskHappy,
        priority: 'medium',
        category: 'protection',
      })
    } else if (airQuality.aqi <= 200) {
      recommendations.push({
        title: 'Avoid Outdoor Exercise',
        description: 'Everyone should avoid prolonged outdoor exertion. If you must exercise, do so indoors in a well-filtered environment. Watch for symptoms like chest tightness or shortness of breath.',
        icon: X,
        priority: 'high',
        category: 'exercise',
      })
      recommendations.push({
        title: 'Seal Indoor Spaces',
        description: 'Keep all windows and doors closed. Run air purifiers on high settings. Use weather stripping to seal gaps and prevent outdoor air from entering.',
        icon: House,
        priority: 'high',
        category: 'indoor',
      })
      recommendations.push({
        title: 'Wear Protective Masks',
        description: 'Wear N95 or KN95 masks when going outdoors. Ensure proper fit for maximum protection. Replace masks after 8 hours of use or when breathing becomes difficult.',
        icon: MaskHappy,
        priority: 'high',
        category: 'protection',
      })
      recommendations.push({
        title: 'Monitor Health Symptoms',
        description: 'Check for breathing difficulties, chest pain, or severe coughing. Those with pre-existing conditions should have medications readily available and consider consulting healthcare providers.',
        icon: FirstAid,
        priority: 'high',
        category: 'medical',
      })
    } else {
      recommendations.push({
        title: 'Stay Indoors - Health Emergency',
        description: 'Air quality is hazardous. Everyone should remain indoors with windows and doors sealed. Avoid all physical exertion. This level poses serious health risks to all individuals.',
        icon: Skull,
        priority: 'high',
        category: 'indoor',
      })
      recommendations.push({
        title: 'Maximum Air Filtration',
        description: 'Run multiple HEPA air purifiers on maximum settings. Create a clean air room where family members can gather. Consider evacuation if air quality does not improve.',
        icon: Wind,
        priority: 'high',
        category: 'indoor',
      })
      recommendations.push({
        title: 'Essential Travel Only with N95',
        description: 'Only go outside for essential needs. Wear properly fitted N95 or P100 respirators. Minimize time outdoors to absolute necessity (under 30 minutes if possible).',
        icon: MaskHappy,
        priority: 'high',
        category: 'protection',
      })
      recommendations.push({
        title: 'Seek Medical Attention if Needed',
        description: 'Watch for severe symptoms: difficulty breathing, persistent chest pain, or bluish lips. Seek immediate emergency medical care if symptoms worsen. Have emergency contacts ready.',
        icon: FirstAid,
        priority: 'high',
        category: 'medical',
      })
    }

    if (airQuality.co2 > 1000) {
      recommendations.push({
        title: 'Improve Indoor Ventilation',
        description: `CO₂ levels at ${airQuality.co2} ppm indicate poor ventilation. Increase air circulation with fans, open windows if outdoor air quality permits, or reduce occupancy in the space.`,
        icon: Wind,
        priority: airQuality.co2 > 2000 ? 'high' : 'medium',
        category: 'ventilation',
      })
    }

    if (airQuality.hcho > 50) {
      recommendations.push({
        title: 'Reduce Formaldehyde Sources',
        description: `Formaldehyde at ${airQuality.hcho} μg/m³ may come from furniture, fabrics, or cleaning products. Increase ventilation, use low-VOC products, and consider removing sources if possible.`,
        icon: Drop,
        priority: airQuality.hcho > 100 ? 'high' : 'medium',
        category: 'indoor',
      })
    }

    if (airQuality.tvoc > 220) {
      recommendations.push({
        title: 'Minimize VOC Exposure',
        description: `VOC levels at ${airQuality.tvoc} ppb suggest indoor pollution. Avoid using aerosols, paints, or strong cleaning chemicals. Consider using activated carbon air filters.`,
        icon: Leaf,
        priority: airQuality.tvoc > 660 ? 'high' : 'medium',
        category: 'indoor',
      })
    }

    return recommendations
  }

  const getAirQualityIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <Leaf className="text-lime" size={24} weight="duotone" />
      case 'moderate':
        return <Plant className="text-yellow-500" size={24} weight="duotone" />
      case 'poor':
        return <Fire className="text-orange" size={24} weight="duotone" />
      case 'unhealthy':
        return <Skull className="text-red-500" size={24} weight="duotone" />
      default:
        return <AirplaneTilt className="text-muted-foreground" size={24} weight="duotone" />
    }
  }

  const getAirQualityColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-lime bg-lime/10 border-lime/20'
      case 'good': return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'moderate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'poor': return 'text-orange bg-orange/10 border-orange/20'
      case 'unhealthy': return 'text-red-500 bg-red-500/10 border-red-500/20'
      default: return 'text-muted-foreground bg-muted/10 border-border/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'task-priority-high'
      case 'medium': return 'task-priority-medium'
      case 'low': return 'task-priority-low'
      default: return ''
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exercise': return PersonSimpleRun
      case 'indoor': return House
      case 'protection': return MaskHappy
      case 'ventilation': return Wind
      case 'medical': return FirstAid
      default: return Heart
    }
  }

  const healthRisks = getHealthRisks()
  const recommendations = getRecommendations()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20">
          {getAirQualityIcon(airQuality.status)}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-bold">Health Recommendations</h3>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Personalized guidance based on current air quality
          </p>
        </div>
        <Badge className={`${getAirQualityColor(airQuality.status)} border font-semibold px-4 py-2 text-sm`}>
          AQI {airQuality.aqi}
        </Badge>
      </div>

      <Card className="p-6 border-border bg-gradient-to-br from-card to-muted/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center border border-red-500/20">
            <Warning className="text-red-500" size={20} weight="duotone" />
          </div>
          <h4 className="text-lg font-bold">Health Impact Assessment</h4>
        </div>
        <div className="space-y-3">
          {healthRisks.map((risk, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-background/60">
              {healthRisks.length === 1 && risk.includes('excellent') ? (
                <CheckCircle size={20} weight="duotone" className="text-lime flex-shrink-0 mt-0.5" />
              ) : (
                <Warning size={20} weight="duotone" className="text-orange flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm leading-relaxed">{risk}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
            <ListChecks className="text-primary" size={20} weight="duotone" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold">Recommended Actions</h4>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recommendations.map((rec, idx) => {
            const IconComponent = rec.icon
            const CategoryIcon = getCategoryIcon(rec.category)
            const isExpanded = expandedCard === idx

            return (
              <Card
                key={idx}
                className={`p-5 border transition-all duration-300 cursor-pointer hover:shadow-lg ${getPriorityColor(rec.priority)}`}
                onClick={() => setExpandedCard(isExpanded ? null : idx)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        rec.priority === 'high' 
                          ? 'bg-red-500/15 border border-red-500/20'
                          : rec.priority === 'medium'
                          ? 'bg-orange/15 border border-orange/20'
                          : 'bg-lime/15 border border-lime/20'
                      }`}>
                        <IconComponent 
                          size={24} 
                          weight="duotone" 
                          className={
                            rec.priority === 'high' 
                              ? 'text-red-500'
                              : rec.priority === 'medium'
                              ? 'text-orange'
                              : 'text-lime'
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-base font-semibold mb-1 leading-tight">{rec.title}</h5>
                        {isExpanded && (
                          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                            {rec.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-semibold ${
                          rec.priority === 'high' 
                            ? 'border-red-500/30 text-red-500 bg-red-500/10'
                            : rec.priority === 'medium'
                            ? 'border-orange/30 text-orange bg-orange/10'
                            : 'border-lime/30 text-lime bg-lime/10'
                        }`}
                      >
                        {rec.priority.toUpperCase()}
                      </Badge>
                      <div className="w-6 h-6 rounded-md bg-muted/30 flex items-center justify-center">
                        <CategoryIcon size={14} weight="duotone" className="text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  {!isExpanded && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs text-muted-foreground hover:text-foreground h-7"
                    >
                      Tap to expand
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="p-5 border-l-4 border-primary bg-gradient-to-br from-primary/5 to-card">
        <div className="flex gap-3">
          <Heart size={20} weight="duotone" className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-semibold">General Health Tips</p>
            <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• Stay hydrated - drink at least 8 glasses of water daily</li>
              <li>• Monitor symptoms and consult healthcare providers if conditions worsen</li>
              <li>• Keep emergency contacts and medications readily accessible</li>
              <li>• Check air quality regularly and adjust activities accordingly</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
