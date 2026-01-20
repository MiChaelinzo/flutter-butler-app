import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Robot, PaperPlaneRight, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatBoxProps {
  storageKey: string
  title?: string
  placeholder?: string
}

export function ChatBox({ storageKey, title = 'AI Chat', placeholder = 'Ask me anything...' }: ChatBoxProps) {
  const [messages, setMessages] = useKV<Message[]>(storageKey, [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

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
      const promptText = `You are a helpful AI assistant in a productivity app. The user says: "${input}". Provide a helpful, concise, and actionable response.`
      const prompt = window.spark.llmPrompt([promptText], '')
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

  const clearMessages = () => {
    setMessages([])
  }

  return (
    <Card className="border-border bg-card flex flex-col h-[600px]">
      <div className="p-5 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/20">
            <Robot className="text-primary" size={20} weight="duotone" />
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        {(messages || []).length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearMessages}
            className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash size={16} weight="duotone" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 p-5">
        <div className="space-y-4">
          {(messages || []).length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 mx-auto mb-4 flex items-center justify-center border border-primary/20">
                <Robot size={32} className="opacity-60" weight="duotone" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Start a conversation</p>
              <p className="text-xs">Ask questions or get assistance</p>
            </div>
          ) : (
            <>
              {(messages || []).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground'
                        : 'bg-muted/60 text-foreground border border-border/50'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl px-4 py-3 bg-muted/60 border border-border/50">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      <div className="p-5 border-t border-border bg-muted/20">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="h-10 rounded-lg border-border/50 text-sm bg-background"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading} 
            size="icon"
            className="h-10 w-10 rounded-lg flex-shrink-0 bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <PaperPlaneRight size={18} weight="bold" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
