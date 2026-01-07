import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lightbulb, X, CheckCircle, ArrowRight } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { SmartSuggestion } from '@/lib/types'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export function SmartSuggestions() {
  const [suggestions, setSuggestions] = useKV<SmartSuggestion[]>('butler-suggestions', [])
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if ((suggestions || []).length === 0 && !isGenerating) {
      generateSuggestions()
    }
  }, [])

  const generateSuggestions = async () => {
    setIsGenerating(true)
    try {
      const hour = new Date().getHours()
      const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'

      const promptText = `Generate 3 actionable productivity suggestions for someone in the ${timeOfDay}. Return as JSON with structure: {"suggestions": [{"type": "productivity|habit|task|automation", "title": "Brief title", "description": "One sentence description", "action": "Call to action"}]}`
      
      const prompt = window.spark.llmPrompt([promptText], '')
      const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const data = JSON.parse(response)

      const newSuggestions: SmartSuggestion[] = data.suggestions.map((s: any, idx: number) => ({
        id: `${Date.now()}-${idx}`,
        type: s.type || 'productivity',
        title: s.title,
        description: s.description,
        action: s.action,
        dismissed: false,
        createdAt: Date.now()
      }))

      setSuggestions(newSuggestions)
    } catch (error) {
      console.error('Failed to generate suggestions:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const dismissSuggestion = (id: string) => {
    setSuggestions((current) =>
      (current || []).map((s) => (s.id === id ? { ...s, dismissed: true } : s))
    )
  }

  const completeSuggestion = (id: string) => {
    dismissSuggestion(id)
    toast.success('Great work! Keep it up')
  }

  const activeSuggestions = (suggestions || []).filter((s) => !s.dismissed)

  if (activeSuggestions.length === 0 && !isGenerating) {
    return null
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'productivity':
        return 'from-primary/20 to-primary/10 border-primary/30'
      case 'habit':
        return 'from-accent/20 to-accent/10 border-accent/30'
      case 'task':
        return 'from-primary/20 to-primary/10 border-primary/30'
      case 'automation':
        return 'from-accent/20 to-accent/10 border-accent/30'
      default:
        return 'from-muted/40 to-muted/20 border-border'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'productivity':
        return <Lightbulb className="text-primary" size={20} weight="duotone" />
      case 'habit':
        return <CheckCircle className="text-accent" size={20} weight="duotone" />
      case 'task':
        return <Lightbulb className="text-primary" size={20} weight="duotone" />
      case 'automation':
        return <Lightbulb className="text-accent" size={20} weight="duotone" />
      default:
        return <Lightbulb className="text-muted-foreground" size={20} weight="duotone" />
    }
  }

  return (
    <div className="space-y-4">
      {activeSuggestions.map((suggestion) => (
        <Card
          key={suggestion.id}
          className={`border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative bg-gradient-to-r ${getTypeColor(
            suggestion.type
          )}`}
        >
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-md border border-border/30">
              {getTypeIcon(suggestion.type)}
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-foreground">{suggestion.title}</h4>
              <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                {suggestion.description}
              </p>
              {suggestion.action && (
                <Button
                  onClick={() => completeSuggestion(suggestion.id)}
                  variant="outline"
                  size="sm"
                  className="mt-3 h-9 rounded-xl border border-border/50 hover:bg-card/60 font-bold"
                >
                  {suggestion.action}
                  <ArrowRight className="ml-2" size={16} weight="bold" />
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dismissSuggestion(suggestion.id)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-card/60 rounded-lg flex-shrink-0"
            >
              <X size={18} weight="bold" />
            </Button>
          </CardContent>
        </Card>
      ))}
      {activeSuggestions.length > 0 && (
        <Button
          onClick={generateSuggestions}
          disabled={isGenerating}
          variant="outline"
          size="sm"
          className="w-full h-10 rounded-xl border border-border/50 hover:bg-muted/80 font-bold"
        >
          {isGenerating ? 'Generating...' : 'Get More Suggestions'}
        </Button>
      )}
    </div>
  )
}
