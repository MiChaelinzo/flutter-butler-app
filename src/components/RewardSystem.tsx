import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'fram
import { motion, AnimatePresence } from 'framer-motion'

  timestamp: number

  const [coins, 
  const [rewardQu
  const awardCoins 
 

    }
    setCoins((current = 0) => current + amount)
    setRewardQueue((queue = []) => [...queue, event])
    setTimeout(() => {


    let canSpend = false
      if (current >= amount) {
        retur
      return c
    return canSpend


export function RewardNotifications({ events }:
    <div className="fixed top-24 right-4 z-50 space-y
        {events.map((event) => (

            animate={{
            className="bg-card border border-border rounded-xl p-4 shadow-lg
            
   

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

  return { coins, totalEarned, awardCoins, spendCoins, rewardQueue }
}

export function RewardNotifications({ events }: { events: RewardEvent[] }) {
  return (
    <div className="fixed top-24 right-4 z-50 space-y-2">
      <AnimatePresence>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-xl flex items-center gap-3 min-w-[280px]"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Coins size={24} weight="duotone" className="text-primary" />




























