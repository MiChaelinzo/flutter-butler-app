import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Robot, PaperPlaneRight } from '@phosphor-icons/react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatBoxProps {
  storageKey: string
  title: string
  placeholder?: string
}

export function ChatBox({ storageKey, title, placeholder = "Type your message..." }: ChatBoxProps) {
  const [messages, setMessages] = useKV<Message[]>(storageKey, [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
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
      const prompt = window.spark.llmPrompt`You are a helpful AI assistant in a productivity app. The user says: "${input}". Provide a helpful, concise, and actionable response.`
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
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
            <Robot size={20} weight="duotone" className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {messages && messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClear}>
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
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[260px] text-muted-foreground">
              <Robot size={48} weight="duotone" className="mb-2 opacity-50" />
              <p className="text-sm">No messages yet. Start a conversation!</p>
            </div>
          )}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="bg-muted text-foreground rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        className="flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 bg-background border-border"
        />
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="gap-2"
        >
          <PaperPlaneRight size={16} weight="fill" />
          Send
        </Button>
      </form>
    </Card>
  )
}
