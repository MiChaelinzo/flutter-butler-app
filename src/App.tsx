import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Robot, House, Lightning, ListChecks, Sparkle, Note, Flame, Gear, Timer, Target, Calendar, ChartLine, Users, Microphone, Plugs, Moon, Sun } from '@phosphor-icons/react'
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
import { APISettings } from '@/components/APISettings'
import { NebulaBackground } from '@/components/NebulaBackground'
import { useTheme } from '@/hooks/use-theme'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background relative">
      {theme === 'dark' && <NebulaBackground />}
      
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" style={{ zIndex: 1 }} />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" style={{ zIndex: 1 }} />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 relative" style={{ zIndex: 10 }}>
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card backdrop-blur-xl flex items-center justify-center border border-border shadow-lg group-hover:shadow-primary/20 transition-all duration-300 group-hover:scale-105">
                  <Robot size={40} weight="duotone" className="text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime rounded-full border-2 border-background animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-gradient-cyber">
                  NEXUS
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-medium tracking-wide uppercase flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-lime rounded-full animate-pulse" />
                  AI Command Center
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={toggleTheme}
                size="lg"
                variant="outline"
                className="h-12 w-12 rounded-xl border-border bg-card/80 backdrop-blur-xl hover:bg-card hover:border-primary/40 transition-all duration-300"
              >
                {theme === 'dark' ? (
                  <Sun size={20} weight="duotone" className="text-primary" />
                ) : (
                  <Moon size={20} weight="duotone" className="text-primary" />
                )}
              </Button>
              <Button 
                onClick={() => setChatOpen(true)} 
                size="lg" 
                className="gap-2 h-12 px-6 bg-primary hover:bg-primary/90 border border-primary/20 shadow-lg shadow-primary/20 hover:shadow-primary/30 font-semibold text-sm tracking-wide transition-all duration-300 overflow-hidden group"
              >
                <Sparkle size={20} weight="fill" className="relative z-10" />
                <span className="hidden sm:inline relative z-10">Activate AI</span>
                <span className="sm:hidden relative z-10">AI</span>
              </Button>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 md:space-y-10">
          <div className="flex justify-center overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="inline-flex h-12 rounded-xl bg-card/80 backdrop-blur-xl border border-border shadow-lg p-1.5 gap-1">
              <TabsTrigger 
                value="dashboard" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <House size={18} weight="duotone" />
                <span className="hidden sm:inline">Command</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <ChartLine size={18} weight="duotone" />
                <span className="hidden sm:inline">Intel</span>
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Users size={18} weight="duotone" />
                <span className="hidden sm:inline">Squad</span>
              </TabsTrigger>
              <TabsTrigger 
                value="voice" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Microphone size={18} weight="duotone" />
                <span className="hidden sm:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger 
                value="focus" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Timer size={18} weight="duotone" />
                <span className="hidden sm:inline">Focus</span>
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Target size={18} weight="duotone" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Calendar size={18} weight="duotone" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Lightning size={18} weight="duotone" />
                <span className="hidden sm:inline">Actions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <ListChecks size={18} weight="duotone" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger 
                value="habits" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-lime data-[state=active]:text-lime-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Flame size={18} weight="duotone" />
                <span className="hidden sm:inline">Habits</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Note size={18} weight="duotone" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="api" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Plugs size={18} weight="duotone" />
                <span className="hidden sm:inline">API</span>
              </TabsTrigger>
              <TabsTrigger 
                value="automations" 
                className="gap-2 px-3 sm:px-4 rounded-lg data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 hover:bg-muted/50"
              >
                <Gear size={18} weight="duotone" />
                <span className="hidden sm:inline">Auto</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-8 md:space-y-10 mt-8">
            <DailyBriefing onRegenerate={() => {}} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyGoals />
              <FocusMode />
            </div>
            
            <ProductivityStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange/20 to-orange/5 border border-orange/30 flex items-center justify-center backdrop-blur-xl">
                      <Lightning className="text-orange" size={22} weight="duotone" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-gradient-hot">Quick Actions</h2>
                  </div>
                  <QuickActions />
                </div>

                <TaskManager />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-xl">
                      <Sparkle className="text-primary" size={22} weight="duotone" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-gradient-cyber">Smart AI</h2>
                  </div>
                  <SmartSuggestions />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="focus" className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 flex items-center justify-center backdrop-blur-xl">
                <Timer className="text-secondary" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-gradient-cyber">Focus Mode</h2>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  Deep Work Protocol
                </p>
              </div>
            </div>
            <FocusMode />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center backdrop-blur-xl">
                <Target className="text-accent" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-gradient-cyber">Daily Goals</h2>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  Mission Objectives
                </p>
              </div>
            </div>
            <DailyGoals />
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 mt-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange/20 to-orange/5 border border-orange/30 flex items-center justify-center backdrop-blur-xl">
                  <Lightning className="text-orange" size={32} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-gradient-hot">Quick Actions</h2>
                  <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide uppercase">
                    AI-Powered Shortcuts
                  </p>
                </div>
              </div>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-xl">
                <ListChecks className="text-primary" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-gradient-cyber">Task Manager</h2>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  Mission Control
                </p>
              </div>
            </div>
            <TaskManager />
          </TabsContent>

          <TabsContent value="habits" className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-lime/20 to-lime/5 border border-lime/30 flex items-center justify-center backdrop-blur-xl">
                <Flame className="text-lime" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-gradient-cyber">Habit Tracker</h2>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  Build Consistency
                </p>
              </div>
            </div>
            <HabitTracker />
          </TabsContent>

          <TabsContent value="notes" className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 flex items-center justify-center backdrop-blur-xl">
                <Note className="text-secondary" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-gradient-cyber">Quick Notes</h2>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  AI Summaries
                </p>
              </div>
            </div>
            <NoteTaking />
          </TabsContent>

          <TabsContent value="api" className="space-y-6 mt-8">
            <APISettings />
          </TabsContent>

          <TabsContent value="automations" className="space-y-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange/20 to-orange/5 border border-orange/30 flex items-center justify-center backdrop-blur-xl">
                <Gear className="text-orange" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-gradient-hot">Automations</h2>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  Workflow Engine
                </p>
              </div>
            </div>
            <AutomationTemplates />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6 mt-8">
            <CalendarView />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-8">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="team" className="space-y-6 mt-8">
            <TeamCollaboration />
          </TabsContent>

          <TabsContent value="voice" className="space-y-6 mt-8">
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
