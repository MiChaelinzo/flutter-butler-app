import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  size: number
  speed: number
  opacity: number
}

export function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      starsRef.current = []
      const starCount = Math.floor((canvas.width * canvas.height) / 4000)
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random(),
          size: Math.random() * 2.5,
          speed: 0.02 + Math.random() * 0.1,
          opacity: 0.2 + Math.random() * 0.8,
        })
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0

    const animate = () => {
      time += 0.003

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.2
      )
      gradient.addColorStop(0, 'rgba(15, 10, 40, 1)')
      gradient.addColorStop(0.5, 'rgba(25, 15, 50, 1)')
      gradient.addColorStop(1, 'rgba(5, 5, 20, 1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nebula1 = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.sin(time * 0.5) * 0.1),
        canvas.height * (0.3 + Math.cos(time * 0.3) * 0.1),
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.7
      )
      nebula1.addColorStop(0, 'rgba(120, 60, 255, 0.18)')
      nebula1.addColorStop(0.3, 'rgba(80, 120, 255, 0.12)')
      nebula1.addColorStop(0.6, 'rgba(60, 80, 200, 0.06)')
      nebula1.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = nebula1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nebula2 = ctx.createRadialGradient(
        canvas.width * (0.7 + Math.cos(time * 0.4) * 0.1),
        canvas.height * (0.6 + Math.sin(time * 0.6) * 0.1),
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.6
      )
      nebula2.addColorStop(0, 'rgba(255, 60, 180, 0.15)')
      nebula2.addColorStop(0.3, 'rgba(255, 100, 120, 0.1)')
      nebula2.addColorStop(0.6, 'rgba(200, 80, 150, 0.05)')
      nebula2.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = nebula2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nebula3 = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time * 0.35) * 0.15),
        canvas.height * (0.8 + Math.cos(time * 0.45) * 0.1),
        0,
        canvas.width * 0.5,
        canvas.height * 0.8,
        canvas.width * 0.5
      )
      nebula3.addColorStop(0, 'rgba(100, 200, 255, 0.12)')
      nebula3.addColorStop(0.4, 'rgba(80, 150, 255, 0.08)')
      nebula3.addColorStop(0.7, 'rgba(60, 100, 200, 0.04)')
      nebula3.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = nebula3
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach(star => {
        star.y += star.speed * star.z
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        const twinkle = 0.3 + Math.sin(time * 3 + star.x * 0.01) * 0.7
        const sizeMultiplier = 0.5 + star.z * 1.5
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * sizeMultiplier, 0, Math.PI * 2)
        ctx.fill()

        if (star.size > 1.5 && Math.random() > 0.99) {
          ctx.fillStyle = `rgba(150, 200, 255, ${0.3 * twinkle})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * sizeMultiplier * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
