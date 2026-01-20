import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
export interface RewardEvent {

export interface RewardEvent {
  id: string
  amount: number
  message: string
  const awardCoins 
 

    }
    setTotalEarned((current = 0) => current + amount)
    
      setRewardQueue((queue = []) => queue.filter(e => e.id !== event.id))

  const awardCoins = (amount: number, message: string) => {
    const event: RewardEvent = {
      id: `${Date.now()}-${Math.random()}`,
      amount,
      message,
      timestamp: Date.now(),
    }
    setCoins((current = 0) => current + amount)
    setTotalEarned((current = 0) => current + amount)
    setRewardQueue((queue = []) => [...queue, event])
    
    setTimeout(() => {
      setRewardQueue((queue = []) => queue.filter(e => e.id !== event.id))
    }, 3000)
  }

  return (
    let canSpend = false
        {events.map((event) => 
      if (current >= amount) {
            initial={{ 
        return current - amount
       
      return current
      
    return canSpend
   

  return { coins, totalEarned, awardCoins, spendCoins, rewardQueue }
}

export function RewardNotifications({ events }: { events: RewardEvent[] }) {

    <div className="fixed top-24 right-4 z-50 space-y-2">
    <div className="fle
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}

            className="bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-xl flex items-center gap-3 min-w-[280px]"

            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Coins size={24} weight="duotone" className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{event.message}</p>
              <p className="text-xs text-muted-foreground">+{event.amount} coins</p>
            </div>

        ))}

    </div>

}

export function CoinDisplay({ amount }: { amount: number }) {

    <div className="flex items-center gap-2 px-4 h-12 bg-card/80 backdrop-blur-xl border border-border rounded-xl">
      <Coins size={20} weight="duotone" className="text-primary" />
      <span className="font-bold text-sm">{amount.toLocaleString()}</span>

  )

