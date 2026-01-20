import { useEffect, useRef, useMemo } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface ParticleEffectProps {
  type?: 'particles' | 'snow' | 'sparkles' | 'bubbles' | 'fireflies'
  count?: number
  colors?: string[]
}

export function ParticleEffect({ 
  type = 'particles', 
  count = 50,
  colors = ['#667eea', '#764ba2', '#f093fb', '#a8edea']
}: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  
  const colorArray = useMemo(() => colors, [colors.join(',')])

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

    const createParticle = (): Particle => {
      if (!canvas) {
        return {
          x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0, 
          color: '#000', life: 0, maxLife: 0
        }
      }
      
      const baseConfig = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
        opacity: Math.random() * 0.5 + 0.2,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      }

      switch (type) {
        case 'snow':
          return {
            ...baseConfig,
            y: -10,
            vx: (Math.random() - 0.5) * 0.5,
            vy: Math.random() * 1 + 0.5,
            size: Math.random() * 4 + 2,
            color: '#ffffff',
            opacity: Math.random() * 0.8 + 0.2,
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
            opacity: Math.random() * 0.3 + 0.1,
          }
        
        case 'fireflies':
          return {
            ...baseConfig,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 2,
            color: ['#ffff00', '#ffd700', '#90ee90'][Math.floor(Math.random() * 3)],
            opacity: Math.random() * 0.8 + 0.2,
          }
        
        default:
          return {
            ...baseConfig,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 4 + 1,
          }
      }
    }

    particlesRef.current = Array.from({ length: count }, () => createParticle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        if (type === 'sparkles' || type === 'fireflies') {
          particle.opacity = Math.sin(particle.life * 0.05) * 0.5 + 0.5
        }

        if (type === 'fireflies') {
          particle.vx += (Math.random() - 0.5) * 0.1
          particle.vy += (Math.random() - 0.5) * 0.1
          particle.vx = Math.max(-1, Math.min(1, particle.vx))
          particle.vy = Math.max(-1, Math.min(1, particle.vy))
        }

        let needsReset = false
        if (type === 'snow') {
          needsReset = particle.y > canvas.height + 10
        } else if (type === 'bubbles') {
          needsReset = particle.y < -10
        } else {
          needsReset = 
            particle.x < -10 || 
            particle.x > canvas.width + 10 || 
            particle.y < -10 || 
            particle.y > canvas.height + 10 ||
            particle.life > particle.maxLife
        }

        if (needsReset) {
          particlesRef.current[index] = createParticle()
          return
        }

        ctx.save()
        ctx.globalAlpha = particle.opacity

        if (type === 'sparkles') {
          ctx.fillStyle = particle.color
          ctx.beginPath()
          for (let i = 0; i < 4; i++) {
            const angle = (Math.PI / 2) * i
            const x = particle.x + Math.cos(angle) * particle.size
            const y = particle.y + Math.sin(angle) * particle.size
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
          
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.fill()
        } else if (type === 'fireflies') {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          )
          gradient.addColorStop(0, particle.color)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (type === 'bubbles') {
          const gradient = ctx.createRadialGradient(
            particle.x - particle.size * 0.3,
            particle.y - particle.size * 0.3,
            0,
            particle.x,
            particle.y,
            particle.size
          )
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
          gradient.addColorStop(0.5, particle.color)
          gradient.addColorStop(1, 'transparent')
          
          ctx.strokeStyle = particle.color
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.stroke()
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
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
  }, [type, count, colorArray])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ opacity: 0.7 }}
    />
  )
}
