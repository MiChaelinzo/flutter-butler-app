import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string

  const canvasR
 

    const canvas = canvasRef.c

    if (!ctx) return
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

        particlesRef
          y: e.clientY,
          vy: (Math.random() - 
          maxLife: 60 + Math.ra
          color: colors[Math.floo
     

      }



        particle.x += particle.vx
        particle.life++
        const alpha = 1
        ctx.beginPath()
        ctx.fill()
        return par

    }
    window.addEventListener('mousemove', handleMouseMove)

      w

      }
  }, [])
  retur
     

  )








































