import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PaperPlaneRight, TrashSimple, Robot, User } from '@phosphor-icons/react'
import { useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatBoxProps {
  storageKey: string
  title: string
  placeholder: string
}

export function ChatBox({ storageKey, title, placeholder }: ChatBoxProps) {
  const [messages, setMessages] = useKV<Message[]>(storageKey, [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    }

    setMessages((current) => [...(current || []), userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const prompt = window.spark.llmPrompt`You are a helpful assistant in a productivity app. User says: ${input}`
      const response = await window.spark.llm(prompt, 'gpt-4o-mini')
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }

      setMessages((current) => [...(current || []), assistantMessage])
    } catch (error) {
      console.error('Failed to get response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([])
  }

  return (
    <Card className="border border-border/50 bg-card/80 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {messages && messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="gap-2 text-muted-foreground hover:text-destructive"
          >
            <TrashSimple size={16} />
            Clear
          </Button>
        )}
      </div>

      <ScrollArea className="h-[300px] mb-4 pr-4">
        <div className="space-y-4">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Robot size={18} weight="duotone" className="text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <User size={18} weight="duotone" className="text-accent" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
              Start a conversation...
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="gap-2"
        >
          <PaperPlaneRight size={16} weight="fill" />
        </Button>
      </form>
    </Card>
  )
}
