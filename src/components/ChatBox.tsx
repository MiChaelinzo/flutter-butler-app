import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
interface Message {
  role: 'user' | 'assistant'
  timestamp: number

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
 

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
  return (
      <div className=
        {messages && messag
     

          >
            Clea
        )}

        <
            messages.map((message) => (
                key={message.id}
      
              >
                  <div className="w-8 h-
                  </div>
                <div
                    message.r
       

                </div>
                  <di
                  </div>
              <
          ) : (
     
   

      <form onSubmit={handleS
          value={in
   

        <B
          disabled={isLoading || !input.trim()}
        >
        </Button>
    </Card>
}


























































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
