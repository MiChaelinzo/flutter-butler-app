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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
                Butler
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Your AI-powered personal assistant
              </p>
            </div>
            <Button onClick={() => setChatOpen(true)} size="lg" className="gap-2">
              <Robot size={20} weight="fill" />
              <span className="hidden sm:inline">Ask Assistant</span>
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="dashboard" className="gap-2">
              <House size={18} weight="fill" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="actions" className="gap-2">
              <Lightning size={18} weight="fill" />
              <span className="hidden sm:inline">Actions</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="gap-2">
              <ListChecks size={18} weight="bold" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DailyBriefing onRegenerate={() => {}} />
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightning className="text-accent" size={24} weight="fill" />
                <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
              </div>
              <QuickActions />
            </div>

            <TaskManager />
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightning className="text-accent" size={28} weight="fill" />
                <h2 className="text-2xl font-semibold text-foreground">Quick Actions</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                AI-powered shortcuts for common tasks. Click any action to get started.
              </p>
              <QuickActions />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="text-primary" size={28} weight="bold" />
                <h2 className="text-2xl font-semibold text-foreground">Task Management</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Smart task tracking with AI-powered priority suggestions and time estimates.
              </p>
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