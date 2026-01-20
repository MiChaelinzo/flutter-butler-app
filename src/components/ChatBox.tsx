import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/but
import { Button } from '@/components/ui/button'
interface Message {
  role: 'user' | 'assistant'
  timestamp: number

interface Message {
  placeholde
  role: 'user' | 'assistant'
  const [messages
  timestamp: number
 

      id: Date.now().toS
      content: input
    }
    setMessages((curre
 

      const response = await window.spark.llm(prompt, 'gpt-4o-mini')
      const assistantMessage: Message = {
        role: 'assistant',
        timestamp: Date.now()

    } catch (error) {
    } finally {


    setMessages([])

    <Card className="
        <div className="fle
    }

        {messages && messages.length > 0 && (
            Clea
        )}

        <
            messages.map((message) => (
      const response = await window.spark.llm(prompt, 'gpt-4o-mini')

      const assistantMessage: Message = {
                      ? 'bg-primary text
        role: 'assistant',
                  <p class
        timestamp: Date.now()
       

            </div>
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


        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        className="flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}

          disabled={isLoading}

        />

          type="submit"

          className="gap-2"

          <PaperPlaneRight size={16} weight="fill" />

        </Button>

    </Card>

}
