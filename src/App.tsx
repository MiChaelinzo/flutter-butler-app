import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Robot, House, Lightning, ListChecks, Sparkle } from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'
import { DailyBriefing } from '@/components/DailyBriefing'
import { QuickActions } from '@/components/QuickActions'
import { TaskManager } from '@/components/TaskManager'
import { AIChat } from '@/components/AIChat'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.30_0.15_145)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,oklch(0.30_0.15_80)_0%,transparent_50%)] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_100px,oklch(0.72_0.19_145)_100px,oklch(0.72_0.19_145)_101px),repeating-linear-gradient(90deg,transparent,transparent_100px,oklch(0.72_0.19_145)_100px,oklch(0.72_0.19_145)_101px)] opacity-[0.03] pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 relative">
        <header className="mb-8 md:mb-10">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-xl opacity-50 rounded-2xl" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 border border-primary/20">
                    <Robot size={36} weight="duotone" className="text-background" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text">
                    Butler
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-base mt-1 font-medium">
                    Your AI-powered personal assistant
                  </p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setChatOpen(true)} 
              size="lg" 
              className="gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 h-12 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/30"
            >
              <Sparkle size={20} weight="fill" className="animate-pulse" />
              <span className="hidden sm:inline font-bold text-base">Ask Assistant</span>
              <span className="sm:hidden font-bold text-base">Chat</span>
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 md:space-y-8">
          <div className="flex justify-center">
            <TabsList className="inline-flex h-14 rounded-2xl bg-card/50 backdrop-blur-sm border border-border shadow-lg p-1.5 gap-1">
              <TabsTrigger 
                value="dashboard" 
                className="gap-2.5 px-5 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-bold text-base transition-all duration-200"
              >
                <House size={20} weight="duotone" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="gap-2.5 px-5 sm:px-6 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md font-bold text-base transition-all duration-200"
              >
                <Lightning size={20} weight="duotone" />
                <span className="hidden sm:inline">Actions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="gap-2.5 px-5 sm:px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-bold text-base transition-all duration-200"
              >
                <ListChecks size={20} weight="duotone" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6 md:space-y-8 mt-8">
            <DailyBriefing onRegenerate={() => {}} />
            
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/10">
                  <Lightning className="text-accent" size={24} weight="duotone" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Quick Actions</h2>
              </div>
              <QuickActions />
            </div>

            <TaskManager />
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 md:space-y-8 mt-8">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/10">
                  <Lightning className="text-accent" size={32} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Quick Actions</h2>
                  <p className="text-muted-foreground mt-1.5 text-sm sm:text-base font-medium">
                    AI-powered shortcuts for your daily workflow
                  </p>
                </div>
              </div>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 md:space-y-8 mt-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
                <ListChecks className="text-primary" size={32} weight="duotone" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Task Management</h2>
                <p className="text-muted-foreground mt-1.5 text-sm sm:text-base font-medium">
                  Smart tracking with AI-powered insights
                </p>
              </div>
            </div>
            <TaskManager />
          </TabsContent>
        </Tabs>
      </div>

      <AIChat open={chatOpen} onOpenChange={setChatOpen} />
      <Toaster position="top-right" />
    </div>
  )
}

export default App