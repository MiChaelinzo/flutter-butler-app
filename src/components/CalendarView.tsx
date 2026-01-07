import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar as CalendarIcon, CaretLeft, CaretRight, CheckCircle, Circle, Clock, Flame, ListChecks } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { Task, Habit } from '@/lib/types'
import { useState, useMemo } from 'react'
import { format, startOfWeek, addDays, isSameDay, isToday, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'

type CalendarEvent = {
  id: string
  type: 'task' | 'habit'
  title: string
  completed: boolean
  priority?: 'high' | 'medium' | 'low'
  estimatedMinutes?: number
  time?: string
}

export function CalendarView() {
  const [tasks] = useKV<Task[]>('butler-tasks', [])
  const [habits] = useKV<Habit[]>('butler-habits', [])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week')

  const goToPrevious = () => {
    if (viewMode === 'day') {
      setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 1)))
    } else if (viewMode === 'week') {
      setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 7)))
    } else {
      setCurrentDate(prev => new Date(prev.setFullYear(prev.getFullYear(), prev.getMonth() - 1)))
    }
  }

  const goToNext = () => {
    if (viewMode === 'day') {
      setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 1)))
    } else if (viewMode === 'week') {
      setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 7)))
    } else {
      setCurrentDate(prev => new Date(prev.setFullYear(prev.getFullYear(), prev.getMonth() + 1)))
    }
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const events: CalendarEvent[] = []

    if (tasks) {
      tasks.forEach(task => {
        const taskDate = format(new Date(task.createdAt), 'yyyy-MM-dd')
        if (taskDate === dateStr || (!task.completed && isSameDay(date, new Date()))) {
          events.push({
            id: task.id,
            type: 'task',
            title: task.text,
            completed: task.completed,
            priority: task.priority,
            estimatedMinutes: task.estimatedMinutes
          })
        }
      })
    }

    if (habits) {
      habits.forEach(habit => {
        const isCompleted = habit.completedDates.includes(dateStr)
        events.push({
          id: habit.id,
          type: 'habit',
          title: habit.name,
          completed: isCompleted
        })
      })
    }

    return events
  }

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 })
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [currentDate])

  const monthDays = useMemo(() => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start, end })
    const firstDayOfWeek = getDay(start)
    const paddingDays = Array(firstDayOfWeek).fill(null)
    return [...paddingDays, ...days]
  }, [currentDate])

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/30 text-destructive border-destructive/50'
      case 'medium':
        return 'bg-accent/30 text-accent border-accent/50'
      case 'low':
        return 'bg-muted/60 text-muted-foreground border-white/20'
      default:
        return 'bg-muted/60 text-muted-foreground border-white/20'
    }
  }

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:00 ${ampm}`
  })

  const renderDayView = () => {
    const events = getEventsForDate(currentDate)
    const incompleteTasks = events.filter(e => e.type === 'task' && !e.completed)
    const completedTasks = events.filter(e => e.type === 'task' && e.completed)
    const habits = events.filter(e => e.type === 'habit')

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-xl border-2 border-white/10 bg-card/80 backdrop-blur-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border-2 border-white/20">
                  <Clock size={20} weight="duotone" className="text-primary" />
                </div>
                Daily Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-2">
                  {timeSlots.map((time, idx) => (
                    <div key={idx} className="flex items-start gap-4 py-4 border-b border-white/5">
                      <div className="w-24 flex-shrink-0 text-sm font-bold text-muted-foreground">
                        {time}
                      </div>
                      <div className="flex-1 min-h-[40px]">
                        {idx >= 6 && idx <= 22 && (
                          <div className="h-full rounded-lg bg-primary/5 border-l-4 border-primary/30 px-3 py-2 hover:bg-primary/10 transition-colors">
                            <p className="text-sm text-muted-foreground font-semibold">Available for scheduling</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-xl border-2 border-white/10 bg-card/80 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                  <ListChecks size={20} weight="duotone" className="text-primary" />
                  Tasks ({incompleteTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[250px] overflow-y-auto">
                  {incompleteTasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6 font-semibold">No tasks for today</p>
                  ) : (
                    incompleteTasks.map(event => (
                      <div key={event.id} className="p-3 rounded-xl border-2 border-white/10 bg-card/50 hover:bg-primary/5 transition-all">
                        <p className="text-sm font-bold text-foreground mb-2">{event.title}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {event.priority && (
                            <Badge className={`${getPriorityColor(event.priority)} text-xs font-bold border-2 rounded-lg`}>
                              {event.priority}
                            </Badge>
                          )}
                          {event.estimatedMinutes && (
                            <span className="text-xs text-muted-foreground font-bold">~{event.estimatedMinutes}m</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-2 border-white/10 bg-card/80 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                  <Flame size={20} weight="duotone" className="text-accent" />
                  Habits ({habits.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[250px] overflow-y-auto">
                  {habits.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6 font-semibold">No habits tracked</p>
                  ) : (
                    habits.map(event => (
                      <div key={event.id} className="flex items-center gap-3 p-3 rounded-xl border-2 border-white/10 bg-card/50 hover:bg-accent/5 transition-all">
                        {event.completed ? (
                          <CheckCircle size={20} weight="fill" className="text-accent flex-shrink-0" />
                        ) : (
                          <Circle size={20} weight="regular" className="text-muted-foreground flex-shrink-0" />
                        )}
                        <p className={`text-sm font-bold ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {event.title}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const renderWeekView = () => {
    return (
      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {weekDays.map((day, idx) => {
          const events = getEventsForDate(day)
          const taskCount = events.filter(e => e.type === 'task' && !e.completed).length
          const habitCount = events.filter(e => e.type === 'habit').length
          const completedHabits = events.filter(e => e.type === 'habit' && e.completed).length

          return (
            <Card
              key={idx}
              className={`shadow-lg border-2 ${
                isToday(day)
                  ? 'border-primary/50 bg-primary/10 shadow-primary/30'
                  : 'border-white/10 bg-card/80'
              } backdrop-blur-xl hover:shadow-xl transition-all`}
            >
              <CardHeader className="pb-3 space-y-2">
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase">
                    {format(day, 'EEE')}
                  </p>
                  <p className={`text-2xl sm:text-3xl font-bold ${isToday(day) ? 'text-primary' : 'text-foreground'}`}>
                    {format(day, 'd')}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  {taskCount > 0 && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/30">
                      <ListChecks size={16} weight="duotone" className="text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-foreground">{taskCount} task{taskCount !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {habitCount > 0 && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/10 border border-accent/30">
                      <Flame size={16} weight="duotone" className="text-accent flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-foreground">{completedHabits}/{habitCount}</span>
                    </div>
                  )}
                  {taskCount === 0 && habitCount === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-3 font-semibold">No events</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  const renderMonthView = () => {
    return (
      <div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center py-2 font-bold text-sm text-muted-foreground uppercase">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {monthDays.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="aspect-square" />
            }

            const events = getEventsForDate(day)
            const taskCount = events.filter(e => e.type === 'task' && !e.completed).length
            const habitCompletedCount = events.filter(e => e.type === 'habit' && e.completed).length
            const habitTotalCount = events.filter(e => e.type === 'habit').length

            return (
              <Card
                key={idx}
                className={`aspect-square shadow-lg border-2 ${
                  isToday(day)
                    ? 'border-primary/50 bg-primary/10 shadow-primary/30'
                    : 'border-white/10 bg-card/80'
                } backdrop-blur-xl hover:shadow-xl transition-all p-2 sm:p-3`}
              >
                <div className="h-full flex flex-col">
                  <p className={`text-sm sm:text-base font-bold mb-2 ${isToday(day) ? 'text-primary' : 'text-foreground'}`}>
                    {format(day, 'd')}
                  </p>
                  <div className="flex-1 space-y-1">
                    {taskCount > 0 && (
                      <div className="flex items-center gap-1 text-xs">
                        <ListChecks size={12} weight="duotone" className="text-primary flex-shrink-0" />
                        <span className="font-bold text-foreground truncate">{taskCount}</span>
                      </div>
                    )}
                    {habitTotalCount > 0 && (
                      <div className="flex items-center gap-1 text-xs">
                        <Flame size={12} weight="duotone" className="text-accent flex-shrink-0" />
                        <span className="font-bold text-foreground truncate">{habitCompletedCount}/{habitTotalCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <Card className="shadow-2xl border-2 border-white/10 bg-card/80 backdrop-blur-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-orange/10 pointer-events-none opacity-50" />
      <CardHeader className="pb-6 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-4 text-3xl sm:text-4xl font-bold">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border-2 border-white/20 shadow-2xl shadow-primary/30">
              <CalendarIcon className="text-white drop-shadow-lg" size={28} weight="duotone" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Calendar</span>
          </CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              onClick={goToToday}
              variant="outline"
              className="h-11 px-4 sm:px-5 rounded-xl border-2 border-white/20 bg-card/50 backdrop-blur-xl font-bold hover:bg-primary/10 hover:border-primary/30"
            >
              Today
            </Button>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-xl p-1.5 rounded-xl border-2 border-white/10">
              <Button
                onClick={goToPrevious}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg hover:bg-primary/20"
              >
                <CaretLeft size={20} weight="bold" />
              </Button>
              <div className="px-3 sm:px-4 min-w-[140px] sm:min-w-[180px] text-center">
                <p className="text-sm sm:text-base font-bold text-foreground">
                  {viewMode === 'month'
                    ? format(currentDate, 'MMMM yyyy')
                    : viewMode === 'week'
                    ? `${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`
                    : format(currentDate, 'MMMM d, yyyy')}
                </p>
              </div>
              <Button
                onClick={goToNext}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg hover:bg-primary/20"
              >
                <CaretRight size={20} weight="bold" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'day' | 'week' | 'month')}>
          <TabsList className="inline-flex h-12 rounded-2xl bg-card/80 backdrop-blur-xl border-2 border-white/10 shadow-xl p-1.5 gap-1.5">
            <TabsTrigger
              value="day"
              className="px-4 sm:px-6 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg font-bold text-sm sm:text-base"
            >
              Day
            </TabsTrigger>
            <TabsTrigger
              value="week"
              className="px-4 sm:px-6 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg font-bold text-sm sm:text-base"
            >
              Week
            </TabsTrigger>
            <TabsTrigger
              value="month"
              className="px-4 sm:px-6 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg font-bold text-sm sm:text-base"
            >
              Month
            </TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="mt-8">
            {renderDayView()}
          </TabsContent>

          <TabsContent value="week" className="mt-8">
            {renderWeekView()}
          </TabsContent>

          <TabsContent value="month" className="mt-8">
            {renderMonthView()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
