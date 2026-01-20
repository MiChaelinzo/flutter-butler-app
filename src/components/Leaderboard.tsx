import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Trophy, Crown, Medal, Coins, TrendUp } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export interface LeaderboardEntry {
  id: string
  username: string
  avatar?: string
  coins: number
  totalEarned: number
  tasksCompleted: number
  level: number
  rank: number
}

export function Leaderboard({ userCoins, userTotalEarned }: { userCoins: number; userTotalEarned: number }) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [currentUser] = useKV('current-user-id', 'user-1')

  useEffect(() => {
    const generateLeaderboard = async () => {
      const mockData: LeaderboardEntry[] = [
        {
          id: 'user-1',
          username: 'You',
          coins: userCoins,
          totalEarned: userTotalEarned,
          tasksCompleted: Math.floor(userTotalEarned / 50),
          level: Math.floor(userTotalEarned / 500) + 1,
          rank: 0,
        },
        {
          id: 'user-2',
          username: 'CyberNinja',
          coins: 3500,
          totalEarned: 8200,
          tasksCompleted: 164,
          level: 17,
          rank: 0,
        },
        {
          id: 'user-3',
          username: 'TaskMaster',
          coins: 2800,
          totalEarned: 7600,
          tasksCompleted: 152,
          level: 16,
          rank: 0,
        },
        {
          id: 'user-4',
          username: 'ProductivityPro',
          coins: 2200,
          totalEarned: 6400,
          tasksCompleted: 128,
          level: 13,
          rank: 0,
        },
        {
          id: 'user-5',
          username: 'FocusedFlow',
          coins: 1900,
          totalEarned: 5800,
          tasksCompleted: 116,
          level: 12,
          rank: 0,
        },
        {
          id: 'user-6',
          username: 'GoalGetter',
          coins: 1600,
          totalEarned: 4900,
          tasksCompleted: 98,
          level: 10,
          rank: 0,
        },
        {
          id: 'user-7',
          username: 'EfficiencyExpert',
          coins: 1300,
          totalEarned: 4200,
          tasksCompleted: 84,
          level: 9,
          rank: 0,
        },
        {
          id: 'user-8',
          username: 'HabitHero',
          coins: 1100,
          totalEarned: 3700,
          tasksCompleted: 74,
          level: 8,
          rank: 0,
        },
      ]

      const sorted = mockData.sort((a, b) => b.totalEarned - a.totalEarned)
      sorted.forEach((entry, index) => {
        entry.rank = index + 1
      })

      setLeaderboardData(sorted)
    }

    generateLeaderboard()
  }, [userCoins, userTotalEarned])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={28} weight="fill" className="text-amber-400" />
      case 2:
        return <Medal size={28} weight="fill" className="text-gray-400" />
      case 3:
        return <Medal size={28} weight="fill" className="text-amber-600" />
      default:
        return <div className="text-muted-foreground font-bold text-lg">#{rank}</div>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-amber-500 to-yellow-500'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500'
      case 3:
        return 'bg-gradient-to-r from-amber-700 to-amber-600'
      default:
        return 'bg-gradient-to-r from-primary/20 to-accent/20'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/5 border border-amber-400/30 flex items-center justify-center backdrop-blur-xl">
          <Trophy className="text-amber-400" size={32} weight="duotone" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient-cyber">
            Leaderboard
          </h2>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide">
            Top Performers
          </p>
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-3">
          {leaderboardData.map((entry, index) => {
            const isCurrentUser = entry.id === currentUser

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`p-4 transition-all duration-300 hover:shadow-lg card-gradient-hover ${
                    isCurrentUser
                      ? 'ring-2 ring-primary shadow-primary/30 bg-primary/5'
                      : 'hover:shadow-primary/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16">
                      {getRankIcon(entry.rank)}
                    </div>

                    <Avatar className="w-12 h-12 border-2 border-border">
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback className="font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                        {entry.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg truncate">
                          {entry.username}
                        </h3>
                        {isCurrentUser && (
                          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <TrendUp size={14} />
                          <span>Level {entry.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{entry.tasksCompleted} tasks</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5 mb-1">
                        <Coins size={20} weight="fill" className="text-amber-400" />
                        <span className="font-bold text-xl text-amber-400">
                          {entry.totalEarned.toLocaleString()}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-amber-500/10 border-amber-500/30 text-xs"
                      >
                        {entry.coins} available
                      </Badge>
                    </div>
                  </div>

                  {entry.rank <= 3 && (
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${getRankBadgeColor(
                        entry.rank
                      )}`}
                    />
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
