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
import { MouseTrail } from '@/components/MouseTrail'
import { useTheme } from '@/hooks/use-theme'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {theme === 'dark' && <NebulaBackground />}
      {theme === 'dark' && <MouseTrail />}
      
      <div className="absolute inset-0 cyber-grid opacity-40" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-primary/15 blur-[120px] floating-orb" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/15 blur-[120px] floating-orb" style={{ animationDelay: '-8s' }} />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-orange/10 blur-[100px] floating-orb" style={{ animationDelay: '-16s' }} />
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-lime/8 blur-[90px] floating-orb" style={{ animationDelay: '-12s' }} />
      </div>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 relative z-10">
        <header className="mb-12 md:mb-16">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/40 blur-3xl rounded-full pulse-glow" />
                  <div className="absolute inset-0 border-2 border-primary/60 rounded-3xl animate-ping opacity-20" />
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-primary/40 via-accent/25 to-orange/30 backdrop-blur-xl flex items-center justify-center border-2 border-primary/60 shadow-[0_0_40px_rgba(114,192,255,0.4)] group-hover:shadow-[0_0_60px_rgba(114,192,255,0.6)] transition-all duration-500 group-hover:scale-105 group-hover:border-primary/80">
                    <Robot size={56} weight="duotone" className="text-primary drop-shadow-[0_0_15px_rgba(114,192,255,0.9)]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime rounded-full border-2 border-background animate-pulse shadow-[0_0_20px_rgba(209,237,114,0.9)]" />
                </div>
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[0.08em] uppercase text-gradient-cyber neon-text">
                    NEXUS
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base mt-2 font-semibold tracking-[0.05em] uppercase flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-lime rounded-full animate-pulse shadow-[0_0_12px_rgba(209,237,114,0.9)]" />
                    AI Command Center
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={toggleTheme}
                size="lg"
                variant="outline"
                className="h-14 w-14 rounded-xl border-2 border-primary/60 bg-card/60 backdrop-blur-xl shadow-[0_0_20px_rgba(114,192,255,0.3)] hover:shadow-[0_0_35px_rgba(114,192,255,0.5)] transition-all duration-300"
              >
                {theme === 'dark' ? (
                  <Sun size={24} weight="duotone" className="text-primary" />
                ) : (
                  <Moon size={24} weight="duotone" className="text-primary" />
                )}
              </Button>
              <Button 
                onClick={() => setChatOpen(true)} 
                size="lg" 
                className="relative gap-3 h-14 px-8 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-700 border-2 border-primary/60 shadow-[0_0_30px_rgba(114,192,255,0.5)] hover:shadow-[0_0_50px_rgba(114,192,255,0.8)] font-bold text-base tracking-[0.05em] uppercase overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <Sparkle size={24} weight="fill" className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                <span className="hidden sm:inline relative z-10">Activate AI</span>
                <span className="sm:hidden relative z-10">AI</span>
              </Button>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10 md:space-y-12">
          <div className="flex justify-center overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="inline-flex h-16 rounded-2xl bg-card/60 backdrop-blur-2xl border-2 border-primary/40 shadow-[0_0_40px_rgba(114,192,255,0.15)] p-2 gap-2">
              <TabsTrigger 
                value="dashboard" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(0,200,255,0.6)] data-[state=active]:border-2 data-[state=active]:border-primary font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <House size={22} weight="duotone" />
                <span className="hidden sm:inline">Command</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(0,200,255,0.6)] data-[state=active]:border-2 data-[state=active]:border-primary font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <ChartLine size={22} weight="duotone" />
                <span className="hidden sm:inline">Intel</span>
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_20px_rgba(255,0,150,0.6)] data-[state=active]:border-2 data-[state=active]:border-accent font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Users size={22} weight="duotone" />
                <span className="hidden sm:inline">Squad</span>
              </TabsTrigger>
              <TabsTrigger 
                value="voice" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-[0_0_20px_rgba(255,100,0,0.6)] data-[state=active]:border-2 data-[state=active]:border-orange font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Microphone size={22} weight="duotone" />
                <span className="hidden sm:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger 
                value="focus" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-[0_0_20px_rgba(100,50,200,0.6)] data-[state=active]:border-2 data-[state=active]:border-secondary font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Timer size={22} weight="duotone" />
                <span className="hidden sm:inline">Focus</span>
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_20px_rgba(255,0,150,0.6)] data-[state=active]:border-2 data-[state=active]:border-accent font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Target size={22} weight="duotone" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(0,200,255,0.6)] data-[state=active]:border-2 data-[state=active]:border-primary font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Calendar size={22} weight="duotone" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-[0_0_20px_rgba(255,100,0,0.6)] data-[state=active]:border-2 data-[state=active]:border-orange font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Lightning size={22} weight="duotone" />
                <span className="hidden sm:inline">Actions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_20px_rgba(255,0,150,0.6)] data-[state=active]:border-2 data-[state=active]:border-accent font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <ListChecks size={22} weight="duotone" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger 
                value="habits" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-lime data-[state=active]:text-lime-foreground data-[state=active]:shadow-[0_0_20px_rgba(150,255,0,0.6)] data-[state=active]:border-2 data-[state=active]:border-lime font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Flame size={22} weight="duotone" />
                <span className="hidden sm:inline">Habits</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-[0_0_20px_rgba(100,50,200,0.6)] data-[state=active]:border-2 data-[state=active]:border-secondary font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Note size={22} weight="duotone" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="api" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(0,200,255,0.6)] data-[state=active]:border-2 data-[state=active]:border-primary font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Plugs size={22} weight="duotone" />
                <span className="hidden sm:inline">API</span>
              </TabsTrigger>
              <TabsTrigger 
                value="automations" 
                className="gap-2 px-4 sm:px-6 rounded-xl data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-[0_0_20px_rgba(255,100,0,0.6)] data-[state=active]:border-2 data-[state=active]:border-orange font-bold text-sm sm:text-base tracking-[0.04em] uppercase transition-all duration-300 hover:bg-muted/50"
              >
                <Gear size={22} weight="duotone" />
                <span className="hidden sm:inline">Auto</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-10 md:space-y-12 mt-10">
            <DailyBriefing onRegenerate={() => {}} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <DailyGoals />
              <FocusMode />
            </div>
            
            <ProductivityStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-orange/30 to-orange/10 border-2 border-orange/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_20px_rgba(255,100,0,0.3)]">
                      <Lightning className="text-orange drop-shadow-[0_0_10px_rgba(255,100,0,0.8)]" size={28} weight="duotone" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-[0.06em] uppercase text-gradient-hot">Quick Actions</h2>
                  </div>
                  <QuickActions />
                </div>

                <TaskManager />
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_20px_rgba(0,200,255,0.3)]">
                      <Sparkle className="text-primary drop-shadow-[0_0_10px_rgba(0,200,255,0.8)]" size={28} weight="duotone" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-[0.06em] uppercase text-gradient-cyber">Smart AI</h2>
                  </div>
                  <SmartSuggestions />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="focus" className="space-y-8 mt-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-secondary/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(100,50,200,0.3)]">
                <Timer className="text-secondary drop-shadow-[0_0_15px_rgba(100,50,200,0.8)]" size={40} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-[0.08em] uppercase text-gradient-cyber">Focus Mode</h2>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base font-semibold tracking-[0.04em] uppercase">
                  Deep Work Protocol
                </p>
              </div>
            </div>
            <FocusMode />
          </TabsContent>

          <TabsContent value="goals" className="space-y-8 mt-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,150,0.3)]">
                <Target className="text-accent drop-shadow-[0_0_15px_rgba(255,0,150,0.8)]" size={40} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-[0.08em] uppercase text-gradient-cyber">Daily Goals</h2>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base font-semibold tracking-[0.04em] uppercase">
                  Mission Objectives
                </p>
              </div>
            </div>
            <DailyGoals />
          </TabsContent>

          <TabsContent value="actions" className="space-y-8 mt-10">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange/30 to-orange/10 border-2 border-orange/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(255,100,0,0.3)]">
                  <Lightning className="text-orange drop-shadow-[0_0_15px_rgba(255,100,0,0.8)]" size={40} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-4xl sm:text-5xl font-black tracking-[0.08em] uppercase text-gradient-hot">Quick Actions</h2>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base font-semibold tracking-[0.04em] uppercase">
                    AI-Powered Shortcuts
                  </p>
                </div>
              </div>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-8 mt-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(0,200,255,0.3)]">
                <ListChecks className="text-primary drop-shadow-[0_0_15px_rgba(0,200,255,0.8)]" size={40} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-[0.08em] uppercase text-gradient-cyber">Task Manager</h2>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base font-semibold tracking-[0.04em] uppercase">
                  Mission Control
                </p>
              </div>
            </div>
            <TaskManager />
          </TabsContent>

          <TabsContent value="habits" className="space-y-8 mt-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-lime/30 to-lime/10 border-2 border-lime/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(150,255,0,0.3)]">
                <Flame className="text-lime drop-shadow-[0_0_15px_rgba(150,255,0,0.8)]" size={40} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-[0.08em] uppercase text-gradient-cyber">Habit Tracker</h2>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base font-semibold tracking-[0.04em] uppercase">
                  Build Consistency
                </p>
              </div>
            </div>
            <HabitTracker />
          </TabsContent>

          <TabsContent value="notes" className="space-y-8 mt-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-secondary/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(100,50,200,0.3)]">
                <Note className="text-secondary drop-shadow-[0_0_15px_rgba(100,50,200,0.8)]" size={40} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-[0.08em] uppercase text-gradient-cyber">Quick Notes</h2>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base font-semibold tracking-[0.04em] uppercase">
                  AI Summaries
                </p>
              </div>
            </div>
            <NoteTaking />
          </TabsContent>

          <TabsContent value="api" className="space-y-8 mt-10">
            <APISettings />
          </TabsContent>

          <TabsContent value="automations" className="space-y-8 mt-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange/30 to-orange/10 border-2 border-orange/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(255,100,0,0.3)]">
                <Gear className="text-orange drop-shadow-[0_0_15px_rgba(255,100,0,0.8)]" size={40} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-[0.08em] uppercase text-gradient-hot">Automations</h2>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base font-semibold tracking-[0.04em] uppercase">
                  Workflow Engine
                </p>
              </div>
            </div>
            <AutomationTemplates />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-8 mt-10">
            <CalendarView />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8 mt-10">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="team" className="space-y-8 mt-10">
            <TeamCollaboration />
          </TabsContent>

          <TabsContent value="voice" className="space-y-8 mt-10">
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
