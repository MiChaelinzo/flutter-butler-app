import { useEffect, useRef } from 'react'

interface Heart {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

export function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heartsRef = useRef<Heart[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
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

    const createHeart = (): Heart => {
      if (!canvas) {
        return { x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0, rotation: 0, rotationSpeed: 0 }
      }
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 1.5 + 1),
        size: Math.random() * 20 + 15,
        opacity: Math.random() * 0.6 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
      }
    }

    heartsRef.current = Array.from({ length: 30 }, () => createHeart())

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y + size / 4)
      ctx.bezierCurveTo(x, y, x - size / 2, y - size / 2, x - size / 2, y + size / 4)
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size)
      ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4)
      ctx.bezierCurveTo(x + size / 2, y - size / 2, x, y, x, y + size / 4)
      ctx.closePath()
      ctx.fill()
    }

    const animate = () => {
      if (!canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      heartsRef.current.forEach((heart, index) => {
        heart.x += heart.vx
        heart.y += heart.vy
        heart.rotation += heart.rotationSpeed

        if (heart.y < -50) {
          heartsRef.current[index] = createHeart()
          return
        }

        ctx.save()
        ctx.translate(heart.x, heart.y)
        ctx.rotate(heart.rotation)
        ctx.globalAlpha = heart.opacity

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, heart.size)
        gradient.addColorStop(0, '#ff1493')
        gradient.addColorStop(0.5, '#ff69b4')
        gradient.addColorStop(1, '#ffb6c1')
        ctx.fillStyle = gradient

        drawHeart(ctx, 0, 0, heart.size)

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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ opacity: 0.5 }}
    />
  )
}
