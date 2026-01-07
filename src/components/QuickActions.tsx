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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap]
          return (
            <Card
              key={action.id}
              className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 active:scale-98"
              onClick={() => handleActionClick(action.id)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon size={24} className="text-accent" weight="bold" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightning className="text-accent" size={24} weight="fill" />
              {action?.title}
            </DialogTitle>
            <DialogDescription>{action?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Input</label>
              <Textarea
                placeholder={`Enter details for ${action?.title.toLowerCase()}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!input.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>

            {(result || isLoading) && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Result</label>
                  {result && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8"
                    >
                      {copied ? (
                        <>
                          <Check size={16} className="mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <div className="bg-muted rounded-lg p-4 min-h-[200px]">
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{result}</p>
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
