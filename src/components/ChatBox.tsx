import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
interface Message {
  role: 'user' | 'assistant'
  timestamp: number

  storageKey: strin
  placeholde

  const [messages
  const [isLoading,
 

      id: Date.now().toS
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


    setMessages((current) => [...(current || []), userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const promptText = `You are a helpful AI assistant in a productivity app. The user says: "${input}". Provide a helpful, concise, and actionable response.`

      const response = await window.spark.llm(prompt, 'gpt-4o-mini')

      const assistantMessage: Message = {
            <Robot className="text-prima
        role: 'assistant',
        </div>
        timestamp: Date.now()
      }

      setMessages((current) => [...(current || []), assistantMessage])
    } catch (error) {
      console.error('Failed to get response:', error)
    } finally {
      setIsLoading(false)
    }
   

                <Robot size={32
    setMessages([])
   


        <form
            e.preventDefault()
          }}
        >
            value={input}
            plac
            className="flex-1 bg-background border-borde
          <But
            disabled={!input.trim() || is
          >
            Send
        </form>
    </Card>
}
          >



      </div>







































































  )

