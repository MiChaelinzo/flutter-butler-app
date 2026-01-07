import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { 
  Lightning, 
  Envelope, 
  Users, 
  Note, 
  Lightbulb, 
  ListChecks, 
  MagnifyingGlass,
  Copy,
  Check
} from '@phosphor-icons/react'
import { useState } from 'react'
import { QUICK_ACTIONS } from '@/lib/constants'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

const iconMap = {
  envelope: Envelope,
  users: Users,
  note: Note,
  lightbulb: Lightbulb,
  'list-checks': ListChecks,
  'magnifying-glass': MagnifyingGlass
}

export function QuickActions() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId)
    setInput('')
    setResult('')
  }

  const handleGenerate = async () => {
    const action = QUICK_ACTIONS.find(a => a.id === selectedAction)
    if (!action || !input.trim()) return

    setIsLoading(true)
    try {
      const promptText = action.prompt + input
      const prompt = window.spark.llmPrompt([promptText], '')
      const response = await window.spark.llm(prompt, 'gpt-4o-mini')
      setResult(response)
    } catch (error) {
      console.error('Failed to generate:', error)
      toast.error('Failed to generate content')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const action = QUICK_ACTIONS.find(a => a.id === selectedAction)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap]
          return (
            <Card
              key={action.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 border border-border/50 group overflow-hidden relative bg-card/80 backdrop-blur-sm"
              onClick={() => handleActionClick(action.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
              
              <CardContent className="p-5 sm:p-6 flex flex-col items-center text-center gap-3.5 relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent/25 via-accent/15 to-primary/15 flex items-center justify-center group-hover:scale-110 group-hover:from-accent/35 group-hover:to-primary/25 transition-all duration-300 border border-accent/30 shadow-lg shadow-accent/10">
                  <Icon size={28} className="text-accent group-hover:text-accent transition-colors" weight="duotone" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground mb-1 leading-tight">{action.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-snug font-medium">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent className="max-w-2xl border border-border/50 bg-card/95 backdrop-blur-md shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3.5 text-2xl sm:text-3xl font-bold">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/15 flex items-center justify-center border border-accent/40 shadow-lg shadow-accent/20">
                <Lightning className="text-accent" size={24} weight="duotone" />
              </div>
              {action?.title}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base font-medium">{action?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mt-6">
            <div>
              <label className="text-sm font-bold mb-3 block text-foreground">Your Input</label>
              <Textarea
                placeholder={`Enter details for ${action?.title.toLowerCase()}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="resize-none rounded-2xl border border-border/50 focus:ring-2 focus:ring-primary text-sm sm:text-base bg-muted/30 backdrop-blur-sm"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!input.trim() || isLoading}
              className="w-full h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>

            {(result || isLoading) && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-foreground">Result</label>
                  {result && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="h-10 rounded-xl border border-border/50 hover:bg-muted/80"
                    >
                      {copied ? (
                        <>
                          <Check size={16} className="mr-2" weight="bold" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-5 sm:p-6 min-h-[200px] border border-border/50">
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full rounded-lg bg-muted/50" />
                      <Skeleton className="h-4 w-5/6 rounded-lg bg-muted/50" />
                      <Skeleton className="h-4 w-4/6 rounded-lg bg-muted/50" />
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed text-foreground font-medium">{result}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
