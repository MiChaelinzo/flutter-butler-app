import { useKV } from '@github/spark/hooks'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  MusicNote,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  category: 'focus' | 'ambient' | 'lofi' | 'synthwave'
}

const MUSIC_TRACKS: Track[] = [
  {
    id: 'focus-1',
    title: 'Deep Focus Flow',
    artist: 'Ambient Minds',
    duration: '3:45',
    category: 'focus',
  },
  {
    id: 'focus-2',
    title: 'Concentration Zone',
    artist: 'Productivity Beats',
    duration: '4:12',
    category: 'focus',
  },
  {
    id: 'ambient-1',
    title: 'Cosmic Drift',
    artist: 'Space Ambient',
    duration: '5:30',
    category: 'ambient',
  },
  {
    id: 'ambient-2',
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    duration: '6:00',
    category: 'ambient',
  },
  {
    id: 'lofi-1',
    title: 'Midnight Study',
    artist: 'Lofi Collective',
    duration: '3:20',
    category: 'lofi',
  },
  {
    id: 'lofi-2',
    title: 'Coffee Shop Vibes',
    artist: 'Chill Beats',
    duration: '3:55',
    category: 'lofi',
  },
  {
    id: 'synthwave-1',
    title: 'Neon Nights',
    artist: 'Cyber Synth',
    duration: '4:30',
    category: 'synthwave',
  },
  {
    id: 'synthwave-2',
    title: 'Digital Dreams',
    artist: 'Retro Wave',
    duration: '4:05',
    category: 'synthwave',
  },
]

export function MusicPlayer({ compact = false }: { compact?: boolean }) {
  const [isPlaying, setIsPlaying] = useKV<boolean>('music-playing', false)
  const [currentTrack, setCurrentTrack] = useKV<Track | null>('current-track', null)
  const [volume, setVolume] = useKV<number>('music-volume', 50)
  const [isMuted, setIsMuted] = useState(false)

  const handlePlayPause = () => {
    if (!currentTrack) {
      setCurrentTrack(MUSIC_TRACKS[0])
      setIsPlaying(true)
    } else {
      setIsPlaying((playing = false) => !playing)
    }
  }

  const handleNext = () => {
    if (!currentTrack) {
      setCurrentTrack(MUSIC_TRACKS[0])
      return
    }

    const currentIndex = MUSIC_TRACKS.findIndex((t) => t.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length
    setCurrentTrack(MUSIC_TRACKS[nextIndex])
    setIsPlaying(true)
  }

  const handlePrevious = () => {
    if (!currentTrack) {
      setCurrentTrack(MUSIC_TRACKS[MUSIC_TRACKS.length - 1])
      return
    }

    const currentIndex = MUSIC_TRACKS.findIndex((t) => t.id === currentTrack.id)
    const prevIndex =
      (currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length
    setCurrentTrack(MUSIC_TRACKS[prevIndex])
    setIsPlaying(true)
  }

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const handleVolumeToggle = () => {
    setIsMuted((muted) => !muted)
  }

  if (compact) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-12 rounded-xl border-border bg-card/80 backdrop-blur-xl hover:bg-card hover:border-primary/40 transition-all duration-300 relative"
          >
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-lime rounded-full animate-pulse"
                />
              )}
            </AnimatePresence>
            <MusicNote size={20} weight="duotone" className="text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <MusicPlayerContent
            isPlaying={isPlaying}
            currentTrack={currentTrack}
            volume={volume}
            isMuted={isMuted}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onVolumeChange={(val) => setVolume(val[0])}
            onVolumeToggle={handleVolumeToggle}
            onTrackSelect={handleTrackSelect}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Card className="p-6">
      <MusicPlayerContent
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        volume={volume}
        isMuted={isMuted}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onVolumeChange={(val) => setVolume(val[0])}
        onVolumeToggle={handleVolumeToggle}
        onTrackSelect={handleTrackSelect}
      />
    </Card>
  )
}

function MusicPlayerContent({
  isPlaying,
  currentTrack,
  volume,
  isMuted,
  onPlayPause,
  onNext,
  onPrevious,
  onVolumeChange,
  onVolumeToggle,
  onTrackSelect,
}: {
  isPlaying: boolean | undefined
  currentTrack: Track | null | undefined
  volume: number | undefined
  isMuted: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onVolumeChange: (value: number[]) => void
  onVolumeToggle: () => void
  onTrackSelect: (track: Track) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
          <MusicNote size={24} weight="duotone" className="text-primary" />
        </div>
        <div>
          <h3 className="font-bold">Background Music</h3>
          <p className="text-sm text-muted-foreground">
            {currentTrack ? currentTrack.title : 'No track selected'}
          </p>
        </div>
      </div>

      {currentTrack && (
        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{currentTrack.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {currentTrack.artist}
              </p>
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {currentTrack.duration}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onPrevious}
              className="h-9 w-9 rounded-full"
            >
              <SkipBack size={18} weight="fill" />
            </Button>
            <Button
              size="sm"
              onClick={onPlayPause}
              className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
            >
              {isPlaying ? (
                <Pause size={20} weight="fill" />
              ) : (
                <Play size={20} weight="fill" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onNext}
              className="h-9 w-9 rounded-full"
            >
              <SkipForward size={18} weight="fill" />
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={onVolumeToggle}
            className="h-9 w-9 rounded-full flex-shrink-0"
          >
            {isMuted || (volume || 0) === 0 ? (
              <SpeakerSimpleSlash size={18} />
            ) : (
              <SpeakerSimpleHigh size={18} />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : (volume || 50)]}
            onValueChange={onVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-10 text-right">
            {isMuted ? 0 : (volume || 50)}%
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Select Track</h4>
        <ScrollArea className="h-48">
          <div className="space-y-1">
            {MUSIC_TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => onTrackSelect(track)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg transition-colors',
                  'hover:bg-muted',
                  currentTrack?.id === track.id && 'bg-primary/10 border border-primary/30'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{track.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {track.artist}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {track.duration}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
