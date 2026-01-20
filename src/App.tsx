import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Robot, House, Lightning, ListChecks, Sparkle, Note, Flame, Gear, Timer, Target, Calendar, ChartLine, Users, Microphone, Plugs, Moon, Sun, ShoppingCart, Trophy } from '@phosphor-icons/react'
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
import { useRewardSystem, RewardNotifications, CoinDisplay } from '@/components/RewardSystem'
import { VanityShop, type VanityItem } from '@/components/VanityShop'
import { Leaderboard } from '@/components/Leaderboard'
import { MusicPlayer } from '@/components/MusicPlayer'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const { theme, toggleTheme } = useTheme()
  const { coins, totalEarned, awardCoins, spendCoins, rewardQueue } = useRewardSystem()

  const handlePurchase = (item: VanityItem) => {
    const success = spendCoins(item.price)
    if (!success) {
      return
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {theme === 'dark' && <NebulaBackground />}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>
      
      <RewardNotifications events={rewardQueue || []} />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 relative z-10">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm">
                <Robot size={32} weight="duotone" className="text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime rounded-full border-2 border-background animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Nexus
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-lime rounded-full animate-pulse" />
                  AI Command Center
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MusicPlayer compact />
              <CoinDisplay amount={coins || 0} />
              <Button 
                onClick={toggleTheme}
                size="lg"
                variant="outline"
                className="h-10 w-10 rounded-lg"
              >
                {theme === 'dark' ? (
                  <Sun size={18} weight="duotone" />
                ) : (
                  <Moon size={18} weight="duotone" />
                )}
              </Button>
              <Button 
                onClick={() => setChatOpen(true)} 
                size="lg" 
                className="gap-2 h-10 px-4 font-semibold text-sm"
              >
                <Sparkle size={18} weight="fill" />
                <span className="hidden sm:inline">Activate AI</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 md:space-y-8">
          <div className="flex justify-center overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="inline-flex h-10 rounded-lg bg-card border border-border p-1 gap-0.5">
              <TabsTrigger 
                value="dashboard" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <House size={16} weight="duotone" />
                <span className="hidden sm:inline">Command</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <ChartLine size={16} weight="duotone" />
                <span className="hidden sm:inline">Intel</span>
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Users size={16} weight="duotone" />
                <span className="hidden sm:inline">Squad</span>
              </TabsTrigger>
              <TabsTrigger 
                value="voice" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Microphone size={16} weight="duotone" />
                <span className="hidden sm:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger 
                value="focus" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Timer size={16} weight="duotone" />
                <span className="hidden sm:inline">Focus</span>
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Target size={16} weight="duotone" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Calendar size={16} weight="duotone" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Lightning size={16} weight="duotone" />
                <span className="hidden sm:inline">Actions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <ListChecks size={16} weight="duotone" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger 
                value="habits" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Flame size={16} weight="duotone" />
                <span className="hidden sm:inline">Habits</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Note size={16} weight="duotone" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="api" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Plugs size={16} weight="duotone" />
                <span className="hidden sm:inline">API</span>
              </TabsTrigger>
              <TabsTrigger 
                value="automations" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Gear size={16} weight="duotone" />
                <span className="hidden sm:inline">Auto</span>
              </TabsTrigger>
              <TabsTrigger 
                value="shop" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <ShoppingCart size={16} weight="duotone" />
                <span className="hidden sm:inline">Shop</span>
              </TabsTrigger>
              <TabsTrigger 
                value="leaderboard" 
                className="gap-2 px-3 sm:px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium text-xs sm:text-sm transition-all"
              >
                <Trophy size={16} weight="duotone" />
                <span className="hidden sm:inline">Board</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6 md:space-y-8 mt-6">
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
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                      <Lightning className="text-primary" size={20} weight="duotone" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold">Quick Actions</h2>
                  </div>
                  <QuickActions />
                </div>

                <TaskManager />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                      <Sparkle className="text-primary" size={20} weight="duotone" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold">Smart AI</h2>
                  </div>
                  <SmartSuggestions />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="focus" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                <Timer className="text-primary" size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Focus Mode</h2>
                <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                  Deep Work Protocol
                </p>
              </div>
            </div>
            <FocusMode />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                <Target className="text-primary" size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Daily Goals</h2>
                <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                  Mission Objectives
                </p>
              </div>
            </div>
            <DailyGoals />
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 mt-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                  <Lightning className="text-primary" size={24} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">Quick Actions</h2>
                  <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                    AI-Powered Shortcuts
                  </p>
                </div>
              </div>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                <ListChecks className="text-primary" size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Task Manager</h2>
                <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                  Mission Control
                </p>
              </div>
            </div>
            <TaskManager />
          </TabsContent>

          <TabsContent value="habits" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                <Flame className="text-primary" size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Habit Tracker</h2>
                <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                  Build Consistency
                </p>
              </div>
            </div>
            <HabitTracker />
          </TabsContent>

          <TabsContent value="notes" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                <Note className="text-primary" size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Quick Notes</h2>
                <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                  AI Summaries
                </p>
              </div>
            </div>
            <NoteTaking />
          </TabsContent>

          <TabsContent value="api" className="space-y-6 mt-6">
            <APISettings />
          </TabsContent>

          <TabsContent value="automations" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                <Gear className="text-primary" size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Automations</h2>
                <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                  Workflow Engine
                </p>
              </div>
            </div>
            <AutomationTemplates />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6 mt-6">
            <CalendarView />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="team" className="space-y-6 mt-6">
            <TeamCollaboration />
          </TabsContent>

          <TabsContent value="voice" className="space-y-6 mt-6">
            <VoiceCommands />
          </TabsContent>

          <TabsContent value="shop" className="space-y-6 mt-6">
            <VanityShop coins={coins || 0} onPurchase={handlePurchase} />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6 mt-6">
            <Leaderboard userCoins={coins || 0} userTotalEarned={totalEarned || 0} />
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
