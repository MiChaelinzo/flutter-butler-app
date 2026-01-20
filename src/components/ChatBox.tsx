/// <reference types="../vite-en
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui

  id: string
  content: string

interface ChatBoxPr
  title: str
}
export function C
  const [input, set


    const userMessage: M
      role: 'user',
      timestamp

 

      const promptText = `You are a helpful assistant. User says: "${input}
      const response = await window.spark.llm(prompt, 'gpt-4o-mini
      const assistantMessage: Message = 
        role: 'assistant',


    } catch (error) {

    }

    setMessages([])
      content: input,
      timestamp: Date.now()
    }

    setMessages((current) => [...(current || []), userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const prompt = window.spark.llmPrompt`${input}`
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
          value={input}
          placeholder={placeholder}
        />
          type="submit"
          className="gap-2"
          <Paper
      </form>
  )
























































          placeholder={placeholder}
          disabled={isLoading}
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
