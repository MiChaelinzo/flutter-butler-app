import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  opacity: number
  life: number
  maxLife: number
}

export function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
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

    const createStar = (): Star => {
      if (!canvas) {
        return { x: 0, y: 0, vx: 0, vy: 0, length: 0, opacity: 0, life: 0, maxLife: 0 }
      }
      
      const startFromTop = Math.random() > 0.5
      const startX = startFromTop ? Math.random() * canvas.width : canvas.width
      const startY = startFromTop ? 0 : Math.random() * canvas.height * 0.5
      
      return {
        x: startX,
        y: startY,
        vx: -(Math.random() * 8 + 4),
        vy: Math.random() * 6 + 3,
        length: Math.random() * 80 + 40,
        opacity: Math.random() * 0.8 + 0.2,
        life: 0,
        maxLife: Math.random() * 60 + 40,
      }
    }

    starsRef.current = []

    const animate = () => {
      if (!canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (Math.random() > 0.97 && starsRef.current.length < 5) {
        starsRef.current.push(createStar())
      }

      starsRef.current = starsRef.current.filter((star) => {
        star.x += star.vx
        star.y += star.vy
        star.life++

        if (star.x < -star.length || star.y > canvas.height + star.length || star.life > star.maxLife) {
          return false
        }

        const lifeRatio = star.life / star.maxLife
        const currentOpacity = star.opacity * (1 - lifeRatio)

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.vx * 2,
          star.y - star.vy * 2
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`)
        gradient.addColorStop(0.3, `rgba(200, 220, 255, ${currentOpacity * 0.7})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(
          star.x - (star.vx / Math.abs(star.vx)) * star.length,
          star.y - (star.vy / Math.abs(star.vy)) * star.length * 0.5
        )
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()

        return true
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
      style={{ opacity: 0.8 }}
    />
  )
}
