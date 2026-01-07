import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Robot, PaperPlaneRight, VideoCamera, Phone, Microphone, MicrophoneSlash, SpeakerHigh, SpeakerSlash, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { ChatMessage } from '@/lib/types'
import { VirtualAssistant } from '@/components/VirtualAssistant'
import { toast } from 'sonner'

interface AIChatProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type CallMode = 'text' | 'video' | 'audio'

export function AIChat({ open, onOpenChange }: AIChatProps) {
  const [messages, setMessages] = useKV<ChatMessage[]>('butler-chat-history', [])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [callMode, setCallMode] = useState<CallMode>('text')
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
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
      
      setTimeout(() => {
        setIsAssistantSpeaking(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to get response:', error)
      setIsAssistantSpeaking(false)
    } finally {
      setIsLoading(false)
    }
  }

  const startVideoCall = () => {
    setCallMode('video')
    toast.success('Video call started', {
      description: 'Your AI assistant is now visible'
    })
  }

  const startAudioCall = () => {
    setCallMode('audio')
    toast.success('Audio call started', {
      description: 'Voice mode activated'
    })
  }

  const endCall = () => {
    setCallMode('text')
    setIsMuted(false)
    setIsSpeakerOn(true)
    toast.info('Call ended', {
      description: 'Switched back to text mode'
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[500px] flex flex-col p-0 border-l border-border/50 bg-background/95 backdrop-blur-md">
        <SheetHeader className="p-6 sm:p-7 pb-6 border-b border-border/50 bg-gradient-to-r from-primary/10 via-accent/5 to-accent/10">
          <SheetTitle className="flex items-center justify-between text-2xl sm:text-3xl font-bold">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center border border-primary/40 shadow-lg shadow-primary/20">
                <Robot className="text-primary" size={24} weight="duotone" />
              </div>
              AI Assistant
            </div>
            
            {callMode === 'text' && (
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={startVideoCall}
                  className="h-10 w-10 rounded-xl border-orange/40 hover:bg-orange/10 hover:border-orange transition-all duration-300 group"
                >
                  <VideoCamera size={20} weight="duotone" className="text-orange group-hover:scale-110 transition-transform" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={startAudioCall}
                  className="h-10 w-10 rounded-xl border-accent/40 hover:bg-accent/10 hover:border-accent transition-all duration-300 group"
                >
                  <Phone size={20} weight="duotone" className="text-accent group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            )}
          </SheetTitle>
        </SheetHeader>

        {(callMode === 'video' || callMode === 'audio') && (
          <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-orange/20 border-b border-border/50">
            <div className="aspect-video w-full overflow-hidden relative">
              <VirtualAssistant 
                isActive={callMode === 'video' || callMode === 'audio'} 
                isSpeaking={isAssistantSpeaking || isLoading}
              />
              
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-white/20">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {callMode === 'video' ? 'Video Call' : 'Audio Call'}
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`h-12 w-12 rounded-full shadow-xl transition-all duration-300 ${
                    isMuted 
                      ? 'bg-destructive hover:bg-destructive/90 text-white' 
                      : 'bg-white/90 hover:bg-white'
                  }`}
                >
                  {isMuted ? (
                    <MicrophoneSlash size={20} weight="bold" />
                  ) : (
                    <Microphone size={20} weight="bold" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`h-12 w-12 rounded-full shadow-xl transition-all duration-300 ${
                    !isSpeakerOn 
                      ? 'bg-destructive hover:bg-destructive/90 text-white' 
                      : 'bg-white/90 hover:bg-white'
                  }`}
                >
                  {isSpeakerOn ? (
                    <SpeakerHigh size={20} weight="bold" />
                  ) : (
                    <SpeakerSlash size={20} weight="bold" />
                  )}
                </Button>

                <Button
                  size="icon"
                  onClick={endCall}
                  className="h-12 w-12 rounded-full bg-destructive hover:bg-destructive/90 text-white shadow-xl shadow-destructive/30"
                >
                  <X size={20} weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <ScrollArea className="flex-1 p-6 sm:p-7">
          <div className="space-y-5">
            {(messages || []).length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 mx-auto mb-5 flex items-center justify-center border border-primary/30">
                  <Robot size={40} className="opacity-60" weight="duotone" />
                </div>
                <p className="text-base sm:text-lg font-bold text-foreground mb-2">Start a conversation</p>
                <p className="text-sm sm:text-base font-medium">Your AI assistant is ready to help</p>
                {callMode === 'text' && (
                  <div className="mt-6 flex flex-col gap-3 items-center">
                    <p className="text-sm font-semibold text-foreground">Or start a call:</p>
                    <div className="flex gap-3">
                      <Button
                        onClick={startVideoCall}
                        className="gap-2 bg-gradient-to-br from-orange to-orange/80 hover:from-orange/90 hover:to-orange/70 text-white shadow-lg shadow-orange/30"
                      >
                        <VideoCamera size={18} weight="duotone" />
                        Video Call
                      </Button>
                      <Button
                        onClick={startAudioCall}
                        className="gap-2 bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white shadow-lg shadow-accent/30"
                      >
                        <Phone size={18} weight="duotone" />
                        Audio Call
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {(messages || []).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground border border-primary/30'
                          : 'bg-muted/60 backdrop-blur-sm text-foreground border border-border/50'
                      }`}
                    >
                      <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed font-medium">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl px-5 py-4 bg-muted/60 backdrop-blur-sm border border-border/50">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 sm:p-7 pt-6 border-t border-border/50 bg-muted/20 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex gap-3"
          >
            <Input
              placeholder={callMode !== 'text' ? 'Type a message or speak...' : 'Ask me anything...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              id="chat-input"
              className="h-12 rounded-2xl border border-border/50 text-sm sm:text-base bg-muted/30 backdrop-blur-sm"
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading} 
              size="icon"
              className="h-12 w-12 rounded-2xl shadow-lg flex-shrink-0 bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <PaperPlaneRight size={20} weight="bold" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
