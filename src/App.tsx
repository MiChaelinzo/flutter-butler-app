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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.85_0.15_285)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.80_0.18_45)_0%,transparent_50%)] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,oklch(0.55_0.22_285)_20px,oklch(0.55_0.22_285)_21px)] opacity-[0.02] pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
        <header className="mb-10 md:mb-14">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Robot size={28} weight="fill" className="text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Butler
                </h1>
              </div>
              <p className="text-muted-foreground text-base md:text-lg ml-[60px]">
                Your intelligent AI companion
              </p>
            </div>
            <Button 
              onClick={() => setChatOpen(true)} 
              size="lg" 
              className="gap-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Robot size={22} weight="fill" />
              <span className="hidden sm:inline font-medium">Ask Assistant</span>
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="inline-flex h-12 rounded-2xl bg-card/80 backdrop-blur-sm border shadow-sm p-1.5">
              <TabsTrigger 
                value="dashboard" 
                className="gap-2 px-5 rounded-xl data-[state=active]:shadow-md"
              >
                <House size={20} weight="fill" />
                <span className="hidden sm:inline font-medium">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="gap-2 px-5 rounded-xl data-[state=active]:shadow-md"
              >
                <Lightning size={20} weight="fill" />
                <span className="hidden sm:inline font-medium">Actions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="gap-2 px-5 rounded-xl data-[state=active]:shadow-md"
              >
                <ListChecks size={20} weight="bold" />
                <span className="hidden sm:inline font-medium">Tasks</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-8 mt-8">
            <DailyBriefing onRegenerate={() => {}} />
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Lightning className="text-accent" size={22} weight="fill" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
              </div>
              <QuickActions />
            </div>

            <TaskManager />
          </TabsContent>

          <TabsContent value="actions" className="space-y-8 mt-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Lightning className="text-accent" size={28} weight="fill" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Quick Actions</h2>
                  <p className="text-muted-foreground mt-1">
                    AI-powered shortcuts for your daily workflow
                  </p>
                </div>
              </div>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <ListChecks className="text-primary" size={28} weight="bold" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Task Management</h2>
                <p className="text-muted-foreground mt-1">
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