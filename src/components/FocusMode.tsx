import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Timer, Play, Pause, X, CheckCircle } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { GrowingPlant } from './GrowingPlant'

interface FocusSession {
  id: string
  duration: number
  completed: boolean
  startedAt: number
  taskName?: string
}

export function FocusMode() {
  const [sessions, setSessions] = useKV<FocusSession[]>('butler-focus-sessions', [])
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState('25')
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (!isActive || isPaused) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          completeSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, isPaused])

  const startSession = () => {
    const duration = parseInt(selectedDuration) * 60
    const newSession: FocusSession = {
      id: Date.now().toString(),
      duration: parseInt(selectedDuration),
      completed: false,
      startedAt: Date.now()
    }

    setCurrentSession(newSession)
    setTimeRemaining(duration)
    setIsActive(true)
    setIsPaused(false)
    setDialogOpen(false)
    toast.success(`Focus session started - ${selectedDuration} minutes`)
  }

  const completeSession = () => {
    if (currentSession) {
      const completedSession = { ...currentSession, completed: true }
      setSessions((current) => [...(current || []), completedSession])
      toast.success('Focus session completed! 🎉', {
        description: 'Great work staying focused!'
      })
    }
    resetSession()
  }

  const resetSession = () => {
    setIsActive(false)
    setIsPaused(false)
    setTimeRemaining(0)
    setCurrentSession(null)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const todaySessions = (sessions || []).filter(
    (s) => s.startedAt > Date.now() - 24 * 60 * 60 * 1000
  )

  const completedToday = todaySessions.filter((s) => s.completed).length
  const totalMinutesToday = todaySessions
    .filter((s) => s.completed)
    .reduce((sum, s) => sum + s.duration, 0)

  const progress = isActive ? ((1 - timeRemaining / (parseInt(selectedDuration) * 60)) * 100) : 0

  return (
    <>
      <Card className="shadow-2xl border-2 border-white/10 hover:shadow-accent/30 transition-all duration-300 bg-card backdrop-blur-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-orange/10 to-accent/10 pointer-events-none opacity-50" />
        
        <CardHeader className="pb-6 relative">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-3xl sm:text-4xl font-bold">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange/40 to-accent/40 flex items-center justify-center border-2 border-white/20 shadow-2xl shadow-orange/30">
                <Timer className="text-white drop-shadow-lg" size={28} weight="duotone" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-orange bg-clip-text text-transparent">Focus Mode</span>
            </div>
            {!isActive && (
              <Button
                onClick={() => setDialogOpen(true)}
                type="button"
                className="h-12 px-6 rounded-2xl shadow-2xl shadow-orange/40 bg-gradient-to-br from-orange to-accent hover:scale-110 transition-all border-2 border-white/20 font-bold text-white"
              >
                <Play size={20} weight="fill" className="mr-2" />
                Start
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          {isActive ? (
            <div className="space-y-6">
              <div className="relative">
                <div className="aspect-square max-w-[280px] mx-auto relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="oklch(0.80 0.05 75)"
                      strokeWidth="12"
                      className="opacity-30"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                      strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="oklch(0.70 0.22 45)" />
                        <stop offset="100%" stopColor="oklch(0.78 0.12 45)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange via-accent to-orange bg-clip-text text-transparent">
                        {formatTime(timeRemaining)}
                      </div>
                      <p className="text-foreground text-sm sm:text-base font-bold mt-3">
                        {isPaused ? 'Paused' : 'Stay Focused'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={togglePause}
                  type="button"
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-2xl border-2 bg-card hover:bg-primary/20 hover:border-primary/50 font-bold text-lg text-foreground hover:text-primary transition-all shadow-lg"
                >
                  {isPaused ? (
                    <>
                      <Play size={24} weight="fill" className="mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause size={24} weight="fill" className="mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetSession}
                  type="button"
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-2xl border-2 bg-card hover:bg-destructive/20 hover:border-destructive/50 font-bold text-lg text-foreground hover:text-destructive transition-all shadow-lg"
                >
                  <X size={24} weight="bold" className="mr-2" />
                  End
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-orange/20 to-orange/10 border-2 border-white/10 shadow-xl">
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-orange mb-2">{completedToday}</div>
                    <p className="text-sm text-foreground font-bold">Sessions Today</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-white/10 shadow-xl">
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">{totalMinutesToday}</div>
                    <p className="text-sm text-foreground font-bold">Minutes Focused</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-white/10 shadow-xl">
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                      {completedToday > 0 ? '🔥' : '💪'}
                    </div>
                    <p className="text-sm text-foreground font-bold">
                      {completedToday > 0 ? 'On Fire!' : 'Start Now'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center py-8 text-muted-foreground">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange/20 to-accent/20 mx-auto mb-5 flex items-center justify-center border-2 border-white/10 shadow-xl">
                  <Timer size={48} className="text-orange" weight="duotone" />
                </div>
                <p className="text-lg font-bold text-foreground mb-2">Ready to focus?</p>
                <p className="text-base font-semibold">Click Start to begin a focus session</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-2 border-white/10 bg-card backdrop-blur-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4 text-2xl sm:text-3xl font-bold">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange/40 to-accent/40 flex items-center justify-center border-2 border-white/20 shadow-2xl shadow-orange/30">
                <Timer className="text-white drop-shadow-lg" size={28} weight="duotone" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-orange bg-clip-text text-transparent">
                Start Focus Session
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div>
              <label className="text-sm font-bold mb-3 block text-foreground">
                Session Duration
              </label>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="h-14 rounded-2xl border-2 border-white/10 text-base bg-muted/50 backdrop-blur-xl font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="25">25 minutes (Pomodoro)</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={startSession}
              type="button"
              className="w-full h-14 text-lg font-bold shadow-2xl shadow-orange/40 hover:shadow-accent/40 transition-all duration-300 bg-gradient-to-r from-orange via-accent to-orange bg-[length:200%_100%] hover:bg-[position:100%_0] border-2 border-white/20 group relative overflow-hidden text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                <Play size={24} weight="fill" />
                Start Focus Session
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
