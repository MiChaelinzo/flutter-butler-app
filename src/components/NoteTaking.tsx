import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Note, Plus, Trash, Sparkle, MagnifyingGlass } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Note as NoteType } from '@/lib/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

export function NoteTaking() {
  const [notes, setNotes] = useKV<NoteType[]>('butler-notes', [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<NoteType | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)

  const openNewNote = () => {
    setEditingNote(null)
    setTitle('')
    setContent('')
    setDialogOpen(true)
  }

  const openEditNote = (note: NoteType) => {
    setEditingNote(note)
    setTitle(note.title)
    setContent(note.content)
    setDialogOpen(true)
  }

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return

    if (editingNote) {
      setNotes((current) =>
        (current || []).map((note) =>
          note.id === editingNote.id
            ? { ...note, title, content, updatedAt: Date.now() }
            : note
        )
      )
      toast.success('Note updated')
    } else {
      const newNote: NoteType = {
        id: Date.now().toString(),
        title,
        content,
        tags: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      setNotes((current) => [...(current || []), newNote])
      toast.success('Note saved')
    }

    setDialogOpen(false)
    setEditingNote(null)
    setTitle('')
    setContent('')
  }

  const deleteNote = (id: string) => {
    setNotes((current) => (current || []).filter((note) => note.id !== id))
    toast.success('Note deleted')
  }

  const generateSummary = async () => {
    if (!content.trim()) return

    setIsGeneratingSummary(true)
    try {
      const promptText = `Summarize the following note in 2-3 concise sentences:\n\n${content}`
      const prompt = window.spark.llmPrompt([promptText], '')
      const response = await window.spark.llm(prompt, 'gpt-4o-mini')
      
      setContent((current) => `${current}\n\n---\n**AI Summary:**\n${response}`)
      toast.success('Summary generated')
    } catch (error) {
      toast.error('Failed to generate summary')
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  const filteredNotes = (notes || []).filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <Card className="shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="flex items-center gap-3.5 text-2xl sm:text-3xl font-bold">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/15 flex items-center justify-center border border-primary/40 shadow-lg shadow-primary/20">
              <Note className="text-primary" size={24} weight="duotone" />
            </div>
            Notes
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} weight="bold" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-11 pr-4 rounded-xl border border-border/50 text-sm bg-muted/30 backdrop-blur-sm w-40 sm:w-48"
                id="note-search"
              />
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="icon" 
                  onClick={openNewNote}
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                >
                  <Plus size={20} weight="bold" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border border-border/50 bg-card/95 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3.5 text-2xl font-bold">
                    <Note className="text-primary" size={24} weight="duotone" />
                    {editingNote ? 'Edit Note' : 'New Note'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-5 mt-4">
                  <Input
                    placeholder="Note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-12 rounded-2xl border border-border/50 text-base font-bold bg-muted/30 backdrop-blur-sm"
                    id="note-title-input"
                  />
                  <Textarea
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    className="resize-none rounded-2xl border border-border/50 text-sm sm:text-base bg-muted/30 backdrop-blur-sm"
                    id="note-content-input"
                  />
                  <div className="flex gap-3">
                    <Button 
                      onClick={saveNote} 
                      disabled={!title.trim() || !content.trim()}
                      className="flex-1 h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      {editingNote ? 'Update Note' : 'Save Note'}
                    </Button>
                    {content.trim() && (
                      <Button
                        onClick={generateSummary}
                        disabled={isGeneratingSummary}
                        variant="outline"
                        className="h-12 px-6 rounded-2xl border border-border/50 hover:bg-muted/80"
                      >
                        {isGeneratingSummary ? (
                          <>
                            <Sparkle className="mr-2 animate-pulse" size={18} weight="duotone" />
                            Summarizing...
                          </>
                        ) : (
                          <>
                            <Sparkle className="mr-2" size={18} weight="duotone" />
                            Summarize
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/10 mx-auto mb-5 flex items-center justify-center border border-primary/30">
              <Note size={40} className="opacity-40" weight="duotone" />
            </div>
            <p className="text-base sm:text-lg font-bold text-foreground">
              {searchQuery ? 'No notes found' : 'No notes yet'}
            </p>
            <p className="text-sm sm:text-base mt-2 font-medium">
              {searchQuery ? 'Try a different search term' : 'Create your first note'}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotes.map((note) => (
                <Card
                  key={note.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border/50 group overflow-hidden bg-card/50 backdrop-blur-sm card-gradient-hover"
                  onClick={() => openEditNote(note)}
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-1 flex-1">
                        {note.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNote(note.id)
                        }}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/15 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                      >
                        <Trash size={16} weight="bold" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <Badge variant="outline" className="text-xs font-bold rounded-lg px-2 py-1">
                        {formatDate(note.updatedAt)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
