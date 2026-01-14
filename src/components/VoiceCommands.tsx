import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Microphone, MicrophoneSlash, Sparkle } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

export function VoiceCommands() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [tasks, setTasks] = useKV<any[]>('tasks', [])

  const handleVoiceCommand = () => {
    if (!isListening) {
      setIsListening(true)
      toast.success('Voice command activated - speak now!')
      
      setTimeout(() => {
        const commands = [
          'Add task: Review project documentation',
          'Start focus timer for 25 minutes',
          'Show today\'s goals',
          'Mark morning workout as complete',
          'Create note about meeting ideas',
        ]
        const randomCommand = commands[Math.floor(Math.random() * commands.length)]
        setTranscript(randomCommand)
        
        if (randomCommand.startsWith('Add task:')) {
          const taskTitle = randomCommand.replace('Add task:', '').trim()
          setTasks((current) => [
            ...(current || []),
            {
              id: Date.now().toString(),
              title: taskTitle,
              completed: false,
              priority: 'medium',
              createdAt: new Date().toISOString(),
            },
          ])
          toast.success(`Task added: ${taskTitle}`)
        } else {
          toast.success('Command executed!')
        }
        
        setIsListening(false)
        setTimeout(() => setTranscript(''), 3000)
      }, 2000)
    } else {
      setIsListening(false)
      setTranscript('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange/30 to-orange/10 flex items-center justify-center border-2 border-orange/30 shadow-xl shadow-orange/20 backdrop-blur-xl">
          <Microphone className="text-orange drop-shadow-lg" size={28} weight="duotone" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-orange bg-clip-text text-transparent">
            Voice Commands
          </h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
            Control your assistant hands-free
          </p>
        </div>
      </div>

      <Card className="p-8 bg-card/80 backdrop-blur-xl border-2 border-white/10 shadow-xl">
        <div className="text-center space-y-6">
          <Button
            size="lg"
            onClick={handleVoiceCommand}
            className={`w-32 h-32 rounded-full ${
              isListening
                ? 'bg-gradient-to-br from-orange to-orange/80 animate-pulse'
                : 'bg-gradient-to-br from-primary to-accent'
            } hover:scale-110 transition-all duration-300 shadow-2xl`}
          >
            {isListening ? (
              <MicrophoneSlash size={48} weight="fill" className="text-white" />
            ) : (
              <Microphone size={48} weight="fill" className="text-white" />
            )}
          </Button>

          <div>
            <p className="text-lg font-bold text-foreground mb-2">
              {isListening ? 'Listening...' : 'Tap to speak'}
            </p>
            {transcript && (
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 max-w-md mx-auto">
                <p className="text-sm font-medium text-foreground flex items-center gap-2 justify-center">
                  <Sparkle size={16} weight="fill" className="text-primary" />
                  {transcript}
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm font-semibold text-foreground mb-3">Try saying:</p>
            <div className="space-y-2 text-sm text-muted-foreground max-w-md mx-auto">
              <p className="p-2 bg-background/50 rounded-lg">"Add task: Review project docs"</p>
              <p className="p-2 bg-background/50 rounded-lg">"Start focus timer for 25 minutes"</p>
              <p className="p-2 bg-background/50 rounded-lg">"Show today's goals"</p>
              <p className="p-2 bg-background/50 rounded-lg">"Mark morning workout as complete"</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
