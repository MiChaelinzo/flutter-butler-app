import { useEffect, useRef } from 'react'

  y: number
  vy: numbe
  opacity: 
  life: numb
}
interface Part
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface ParticleEffectProps {
  type?: 'particles' | 'snow' | 'sparkles' | 'bubbles' | 'fireflies'
}: ParticleEffec
  colors?: string[]
 

export function ParticleEffect({ 
  type = 'particles', 
    const ctx
  colors = ['#667eea', '#764ba2', '#f093fb', '#a8edea']
}: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
      const baseConfig = {
    if (!canvas) return

          return {
            vx: (Mat

            opacity: Math.random
        
          return {
     

            color:
          }

            ...baseConfig,
            vy: (Math.rand
            color: ['#ffff00', '#ffd700'
          }
        default:
            ...baseConfig,
            vy: 
          }
    }

    const animate = (

          return {
            ...baseConfig,
        if (type === 'sparkles' || type === 
        }
        if (type === 'fireflies') {
          particle.vy += (Mat
          particle.vy = Math.max(-1, Math.min(1

        
        } else if (type 
        } else {
            particle.x < -
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

    particlesRef.current = Array.from({ length: count }, createParticle)

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
    animate()
            particle.y > canvas.height + 10 ||
      window.removeEventListener('resize', r
        }

        if (needsReset) {

          return
      ref

        ctx.save()
        ctx.globalAlpha = particle.opacity

        if (type === 'sparkles') {
          ctx.fillStyle = particle.color
          ctx.shadowBlur = 10
          ctx.shadowColor = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#ffffff'

          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)

        } else if (type === 'bubbles') {
          const gradient = ctx.createRadialGradient(
            particle.x - particle.size * 0.3,

            0,

            particle.y,
            particle.size
          )
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
          gradient.addColorStop(0.5, particle.color)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.stroke()

          ctx.fillStyle = particle.color

          ctx.shadowColor = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()



      })

      animationFrameRef.current = requestAnimationFrame(animate)


    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }


  return (
    <canvas

      className="fixed inset-0 pointer-events-none z-0"

    />
  )
}
