import { createContext, useContext, ReactNode } from 'react'
import { useRewardSystem } from './RewardSystem'

interface RewardContextType {
  coins: number
  totalEarned: number
  awardCoins: (amount: number, message: string) => void
  spendCoins: (amount: number) => boolean
}

const RewardContext = createContext<RewardContextType | undefined>(undefined)

export function RewardProvider({ children }: { children: ReactNode }) {
  const { coins, totalEarned, awardCoins, spendCoins } = useRewardSystem()

  return (
    <RewardContext.Provider value={{ coins: coins || 0, totalEarned: totalEarned || 0, awardCoins, spendCoins }}>
      {children}
    </RewardContext.Provider>
  )
}

export function useRewards() {
  const context = useContext(RewardContext)
  if (!context) {
    throw new Error('useRewards must be used within RewardProvider')
  }
  return context
}

export const REWARD_AMOUNTS = {
  TASK_COMPLETE: 50,
  GOAL_COMPLETE: 100,
  HABIT_COMPLETE: 30,
  FOCUS_SESSION: 75,
  NOTE_CREATE: 20,
  AUTOMATION_RUN: 40,
}
