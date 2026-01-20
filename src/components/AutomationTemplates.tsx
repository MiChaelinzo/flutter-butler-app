import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Play, Clock, CheckCircle, Gear } from '@phosphor-icons/react'
import { useState } from 'react'
import { AUTOMATION_TEMPLATES } from '@/lib/constants'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

export function AutomationTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<string[]>([])

  const runAutomation = async (templateId: string) => {
    const template = AUTOMATION_TEMPLATES.find((t) => t.id === templateId)
    if (!template) return

    setIsRunning(true)
    setResult([])

    try {
      for (const step of template.steps) {
        const promptText = `You are helping with automation step: "${step}". Provide a brief, actionable output for this step. Keep it concise (1-2 sentences).`
        const prompt = window.spark.llmPrompt([promptText], '')
        const response = await window.spark.llm(prompt, 'gpt-4o-mini')
        
        setResult((current) => [...current, `✓ ${step}: ${response}`])
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
      
      toast.success('Automation completed')
    } catch (error) {
      console.error('Failed to run automation:', error)
      toast.error('Automation failed')
    } finally {
      setIsRunning(false)
    }
  }

  const handleRunClick = (templateId: string) => {
    setSelectedTemplate(templateId)
    setResult([])
    runAutomation(templateId)
  }

  const template = AUTOMATION_TEMPLATES.find((t) => t.id === selectedTemplate)

  return (
    <Card className="shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3.5 text-2xl sm:text-3xl font-bold">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/15 flex items-center justify-center border border-accent/40 shadow-lg shadow-accent/20">
            <Gear className="text-accent" size={24} weight="duotone" />
          </div>
          Automation Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AUTOMATION_TEMPLATES.map((automation) => (
            <Card
              key={automation.id}
              className="border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card/50 backdrop-blur-sm overflow-hidden group card-gradient-hover"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/25 to-accent/15 flex items-center justify-center flex-shrink-0 border border-accent/30 shadow-md">
                    <Clock className="text-accent" size={24} weight="duotone" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 line-clamp-1">
                      {automation.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-snug font-medium line-clamp-2">
                      {automation.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-border/30">
                  {automation.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} weight="duotone" />
                      <span className="text-muted-foreground font-medium leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
                <Dialog open={selectedTemplate === automation.id} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleRunClick(automation.id)}
                      className="w-full h-10 rounded-xl bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-md font-bold text-sm"
                    >
                      <Play size={16} weight="fill" className="mr-2" />
                      Run Automation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border border-border/50 bg-card/95 backdrop-blur-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3.5 text-2xl font-bold">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/15 flex items-center justify-center border border-accent/40 shadow-lg shadow-accent/20">
                          <Gear className="text-accent" size={24} weight="duotone" />
                        </div>
                        {template?.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 mt-4">
                      <p className="text-sm sm:text-base text-muted-foreground font-medium">
                        {template?.description}
                      </p>
                      <ScrollArea className="h-[400px] rounded-2xl border border-border/50 bg-muted/30 backdrop-blur-sm p-5">
                        <div className="space-y-4">
                          {isRunning && result.length === 0 && (
                            <div className="space-y-3">
                              <Skeleton className="h-5 w-full rounded-lg bg-muted/50" />
                              <Skeleton className="h-5 w-5/6 rounded-lg bg-muted/50" />
                              <Skeleton className="h-5 w-4/6 rounded-lg bg-muted/50" />
                            </div>
                          )}
                          {result.map((line, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/30 animate-in fade-in slide-in-from-bottom-2 duration-300"
                              style={{ animationDelay: `${idx * 100}ms` }}
                            >
                              <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium whitespace-pre-wrap">
                                {line}
                              </p>
                            </div>
                          ))}
                          {isRunning && result.length > 0 && (
                            <div className="flex items-center gap-2 text-muted-foreground p-4">
                              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                              <span className="text-sm font-medium">Processing...</span>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                      {!isRunning && result.length > 0 && (
                        <Button
                          onClick={() => {
                            setResult([])
                            runAutomation(automation.id)
                          }}
                          className="w-full h-12 rounded-2xl bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg font-bold"
                        >
                          <Play size={20} weight="fill" className="mr-2" />
                          Run Again
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
