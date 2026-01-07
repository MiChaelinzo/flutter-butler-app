import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Robot, PaperPlaneRight } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { ChatMessage } from '@/lib/types'

interface AIChatProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AIChat({ open, onOpenChange }: AIChatProps) {
  const [messages, setMessages] = useKV<ChatMessage[]>('butler-chat-history', [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    }

    setMessages((current) => [...(current || []), userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const promptText = `You are a helpful personal butler assistant. The user says: "${input}". Provide a helpful, concise response.`
      const prompt = window.spark.llmPrompt([promptText], '')
      const response = await window.spark.llm(prompt, 'gpt-4o-mini')

      const assistantMessage: ChatMessage = {
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[500px] flex flex-col p-0 border-l">
        <SheetHeader className="p-5 sm:p-6 pb-5 border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <SheetTitle className="flex items-center gap-3 text-xl sm:text-2xl font-semibold">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/20">
              <Robot className="text-primary" size={20} weight="duotone" />
            </div>
            AI Assistant
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-5 sm:p-6">
          <div className="space-y-4">
            {(messages || []).length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mx-auto mb-4 flex items-center justify-center">
                  <Robot size={32} className="opacity-60" weight="duotone" />
                </div>
                <p className="text-sm sm:text-[15px] font-semibold text-foreground mb-1">Start a conversation</p>
                <p className="text-xs sm:text-sm">Your AI assistant is ready to help</p>
              </div>
            ) : (
              <>
                {(messages || []).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground'
                          : 'bg-muted/80 text-foreground border'
                      }`}
                    >
                      <p className="text-sm sm:text-[15px] whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-xl px-4 py-3 bg-muted/80 border">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>

        <div className="p-5 sm:p-6 pt-5 border-t bg-muted/20">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex gap-2.5"
          >
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              id="chat-input"
              className="h-11 rounded-xl border text-sm sm:text-[15px]"
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading} 
              size="icon"
              className="h-11 w-11 rounded-xl shadow-sm flex-shrink-0"
            >
              <PaperPlaneRight size={18} weight="bold" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
