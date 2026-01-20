import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

interface ParticleEffectProps {
  type: 'snow' | 'particles' | 'sparkles' | 'bubbles' | 'fireflies' | null
  count?: number
  colors?: string[]
}

export function ParticleEffect({ type, count = 50, colors }: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!type) return

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

    const createParticle = (): Particle => {
      const baseConfig = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        life: 0,
        maxLife: 1000,
      }

      switch (type) {
        case 'snow':
          return {
            ...baseConfig,
            vx: (Math.random() - 0.5) * 0.5,
            vy: Math.random() * 1 + 0.5,
            size: Math.random() * 4 + 2,
            color: '#ffffff',
            opacity: Math.random() * 0.7 + 0.3,
          }
        
        case 'particles':
          return {
            ...baseConfig,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: colors?.[Math.floor(Math.random() * colors.length)] ?? '#ffffff',
            opacity: Math.random() * 0.6 + 0.4,
          }
        
        case 'sparkles':
          return {
            ...baseConfig,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 3 + 1,
            color: ['#ffd700', '#ffed4e', '#ffffff', '#ffe45e'][Math.floor(Math.random() * 4)],
            opacity: Math.random() * 0.9 + 0.1,
          }
        
        case 'bubbles':
          return {
            ...baseConfig,
            y: canvas.height + 10,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -(Math.random() * 1.5 + 0.5),
            size: Math.random() * 15 + 5,
            color: ['#00fff5', '#00d4ff', '#0099ff'][Math.floor(Math.random() * 3)],
            opacity: 0.3,
          }
        
        case 'fireflies':
          return {
            ...baseConfig,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 2,
            color: ['#ffff00', '#ffed4e', '#ffe45e'][Math.floor(Math.random() * 3)],
            opacity: Math.random() * 0.8 + 0.2,
          }
        
        default:
          return {
            ...baseConfig,
            vx: 0,
            vy: 0,
            size: 2,
            color: '#ffffff',
            opacity: 1,
          }
      }
    }

    particlesRef.current = Array.from({ length: count }, createParticle)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life += 1

        if (type === 'snow') {
          if (particle.y > canvas.height + 10) {
            particlesRef.current[index] = createParticle()
            particlesRef.current[index].y = -10
          }
        } else if (type === 'bubbles') {
          if (particle.y < -10) {
            particlesRef.current[index] = createParticle()
          }
        } else {
          if (
            particle.x < -10 || 
            particle.x > canvas.width + 10 || 
            particle.y < -10 || 
            particle.y > canvas.height + 10 ||
            particle.life > particle.maxLife
          ) {
            particlesRef.current[index] = createParticle()
          }
        }

        ctx.save()
        ctx.globalAlpha = particle.opacity

        if (type === 'bubbles') {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.strokeStyle = particle.color
          ctx.lineWidth = 2
          ctx.stroke()
        } else if (type === 'fireflies') {
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 15
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
        } else if (type === 'sparkles') {
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y - particle.size * 0.3,
            0,
            particle.x,
            particle.y,
            particle.size
          )
          gradient.addColorStop(0, particle.color)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
        }

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [type, count, colors])

  if (!type) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
