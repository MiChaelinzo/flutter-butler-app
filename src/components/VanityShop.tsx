import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Palette,
  Sparkle,
  CheckCircle,
  Image as ImageIcon,
  Swatches,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Confetti } from '@/components/Confetti'

export interface VanityItem {
  id: string
  name: string
  description: string
  category: 'background' | 'theme' | 'effect'
  preview?: string
  gradient?: string
}

const VANITY_ITEMS: VanityItem[] = [
  {
    id: 'bg-default',
    name: 'Default',
    description: 'Clean and minimal default background',
    category: 'background',
    gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
  },
  {
    id: 'bg-aurora',
    name: 'Aurora Borealis',
    description: 'Mesmerizing northern lights animation',
    category: 'background',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  },
  {
    id: 'bg-sunset',
    name: 'Neon Sunset',
    description: 'Vibrant sunset with neon accents',
    category: 'background',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 'bg-ocean',
    name: 'Deep Ocean',
    description: 'Calm underwater atmosphere',
    category: 'background',
    gradient: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
  },
  {
    id: 'bg-matrix',
    name: 'Matrix Rain',
    description: 'Classic green code rain effect',
    category: 'background',
    gradient: 'linear-gradient(135deg, #000000 0%, #0f9b0f 100%)',
  },
  {
    id: 'bg-galaxy',
    name: 'Spiral Galaxy',
    description: 'Stunning cosmic spiral animation',
    category: 'background',
    gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
  },
  {
    id: 'bg-fire',
    name: 'Plasma Fire',
    description: 'Dynamic flames and embers',
    category: 'background',
    gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
  },
  {
    id: 'theme-default',
    name: 'Default',
    description: 'Classic neutral theme',
    category: 'theme',
    gradient: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
  },
  {
    id: 'theme-cyberpink',
    name: 'Cyber Pink',
    description: 'Hot pink cyberpunk vibes',
    category: 'theme',
    gradient: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
  },
  {
    id: 'theme-emerald',
    name: 'Emerald Dream',
    description: 'Soothing green tones',
    category: 'theme',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    id: 'theme-royal',
    name: 'Royal Purple',
    description: 'Luxurious purple palette',
    category: 'theme',
    gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
  },
  {
    id: 'effect-none',
    name: 'None',
    description: 'No special effects',
    category: 'effect',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
  },
  {
    id: 'effect-snow',
    name: 'Snowfall',
    description: 'Gentle falling snowflakes',
    category: 'effect',
    gradient: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)',
  },
  {
    id: 'effect-particles',
    name: 'Particle Storm',
    description: 'Floating particle effects',
    category: 'effect',
    gradient: 'radial-gradient(circle, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'effect-sparkles',
    name: 'Magic Sparkles',
    description: 'Twinkling star effects',
    category: 'effect',
    gradient: 'radial-gradient(circle, #ffd700 0%, #ffed4e 100%)',
  },
  {
    id: 'effect-bubbles',
    name: 'Rising Bubbles',
    description: 'Floating bubble effects',
    category: 'effect',
    gradient: 'radial-gradient(circle, #00fff5 0%, #00d4ff 100%)',
  },
  {
    id: 'effect-fireflies',
    name: 'Fireflies',
    description: 'Glowing firefly effects',
    category: 'effect',
    gradient: 'radial-gradient(circle, #ffff00 0%, #90ee90 100%)',
  },
  {
    id: 'effect-hearts',
    name: 'Floating Hearts',
    description: 'Rising heart particles',
    category: 'effect',
    gradient: 'radial-gradient(circle, #ff1493 0%, #ffb6c1 100%)',
  },
  {
    id: 'effect-stars',
    name: 'Shooting Stars',
    description: 'Streaking shooting stars',
    category: 'effect',
    gradient: 'radial-gradient(circle, #ffffff 0%, #c8dcff 100%)',
  },
  {
    id: 'effect-glow',
    name: 'Neon Glow',
    description: 'Enhanced glow effects',
    category: 'effect',
    gradient: 'radial-gradient(circle, #00fff5 0%, #ff00ff 100%)',
  },
]

export function VanityShop() {
  const [activeBackground, setActiveBackground] = useKV<string>('active-background', 'bg-default')
  const [activeTheme, setActiveTheme] = useKV<string>('active-theme', 'theme-default')
  const [activeEffect, setActiveEffect] = useKV<string>('active-effect', 'effect-none')
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSelect = (item: VanityItem) => {
    switch (item.category) {
      case 'background':
        setActiveBackground(item.id)
        break
      case 'theme':
        setActiveTheme(item.id)
        break
      case 'effect':
        setActiveEffect(item.id)
        break
    }
    
    setShowConfetti(true)
    
    toast.success('Applied!', {
      description: `${item.name} is now active`,
    })
  }

  const isActive = (item: VanityItem) => {
    switch (item.category) {
      case 'background':
        return activeBackground === item.id
      case 'theme':
        return activeTheme === item.id
      case 'effect':
        return activeEffect === item.id
      default:
        return false
    }
  }

  const renderItems = (category: VanityItem['category']) => {
    const items = VANITY_ITEMS.filter((item) => item.category === category)

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => {
          const active = isActive(item)

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={cn(
                  'relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 card-gradient-hover cursor-pointer',
                  active && 'ring-2 ring-primary shadow-primary/30'
                )}
                onClick={() => !active && handleSelect(item)}
              >
                <div
                  className="h-32 w-full relative"
                  style={{ background: item.gradient }}
                >
                  {active && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle size={16} weight="fill" className="mr-1" />
                        Active
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-end">
                    <Button
                      size="sm"
                      variant={active ? 'outline' : 'default'}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelect(item)
                      }}
                      disabled={active}
                      className="gap-2"
                    >
                      {active ? (
                        <>
                          <CheckCircle size={16} weight="fill" />
                          Active
                        </>
                      ) : (
                        <>
                          <Swatches size={16} weight="duotone" />
                          Select
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Confetti 
        active={showConfetti} 
        duration={2500} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-xl">
            <Swatches className="text-primary" size={32} weight="duotone" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Customization
            </h2>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide">
              All Items Free • Select to Apply
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="backgrounds" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/80 backdrop-blur-xl">
          <TabsTrigger value="backgrounds" className="gap-2">
            <ImageIcon size={18} weight="duotone" />
            Backgrounds
          </TabsTrigger>
          <TabsTrigger value="themes" className="gap-2">
            <Palette size={18} weight="duotone" />
            Themes
          </TabsTrigger>
          <TabsTrigger value="effects" className="gap-2">
            <Sparkle size={18} weight="duotone" />
            Effects
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[600px]">
          <TabsContent value="backgrounds" className="mt-0">
            {renderItems('background')}
          </TabsContent>
          <TabsContent value="themes" className="mt-0">
            {renderItems('theme')}
          </TabsContent>
          <TabsContent value="effects" className="mt-0">
            {renderItems('effect')}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
