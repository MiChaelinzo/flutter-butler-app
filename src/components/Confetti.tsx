import { useEffect, useRef } from 'react'

interface ConfettiPiece {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  color: string
  shape: 'rect' | 'circle'
}

interface ConfettiProps {
  active: boolean
  duration?: number
  onComplete?: () => void
}

export function Confetti({ active, duration = 3000, onComplete }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRef = useRef<ConfettiPiece[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const colors = [
      '#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3',
      '#ff69b4', '#00ffff', '#ff1493', '#ffd700', '#7fff00', '#ff6347'
    ]

    const createConfetti = (): ConfettiPiece => {
      const angle = Math.random() * Math.PI * 2
      const velocity = Math.random() * 10 + 10
      return {
        x: Math.random() * canvas.width,
        y: -20,
        vx: Math.cos(angle) * velocity * 0.3,
        vy: Math.sin(angle) * velocity * 0.5 - 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      }
    }

    confettiRef.current = Array.from({ length: 150 }, () => createConfetti())
    startTimeRef.current = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current
      
      if (elapsed > duration) {
        if (onComplete) onComplete()
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      confettiRef.current.forEach((piece) => {
        piece.x += piece.vx
        piece.y += piece.vy
        piece.vy += 0.3
        piece.rotation += piece.rotationSpeed

        if (piece.y > canvas.height + 20) {
          return
        }

        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate(piece.rotation)

        if (piece.shape === 'rect') {
          ctx.fillStyle = piece.color
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size)
        } else {
          ctx.fillStyle = piece.color
          ctx.beginPath()
          ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [active, duration, onComplete])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  )
}
