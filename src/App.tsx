import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Robot, House, Lightning, ListChecks, Sparkle, Note, Flame, Gear } from '@phosphor-icons/react'
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

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.70_0.25_190)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_left,oklch(0.75_0.25_330)_0%,transparent_60%),radial-gradient(ellipse_at_center,oklch(0.70_0.20_280)_0%,transparent_70%)] opacity-30 pointer-events-none animate-glow" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_80px,oklch(0.70_0.25_190)_80px,oklch(0.70_0.25_190)_81px),repeating-linear-gradient(90deg,transparent,transparent_80px,oklch(0.70_0.25_190)_80px,oklch(0.70_0.25_190)_81px)] opacity-[0.08] pointer-events-none" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 relative z-10">
        <header className="mb-8 md:mb-12">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary blur-2xl opacity-60 rounded-3xl animate-glow" />
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl shadow-primary/40 border-2 border-white/20 backdrop-blur-xl group-hover:scale-110 transition-transform duration-300">
                    <Robot size={42} weight="duotone" className="text-white drop-shadow-lg" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
                    Butler
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-lg mt-2 font-semibold tracking-wide">
                    Your AI-powered personal assistant
                  </p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setChatOpen(true)} 
              size="lg" 
              className="gap-3 shadow-2xl shadow-primary/50 hover:shadow-accent/50 transition-all duration-300 hover:scale-110 active:scale-95 h-14 px-8 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] border-2 border-white/20 backdrop-blur-xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Sparkle size={24} weight="fill" className="animate-pulse relative z-10" />
              <span className="hidden sm:inline font-bold text-lg relative z-10">Ask Assistant</span>
              <span className="sm:hidden font-bold text-lg relative z-10">Chat</span>
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 md:space-y-10">
          <div className="flex justify-center overflow-x-auto pb-2">
            <TabsList className="inline-flex h-16 rounded-3xl bg-card/80 backdrop-blur-2xl border-2 border-white/10 shadow-2xl p-2 gap-2">
              <TabsTrigger 
                value="dashboard" 
                className="gap-3 px-5 sm:px-7 rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-primary/50 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                <House size={22} weight="duotone" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="gap-3 px-5 sm:px-7 rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-accent data-[state=active]:to-accent/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-accent/50 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                <Lightning size={22} weight="duotone" />
                <span className="hidden sm:inline">Actions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="gap-3 px-5 sm:px-7 rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-primary/50 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                <ListChecks size={22} weight="duotone" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger 
                value="habits" 
                className="gap-3 px-5 sm:px-7 rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-accent data-[state=active]:to-accent/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-accent/50 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                <Flame size={22} weight="duotone" />
                <span className="hidden sm:inline">Habits</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="gap-3 px-5 sm:px-7 rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-primary/50 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                <Note size={22} weight="duotone" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="automations" 
                className="gap-3 px-5 sm:px-7 rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-accent data-[state=active]:to-accent/80 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-accent/50 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                <Gear size={22} weight="duotone" />
                <span className="hidden sm:inline">Automations</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6 md:space-y-10 mt-10">
            <DailyBriefing onRegenerate={() => {}} />
            
            <ProductivityStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-2 border-accent/30 shadow-xl shadow-accent/20 backdrop-blur-xl">
                      <Lightning className="text-accent drop-shadow-lg" size={28} weight="duotone" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">Quick Actions</h2>
                  </div>
                  <QuickActions />
                </div>

                <TaskManager />
              </div>

              <div className="space-y-6 md:space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-2 border-primary/30 shadow-xl shadow-primary/20 backdrop-blur-xl">
                      <Sparkle className="text-primary drop-shadow-lg" size={28} weight="duotone" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Smart Suggestions</h2>
                  </div>
                  <SmartSuggestions />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 md:space-y-8 mt-10">
            <div>
              <div className="flex items-center gap-5 mb-10">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-2 border-accent/30 shadow-2xl shadow-accent/30 backdrop-blur-xl">
                  <Lightning className="text-accent drop-shadow-lg" size={36} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">Quick Actions</h2>
                  <p className="text-muted-foreground mt-2 text-base sm:text-lg font-semibold">
                    AI-powered shortcuts for your daily workflow
                  </p>
                </div>
              </div>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 md:space-y-8 mt-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-2 border-primary/30 shadow-2xl shadow-primary/30 backdrop-blur-xl">
                <ListChecks className="text-primary drop-shadow-lg" size={36} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">Task Management</h2>
                <p className="text-muted-foreground mt-2 text-base sm:text-lg font-semibold">
                  Smart tracking with AI-powered insights
                </p>
              </div>
            </div>
            <TaskManager />
          </TabsContent>

          <TabsContent value="habits" className="space-y-6 md:space-y-8 mt-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-2 border-accent/30 shadow-2xl shadow-accent/30 backdrop-blur-xl">
                <Flame className="text-accent drop-shadow-lg" size={36} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">Habit Tracker</h2>
                <p className="text-muted-foreground mt-2 text-base sm:text-lg font-semibold">
                  Build consistency and track your streaks
                </p>
              </div>
            </div>
            <HabitTracker />
          </TabsContent>

          <TabsContent value="notes" className="space-y-6 md:space-y-8 mt-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-2 border-primary/30 shadow-2xl shadow-primary/30 backdrop-blur-xl">
                <Note className="text-primary drop-shadow-lg" size={36} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">Quick Notes</h2>
                <p className="text-muted-foreground mt-2 text-base sm:text-lg font-semibold">
                  Capture ideas with AI-powered summaries
                </p>
              </div>
            </div>
            <NoteTaking />
          </TabsContent>

          <TabsContent value="automations" className="space-y-6 md:space-y-8 mt-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-2 border-accent/30 shadow-2xl shadow-accent/30 backdrop-blur-xl">
                <Gear className="text-accent drop-shadow-lg" size={36} weight="duotone" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">Automations</h2>
                <p className="text-muted-foreground mt-2 text-base sm:text-lg font-semibold">
                  Run pre-built workflows with AI assistance
                </p>
              </div>
            </div>
            <AutomationTemplates />
          </TabsContent>
        </Tabs>
      </div>

      <AIChat open={chatOpen} onOpenChange={setChatOpen} />
      <Toaster position="top-right" />
    </div>
  )
}

export default App