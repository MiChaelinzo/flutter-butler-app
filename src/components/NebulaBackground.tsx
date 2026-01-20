import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
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
      const starCount = Math.floor((canvas.width * canvas.height) / 8000)
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: 0.05 + Math.random() * 0.15,
          opacity: 0.3 + Math.random() * 0.7,
        })
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0

    const animate = () => {
      time += 0.005

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5
      )
      gradient.addColorStop(0, 'rgba(20, 15, 45, 1)')
      gradient.addColorStop(0.4, 'rgba(30, 20, 60, 1)')
      gradient.addColorStop(1, 'rgba(10, 10, 25, 1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.3,
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.6
      )
      nebulaGradient.addColorStop(0, 'rgba(100, 50, 200, 0.15)')
      nebulaGradient.addColorStop(0.5, 'rgba(50, 100, 255, 0.08)')
      nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = nebulaGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nebula2Gradient = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.6,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.5
      )
      nebula2Gradient.addColorStop(0, 'rgba(255, 0, 150, 0.12)')
      nebula2Gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.06)')
      nebula2Gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = nebula2Gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach(star => {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        const twinkle = 0.5 + Math.sin(time * 2 + star.x) * 0.5
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
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
      className="fixed inset-0 -z-10"
    />
  )
}
