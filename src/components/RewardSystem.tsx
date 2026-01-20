import { useKV } from '@github/spark/hooks'
import { useEffect, useState } from 'react'
import { Coins } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

export interface RewardEvent {
  id: string
  amount: number
  message: string
  timestamp: number
}

export function useRewardSystem() {
  const [coins, setCoins] = useKV<number>('user-coins', 0)
  const [rewardQueue, setRewardQueue] = useState<RewardEvent[]>([])
  const [totalEarned, setTotalEarned] = useKV<number>('total-coins-earned', 0)

  const awardCoins = (amount: number, message: string) => {
    const event: RewardEvent = {
      id: `reward-${Date.now()}-${Math.random()}`,
      amount,
      message,
      timestamp: Date.now(),
    }

    setCoins((current = 0) => current + amount)
    setTotalEarned((current = 0) => current + amount)
    setRewardQueue((queue) => [...queue, event])

    setTimeout(() => {
      setRewardQueue((queue) => queue.filter((e) => e.id !== event.id))
    }, 3000)
  }

  const spendCoins = (amount: number): boolean => {
    let canSpend = false
    setCoins((current = 0) => {
      if (current >= amount) {
        canSpend = true
        return current - amount
      }
      return current
    })
    return canSpend
  }

  return {
    coins,
    totalEarned,
    awardCoins,
    spendCoins,
    rewardQueue,
  }
}

export function RewardNotifications({ events }: { events: RewardEvent[] }) {
  return (
    <div className="fixed top-24 right-6 z-50 pointer-events-none space-y-2">
      <AnimatePresence>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-xl border-2 border-amber-400/50 rounded-2xl px-6 py-4 shadow-2xl shadow-amber-500/20">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  <Coins size={28} weight="fill" className="text-amber-400" />
                </motion.div>
                <div>
                  <div className="text-amber-300 font-bold text-xl">
                    +{event.amount}
                  </div>
                  <div className="text-amber-200/80 text-sm font-medium">
                    {event.message}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function CoinDisplay({ amount }: { amount: number }) {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-xl border border-amber-400/30 rounded-xl px-4 py-2 shadow-lg shadow-amber-500/10">
      <Coins size={24} weight="fill" className="text-amber-400" />
      <motion.span
        key={amount}
        initial={{ scale: 1.3, color: '#fbbf24' }}
        animate={{ scale: 1, color: '#f59e0b' }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="font-bold text-lg"
      >
        {amount.toLocaleString()}
      </motion.span>
    </div>
  )
}
