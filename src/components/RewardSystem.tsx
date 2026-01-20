import { useKV } from '@github/spark/hooks'
import { Coins } from '@phosphor-icons/reac

  id: string

export interface RewardEvent {
  id: string
  amount: number
  message: string
  timestamp: number
 

      id: `reward-${Date.now()}-${M
      message,
    }
    setCoins((current = 0) => current + amount)

    setTimeout(() => {
    }, 3000)

      amount,
      message,
      timestamp: Date.now(),
    }

    setCoins((current) => current + amount)
    setTotalEarned((current) => current + amount)
    setRewardQueue((queue) => [...queue, event])

    setTimeout(() => {
      setRewardQueue((queue) => queue.filter((e) => e.id !== event.id))
    }, 3000)
  }

  const spendCoins = (amount: number): boolean => {
    let canSpend = false
    setCoins((current) => {
      if (current >= amount) {
        canSpend = true
        return current - amount
export 
    <div className="
      
            key={ev
   

          
          
                
               
               
                
   
 

                  </div>
          
                </div>
            </div>
        ))}
    </div>
}
export function CoinDisplay({ amount }: { amount: number
    <div className="flex items-center gap-2 bg-gradi
      <motion.span
        initial={{ scale: 1.3, color: '#fbbf24' }}
        transition={{ type: 'spr
      >
      </motion.span>
  )













































