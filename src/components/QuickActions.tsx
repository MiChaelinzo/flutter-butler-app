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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap]
          return (
            <Card
              key={action.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 active:scale-95 border-2 border-white/10 group overflow-hidden relative bg-card backdrop-blur-2xl"
              onClick={() => handleActionClick(action.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.70_0.25_190)_0%,transparent_60%)] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              
              <CardContent className="p-5 sm:p-6 flex flex-col items-center text-center gap-4 relative">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/30 to-primary/20 flex items-center justify-center group-hover:scale-125 group-hover:from-primary/50 group-hover:to-accent/50 transition-all duration-300 border-2 border-white/20 shadow-xl shadow-primary/20 group-hover:shadow-2xl group-hover:shadow-primary/40">
                  <Icon size={32} className="text-foreground drop-shadow-lg group-hover:text-white transition-colors" weight="duotone" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground mb-1.5 leading-tight group-hover:text-white transition-colors">{action.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-snug font-semibold group-hover:text-foreground/90 transition-colors">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent className="max-w-2xl border-2 border-white/10 bg-card backdrop-blur-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4 text-2xl sm:text-3xl font-bold">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center border-2 border-white/20 shadow-2xl shadow-primary/30">
                <Lightning className="text-white drop-shadow-lg" size={28} weight="duotone" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">{action?.title}</span>
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base font-semibold text-muted-foreground pl-1">{action?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div>
              <label className="text-sm font-bold mb-3 block text-foreground">Your Input</label>
              <Textarea
                placeholder={`Enter details for ${action?.title.toLowerCase()}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="resize-none rounded-2xl border-2 border-white/10 focus:ring-2 focus:ring-primary focus:border-primary/50 text-sm sm:text-base bg-muted/50 backdrop-blur-xl font-medium"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!input.trim() || isLoading}
              className="w-full h-14 text-lg font-bold shadow-2xl shadow-primary/40 hover:shadow-accent/40 transition-all duration-300 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] border-2 border-white/20 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">{isLoading ? 'Generating...' : 'Generate'}</span>
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
                      className="h-11 rounded-xl border-2 border-white/10 hover:bg-primary/20 backdrop-blur-xl font-bold"
                    >
                      {copied ? (
                        <>
                          <Check size={18} className="mr-2" weight="bold" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={18} className="mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <div className="bg-muted/50 backdrop-blur-xl rounded-2xl p-6 sm:p-7 min-h-[200px] border-2 border-white/10 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
                  {isLoading ? (
                    <div className="space-y-3 relative">
                      <Skeleton className="h-5 w-full rounded-lg bg-muted/70" />
                      <Skeleton className="h-5 w-5/6 rounded-lg bg-muted/70" />
                      <Skeleton className="h-5 w-4/6 rounded-lg bg-muted/70" />
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed text-foreground font-semibold relative">{result}</p>
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
