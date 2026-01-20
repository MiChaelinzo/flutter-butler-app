import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/s
import { useState } from 'react'
import { VirtualAssistant } from '@/components/VirtualAssistant'
interface ChatMessage {
  role: 'user' | 'assistant'
  timestamp: number

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export function AIChatEmbed() {
  const [messages, setMessages] = useKV<ChatMessage[]>('dashboard-chat-history', [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false)

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
    setIsAssistantSpeaking(true)

        t

      
        setIsAssistantSpeaking(false)

      setIsAssistantSpeaking(false)
      setIsLoading(false)
  }
  return (
      <div className="flex it
       


      
            <VirtualAssi
              isSpeaking={isAssistant
          </di

          <ScrollArea className="flex-1 p-4">
              {(messages || []).len
               
                  </div>
     
   

          
                      <div
                          message.role === 'user'
                            : 'bg-muted text-foreground'
                      >
              
                  ))}
            

                          <div className="w-2 h-2 rounded-ful
                        </div>
                    </div>
            <VirtualAssistant 
              isActive={true} 
              isSpeaking={isAssistantSpeaking || isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col h-[400px]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {(messages || []).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                    <Robot size={28} className="opacity-60" weight="duotone" />
                  </div>
                  <p className="text-sm font-medium">Start a conversation with Nexus</p>
                </div>
              ) : (
                <>
                  {(messages || []).map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-lg px-3 py-2 bg-muted">
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

          <div className="p-4 border-t border-border">
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Nexus anything..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading || !input.trim()}
                className="shrink-0"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </Button>







