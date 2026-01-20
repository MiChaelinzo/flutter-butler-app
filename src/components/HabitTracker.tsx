import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CheckCircle, Circle, Plus, Flame, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Habit } from '@/lib/types'
import { toast } from 'sonner'

export function HabitTracker() {
  const [habits, setHabits] = useKV<Habit[]>('butler-habits', [])
  const [newHabitName, setNewHabitName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const addHabit = () => {
    if (!newHabitName.trim()) return

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      completedDates: [],
      createdAt: Date.now()
    }

    setHabits((current) => [...(current || []), newHabit])
    setNewHabitName('')
    setDialogOpen(false)
    toast.success('Habit added')
  }

  const toggleHabitToday = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0]
    
    setHabits((current) =>
      (current || []).map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(today)
          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter(d => d !== today)
              : [...habit.completedDates, today]
          }
        }
        return habit
      })
    )
  }

  const deleteHabit = (habitId: string) => {
    setHabits((current) => (current || []).filter(h => h.id !== habitId))
    toast.success('Habit removed')
  }

  const getStreak = (habit: Habit): number => {
    if (habit.completedDates.length === 0) return 0
    
    const sortedDates = [...habit.completedDates].sort().reverse()
    let streak = 0
    let currentDate = new Date()
    
    for (let i = 0; i < sortedDates.length; i++) {
      const checkDate = currentDate.toISOString().split('T')[0]
      if (sortedDates[i] === checkDate) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else if (i === 0 && sortedDates[i] !== checkDate) {
        break
      } else {
        break
      }
    }
    
    return streak
  }

  const isCompletedToday = (habit: Habit): boolean => {
    const today = new Date().toISOString().split('T')[0]
    return habit.completedDates.includes(today)
  }

  return (
    <Card className="shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3.5 text-2xl sm:text-3xl font-bold">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/15 flex items-center justify-center border border-accent/40 shadow-lg shadow-accent/20">
              <Flame className="text-accent" size={24} weight="duotone" />
            </div>
            Habits
          </CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg">
                <Plus size={20} weight="bold" />
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-border/50 bg-card/95 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3.5 text-2xl font-bold">
                  <Flame className="text-accent" size={24} weight="duotone" />
                  Add New Habit
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-5 mt-4">
                <Input
                  placeholder="e.g., Meditate for 10 minutes"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                  className="h-12 rounded-2xl border border-border/50 text-sm sm:text-base bg-muted/30 backdrop-blur-sm"
                  id="new-habit-input"
                />
                <Button 
                  onClick={addHabit} 
                  disabled={!newHabitName.trim()}
                  className="w-full h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                >
                  Add Habit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {(habits || []).length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/10 mx-auto mb-5 flex items-center justify-center border border-accent/30">
              <Flame size={40} className="opacity-40" weight="duotone" />
            </div>
            <p className="text-base sm:text-lg font-bold text-foreground">No habits yet</p>
            <p className="text-sm sm:text-base mt-2 font-medium">Start building better routines today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(habits || []).map((habit) => {
              const streak = getStreak(habit)
              const completed = isCompletedToday(habit)
              
              return (
                <div
                  key={habit.id}
                  className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-accent/5 hover:border-accent/40 hover:shadow-lg transition-all group card-gradient-hover-success"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleHabitToday(habit.id)}
                    className={`h-12 w-12 rounded-xl flex-shrink-0 ${
                      completed
                        ? 'bg-accent/20 hover:bg-accent/30 text-accent'
                        : 'hover:bg-muted/80'
                    }`}
                  >
                    {completed ? (
                      <CheckCircle size={28} weight="fill" />
                    ) : (
                      <Circle size={28} weight="regular" />
                    )}
                  </Button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm sm:text-base font-bold leading-snug ${completed ? 'text-foreground' : 'text-foreground'}`}>
                      {habit.name}
                    </p>
                    {streak > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <Flame size={16} weight="fill" className="text-accent" />
                        <span className="text-xs sm:text-sm text-accent font-bold">
                          {streak} day{streak !== 1 ? 's' : ''} streak
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteHabit(habit.id)}
                    className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/15 rounded-xl opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                  >
                    <Trash size={18} weight="bold" />
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
