import { useKV } from '@github/spark/hooks'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Robot, User, PaperPlaneRight, Trash } from '@phosphor-icons/react'
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
      content: input.trim(),
      timestamp: Date.now(),
    }

    setMessages((current) => [...(current || []), userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const promptText = `You are a helpful AI assistant in a productivity app. The user said: "${input.trim()}". Provide a helpful, concise response.`
      const prompt = window.spark.llmPrompt([promptText], input.trim())
      const response = await window.spark.llm(prompt, 'gpt-4o-mini')

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }

      setMessages((current) => [...(current || []), assistantMessage])
    } catch (error) {
      console.error('Failed to get AI response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([])
  }

  return (
    <div className="border border-border/20 bg-background/30 backdrop-blur-sm p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Robot size={20} weight="duotone" className="text-primary" />
          {title}
        </h3>
        {messages && messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-8 gap-2"
          >
            <Trash size={16} />
            Clear
          </Button>
        )}
      </div>

      <ScrollArea className="h-[300px] pr-4 mb-4">
        <div className="space-y-4">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Robot size={16} weight="duotone" className="text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background/60 backdrop-blur-sm border border-border/20 text-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <User size={16} weight="duotone" className="text-accent" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No messages yet. Start a conversation!
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
    </div>
  )
}
