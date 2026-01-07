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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap]
          return (
            <Card
              key={action.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] border group overflow-hidden relative bg-card"
              onClick={() => handleActionClick(action.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-4 sm:p-5 flex flex-col items-center text-center gap-2.5 sm:gap-3 relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent/15 to-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform border border-accent/10">
                  <Icon size={24} className="text-accent group-hover:text-primary transition-colors" weight="duotone" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-0.5 sm:mb-1 leading-tight">{action.title}</h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent className="max-w-2xl border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl font-semibold">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/20">
                <Lightning className="text-accent" size={20} weight="duotone" />
              </div>
              {action?.title}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-[15px]">{action?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-semibold mb-2 block text-foreground">Your Input</label>
              <Textarea
                placeholder={`Enter details for ${action?.title.toLowerCase()}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="resize-none rounded-xl border focus:ring-2 text-sm sm:text-[15px]"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!input.trim() || isLoading}
              className="w-full h-11 text-[15px] font-semibold shadow-sm hover:shadow-md"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>

            {(result || isLoading) && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-sm font-semibold text-foreground">Result</label>
                  {result && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="h-9 rounded-lg border"
                    >
                      {copied ? (
                        <>
                          <Check size={16} className="mr-1.5" weight="bold" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="mr-1.5" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <div className="bg-muted/50 rounded-xl p-4 sm:p-5 min-h-[200px] border">
                  {isLoading ? (
                    <div className="space-y-2.5">
                      <Skeleton className="h-3.5 w-full rounded-lg" />
                      <Skeleton className="h-3.5 w-5/6 rounded-lg" />
                      <Skeleton className="h-3.5 w-4/6 rounded-lg" />
                    </div>
                  ) : (
                    <p className="text-sm sm:text-[15px] whitespace-pre-wrap leading-relaxed text-foreground">{result}</p>
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
