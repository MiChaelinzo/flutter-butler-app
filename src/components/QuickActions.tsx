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
            <div
              key={action.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,100,0,0.4)] hover:-translate-y-2 active:scale-95 border border-orange/20 hover:border-orange/60 group overflow-hidden relative bg-background/20 backdrop-blur-sm rounded-xl p-5 sm:p-6 flex flex-col items-center text-center gap-4"
              onClick={() => handleActionClick(action.id)}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-gradient-to-br from-orange/30 via-accent/20 to-orange/20 flex items-center justify-center group-hover:scale-125 group-hover:from-orange/50 group-hover:to-accent/50 transition-all duration-300 border-2 border-orange/40 shadow-[0_0_20px_rgba(255,100,0,0.2)] group-hover:shadow-[0_0_40px_rgba(255,100,0,0.6)]">
                <Icon size={32} className="text-orange drop-shadow-[0_0_10px_rgba(255,100,0,0.6)] group-hover:text-orange transition-colors" weight="duotone" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-foreground mb-1.5 leading-tight tracking-tight">{action.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-snug font-medium">{action.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent className="max-w-2xl border border-primary/30 bg-background/90 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,200,255,0.3)]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4 text-2xl sm:text-3xl font-bold tracking-tight">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange/30 to-accent/30 flex items-center justify-center border-2 border-orange/50 shadow-[0_0_30px_rgba(255,100,0,0.4)]">
                <Lightning className="text-orange drop-shadow-[0_0_15px_rgba(255,100,0,0.8)]" size={28} weight="duotone" />
              </div>
              <span className="text-gradient-hot">{action?.title}</span>
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base font-medium text-muted-foreground pl-1">{action?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div>
              <label className="text-sm font-semibold mb-3 block text-foreground tracking-tight">Your Input</label>
              <Textarea
                placeholder={`Enter details for ${action?.title.toLowerCase()}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="resize-none rounded-xl border border-primary/20 focus:ring-2 focus:ring-primary focus:border-primary/60 text-sm sm:text-base bg-background/50 backdrop-blur-xl font-medium"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!input.trim() || isLoading}
              className="w-full h-14 text-base font-semibold tracking-wide shadow-[0_0_30px_rgba(255,100,0,0.4)] hover:shadow-[0_0_50px_rgba(255,100,0,0.6)] transition-all duration-300 bg-gradient-to-r from-orange via-accent to-orange bg-[length:200%_100%] hover:bg-[position:100%_0] border-2 border-orange/50 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">{isLoading ? 'Generating...' : 'Generate'}</span>
            </Button>

            {(result || isLoading) && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-foreground tracking-tight">Result</label>
                  {result && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="h-11 rounded-xl border border-primary/20 hover:bg-primary/20 hover:border-primary/60 backdrop-blur-xl font-semibold tracking-tight hover:shadow-[0_0_20px_rgba(0,200,255,0.3)]"
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
                <div className="bg-background/50 backdrop-blur-xl rounded-xl p-6 sm:p-7 min-h-[200px] border border-primary/20 shadow-[0_0_30px_rgba(0,200,255,0.2)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                  {isLoading ? (
                    <div className="space-y-3 relative">
                      <Skeleton className="h-5 w-full rounded-lg bg-muted/30 border border-primary/10" />
                      <Skeleton className="h-5 w-5/6 rounded-lg bg-muted/30 border border-primary/10" />
                      <Skeleton className="h-5 w-4/6 rounded-lg bg-muted/30 border border-primary/10" />
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
