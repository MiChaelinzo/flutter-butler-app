import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const colors = [
      'oklch(0.72 0.19 200)',
      'oklch(0.68 0.24 330)',
      'oklch(0.70 0.20 45)',
      'oklch(0.82 0.18 130)'
    ]

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      if (Math.random() > 0.7) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        const alpha = 1 - (particle.life / particle.maxLife)
        ctx.fillStyle = particle.color.replace(')', ` / ${alpha})`)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
        ctx.fill()

        return particle.life < particle.maxLife
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
