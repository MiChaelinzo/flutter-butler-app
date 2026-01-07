import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Robot, House, Lightning, ListChecks } from '@phosphor-icons/react'
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,oklch(0.85_0.08_250)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,oklch(0.90_0.12_75)_0%,transparent_50%)] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,oklch(0.35_0.10_250)_2px,oklch(0.35_0.10_250)_3px)] opacity-[0.015] pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 relative">
        <header className="mb-8 md:mb-12">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div className="space-y-2">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent/40 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Robot size={32} weight="duotone" className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                    Butler
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-base mt-0.5">
                    Your intelligent AI companion
                  </p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setChatOpen(true)} 
              size="lg" 
              className="gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] h-11 px-5"
            >
              <Robot size={20} weight="bold" />
              <span className="hidden sm:inline font-semibold text-[15px]">Ask Assistant</span>
              <span className="sm:hidden font-semibold text-[15px]">Chat</span>
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 md:space-y-8">
          <div className="flex justify-center">
            <TabsList className="inline-flex h-11 rounded-xl bg-card border border-border shadow-sm p-1">
              <TabsTrigger 
                value="dashboard" 
                className="gap-2 px-4 sm:px-5 rounded-lg data-[state=active]:shadow-sm font-semibold text-[15px]"
              >
                <House size={18} weight="duotone" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="gap-2 px-4 sm:px-5 rounded-lg data-[state=active]:shadow-sm font-semibold text-[15px]"
              >
                <Lightning size={18} weight="duotone" />
                <span className="hidden sm:inline">Actions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="gap-2 px-4 sm:px-5 rounded-lg data-[state=active]:shadow-sm font-semibold text-[15px]"
              >
                <ListChecks size={18} weight="duotone" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6 md:space-y-8 mt-6">
            <DailyBriefing onRegenerate={() => {}} />
            
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <Lightning className="text-accent" size={20} weight="duotone" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Quick Actions</h2>
              </div>
              <QuickActions />
            </div>

            <TaskManager />
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 md:space-y-8 mt-6">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <Lightning className="text-accent" size={24} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Quick Actions</h2>
                  <p className="text-muted-foreground mt-1 text-sm sm:text-[15px]">
                    AI-powered shortcuts for your daily workflow
                  </p>
                </div>
              </div>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 md:space-y-8 mt-6">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <ListChecks className="text-primary" size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Task Management</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-[15px]">
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