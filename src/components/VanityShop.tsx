import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ShoppingCart,
  Star,
  Palette,
  Sparkle,
  CheckCircle,
  Image as ImageIcon,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export interface VanityItem {
  id: string
  name: string
  description: string
  price: number
  category: 'background' | 'theme' | 'effect'
  preview?: string
  gradient?: string
  isPremium?: boolean
}

const VANITY_ITEMS: VanityItem[] = [
  {
    id: 'bg-aurora',
    name: 'Aurora Borealis',
    description: 'Mesmerizing northern lights animation',
    price: 500,
    category: 'background',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  },
  {
    id: 'bg-sunset',
    name: 'Neon Sunset',
    description: 'Vibrant sunset with neon accents',
    price: 400,
    category: 'background',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 'bg-ocean',
    name: 'Deep Ocean',
    description: 'Calm underwater atmosphere',
    price: 450,
    category: 'background',
    gradient: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
  },
  {
    id: 'bg-matrix',
    name: 'Matrix Rain',
    description: 'Classic green code rain effect',
    price: 600,
    category: 'background',
    gradient: 'linear-gradient(135deg, #000000 0%, #0f9b0f 100%)',
    isPremium: true,
  },
  {
    id: 'bg-galaxy',
    name: 'Spiral Galaxy',
    description: 'Stunning cosmic spiral animation',
    price: 800,
    category: 'background',
    gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
    isPremium: true,
  },
  {
    id: 'bg-fire',
    name: 'Plasma Fire',
    description: 'Dynamic flames and embers',
    price: 550,
    category: 'background',
    gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
  },
  {
    id: 'theme-cyberpink',
    name: 'Cyber Pink',
    description: 'Hot pink cyberpunk vibes',
    price: 300,
    category: 'theme',
    gradient: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
  },
  {
    id: 'theme-emerald',
    name: 'Emerald Dream',
    description: 'Soothing green tones',
    price: 250,
    category: 'theme',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    id: 'theme-royal',
    name: 'Royal Purple',
    description: 'Luxurious purple palette',
    price: 350,
    category: 'theme',
    gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
  },
  {
    id: 'effect-particles',
    name: 'Particle Storm',
    description: 'Floating particle effects',
    price: 400,
    category: 'effect',
    gradient: 'radial-gradient(circle, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'effect-sparkles',
    name: 'Magic Sparkles',
    description: 'Twinkling star effects',
    price: 350,
    category: 'effect',
    gradient: 'radial-gradient(circle, #ffd700 0%, #ffed4e 100%)',
  },
  {
    id: 'effect-glow',
    name: 'Neon Glow',
    description: 'Enhanced glow effects',
    price: 300,
    category: 'effect',
    gradient: 'radial-gradient(circle, #00fff5 0%, #ff00ff 100%)',
  },
]

export function VanityShop({
  coins,
  onPurchase,
}: {
  coins: number
  onPurchase: (item: VanityItem) => void
}) {
  const [ownedItems, setOwnedItems] = useKV<string[]>('owned-vanity-items', [])
  const [activeBackground, setActiveBackground] = useKV<string>('active-background', '')
  const [activeTheme, setActiveTheme] = useKV<string>('active-theme', '')
  const [activeEffect, setActiveEffect] = useKV<string>('active-effect', '')

  const handlePurchase = (item: VanityItem) => {
    if ((ownedItems || []).includes(item.id)) {
      toast.info('Already owned', {
        description: `You already own ${item.name}`,
      })
      return
    }

    if (coins >= item.price) {
      onPurchase(item)
      setOwnedItems((items = []) => [...items, item.id])
      toast.success('Purchase successful!', {
        description: `You bought ${item.name}`,
      })
    } else {
      toast.error('Insufficient coins', {
        description: `You need ${item.price - coins} more coins`,
      })
    }
  }

  const handleActivate = (item: VanityItem) => {
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
          const owned = (ownedItems || []).includes(item.id)
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
                  'relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 card-gradient-hover',
                  active && 'ring-2 ring-primary shadow-primary/30'
                )}
              >
                <div
                  className="h-32 w-full relative"
                  style={{ background: item.gradient }}
                >
                  {item.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-amber-500 text-white border-amber-400">
                      <Star size={12} weight="fill" className="mr-1" />
                      Premium
                    </Badge>
                  )}
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

                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-amber-500/10 border-amber-500/30 text-amber-400"
                    >
                      {item.price} coins
                    </Badge>

                    {owned ? (
                      <Button
                        size="sm"
                        variant={active ? 'outline' : 'default'}
                        onClick={() => handleActivate(item)}
                        disabled={active}
                        className="gap-2"
                      >
                        {active ? (
                          <>
                            <CheckCircle size={16} weight="fill" />
                            Active
                          </>
                        ) : (
                          'Activate'
                        )}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handlePurchase(item)}
                        disabled={coins < item.price}
                        className="gap-2"
                      >
                        <ShoppingCart size={16} />
                        Buy
                      </Button>
                    )}
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-xl">
            <ShoppingCart className="text-primary" size={32} weight="duotone" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient-cyber">
              Vanity Shop
            </h2>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide">
              Customize Your Experience
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
