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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap]
          return (
            <Card
              key={action.id}
              className="cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 border-2 group overflow-hidden relative bg-card/90 backdrop-blur-sm"
              onClick={() => handleActionClick(action.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-5 flex flex-col items-center text-center gap-3 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Icon size={28} className="text-accent group-hover:text-primary transition-colors" weight="bold" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1 leading-tight">{action.title}</h3>
                  <p className="text-xs text-muted-foreground leading-snug">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent className="max-w-2xl border-2">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                <Lightning className="text-white" size={22} weight="fill" />
              </div>
              {action?.title}
            </DialogTitle>
            <DialogDescription className="text-base">{action?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            <div>
              <label className="text-sm font-bold mb-2.5 block text-foreground">Your Input</label>
              <Textarea
                placeholder={`Enter details for ${action?.title.toLowerCase()}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="resize-none rounded-xl border-2 focus:ring-2"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!input.trim() || isLoading}
              className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl"
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
                      className="h-9 rounded-xl border-2"
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
                <div className="bg-muted/50 backdrop-blur-sm rounded-2xl p-5 min-h-[200px] border-2">
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full rounded-lg" />
                      <Skeleton className="h-4 w-5/6 rounded-lg" />
                      <Skeleton className="h-4 w-4/6 rounded-lg" />
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground">{result}</p>
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
