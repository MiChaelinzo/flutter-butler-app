import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Robot, House, Lightning, ListChecks, Sparkle, Note, Flame, Gear, Timer, Target, Calendar, ChartLine, Users, Microphone } from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'
import { DailyBriefing } from '@/components/DailyBriefing'
import { QuickActions } from '@/components/QuickActions'
import { TaskManager } from '@/components/TaskManager'
import { AIChat } from '@/components/AIChat'
import { HabitTracker } from '@/components/HabitTracker'
import { NoteTaking } from '@/components/NoteTaking'
import { SmartSuggestions } from '@/components/SmartSuggestions'
import { AutomationTemplates } from '@/components/AutomationTemplates'
import { ProductivityStats } from '@/components/ProductivityStats'
import { FocusMode } from '@/components/FocusMode'
import { DailyGoals } from '@/components/DailyGoals'
import { CalendarView } from '@/components/CalendarView'
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'
import { TeamCollaboration } from '@/components/TeamCollaboration'
import { VoiceCommands } from '@/components/VoiceCommands'
import { PoweredByFooter } from '@/components/PoweredByFooter'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.25_270/0.15)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,oklch(0.70_0.24_200/0.12)_0%,transparent_50%),radial-gradient(ellipse_at_center,oklch(0.65_0.22_320/0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.90_0.01_270/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.90_0.01_270/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] animate-float" />
      <div className="absolute bottom-[15%] left-[10%] w-[450px] h-[450px] bg-accent/10 rounded-full blur-[140px] animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-1.5s' }} />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 relative z-10">
        <header className="mb-10 md:mb-14">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div className="space-y-3">
              <div className="flex items-center gap-5">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary blur-xl opacity-40 rounded-[2rem] animate-pulse" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[1.75rem] bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-lg border border-white/10 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                    <Robot size={48} weight="duotone" className="text-white drop-shadow-lg" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight">
                    Butler
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base mt-2 font-medium tracking-wide">
                    Your AI-powered personal assistant
                  </p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setChatOpen(true)} 
              size="lg" 
              className="gap-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 h-12 px-6 sm:h-14 sm:px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-white/10 backdrop-blur-sm group relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Sparkle size={20} weight="fill" className="relative z-10" />
              <span className="hidden sm:inline font-semibold text-base relative z-10">Ask Assistant</span>
              <span className="sm:hidden font-semibold text-base relative z-10">Chat</span>
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 md:space-y-10">
          <div className="flex justify-center overflow-x-auto pb-2">
            <TabsList className="inline-flex h-14 rounded-2xl bg-card/60 backdrop-blur-xl border border-border shadow-sm p-1.5 gap-1">
              <TabsTrigger 
                value="dashboard" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <House size={20} weight="duotone" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <ChartLine size={20} weight="duotone" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Users size={20} weight="duotone" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger 
                value="voice" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Microphone size={20} weight="duotone" />
                <span className="hidden sm:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger 
                value="focus" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Timer size={20} weight="duotone" />
                <span className="hidden sm:inline">Focus</span>
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Target size={20} weight="duotone" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Calendar size={20} weight="duotone" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Lightning size={20} weight="duotone" />
                <span className="hidden sm:inline">Actions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <ListChecks size={20} weight="duotone" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger 
                value="habits" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-yellow data-[state=active]:text-yellow-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Flame size={20} weight="duotone" />
                <span className="hidden sm:inline">Habits</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Note size={20} weight="duotone" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="automations" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-md font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-muted/50"
              >
                <Gear size={20} weight="duotone" />
                <span className="hidden sm:inline">Automations</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-8 md:space-y-10 mt-10 animate-slide-up">
            <DailyBriefing onRegenerate={() => {}} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <DailyGoals />
              <FocusMode />
            </div>
            
            <ProductivityStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange/20 to-orange/5 flex items-center justify-center border border-orange/20 shadow-sm backdrop-blur-sm">
                      <Lightning className="text-orange" size={24} weight="duotone" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Quick Actions</h2>
                  </div>
                  <QuickActions />
                </div>

                <TaskManager />
              </div>

              <div className="space-y-6 md:space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-sm backdrop-blur-sm">
                      <Sparkle className="text-primary" size={24} weight="duotone" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Smart Suggestions</h2>
                  </div>
                  <SmartSuggestions />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="focus" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center border border-secondary/20 shadow-md backdrop-blur-sm">
                <Timer className="text-secondary" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Focus Mode</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
                  Pomodoro timer for deep work sessions
                </p>
              </div>
            </div>
            <FocusMode />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20 shadow-md backdrop-blur-sm">
                <Target className="text-accent" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Daily Goals</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
                  Set and track your daily intentions
                </p>
              </div>
            </div>
            <DailyGoals />
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange/20 to-orange/5 flex items-center justify-center border border-orange/20 shadow-md backdrop-blur-sm">
                  <Lightning className="text-orange" size={32} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Quick Actions</h2>
                  <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
                    AI-powered shortcuts for your daily workflow
                  </p>
                </div>
              </div>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-md backdrop-blur-sm">
                <ListChecks className="text-primary" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Task Management</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
                  Smart tracking with AI-powered insights
                </p>
              </div>
            </div>
            <TaskManager />
          </TabsContent>

          <TabsContent value="habits" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow/20 to-yellow/5 flex items-center justify-center border border-yellow/20 shadow-md backdrop-blur-sm">
                <Flame className="text-yellow" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Habit Tracker</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
                  Build consistency and track your streaks
                </p>
              </div>
            </div>
            <HabitTracker />
          </TabsContent>

          <TabsContent value="notes" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center border border-secondary/20 shadow-md backdrop-blur-sm">
                <Note className="text-secondary" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Quick Notes</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
                  Capture ideas with AI-powered summaries
                </p>
              </div>
            </div>
            <NoteTaking />
          </TabsContent>

          <TabsContent value="automations" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange/20 to-orange/5 flex items-center justify-center border border-orange/20 shadow-md backdrop-blur-sm">
                <Gear className="text-orange" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Automations</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
                  Run pre-built workflows with AI assistance
                </p>
              </div>
            </div>
            <AutomationTemplates />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <CalendarView />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="team" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <TeamCollaboration />
          </TabsContent>

          <TabsContent value="voice" className="space-y-6 md:space-y-8 mt-10 animate-slide-up">
            <VoiceCommands />
          </TabsContent>
        </Tabs>

        <PoweredByFooter />
      </div>

      <AIChat open={chatOpen} onOpenChange={setChatOpen} />
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default App
