import { useEffect, useRef } from 'react'

interface MatrixColumn {
  x: number
  y: number
  speed: number
  chars: string[]
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const columnsRef = useRef<MatrixColumn[]>([])
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
      initColumns()
    }

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columnWidth = fontSize

    const initColumns = () => {
      if (!canvas) return
      const columnCount = Math.floor(canvas.width / columnWidth)
      columnsRef.current = Array.from({ length: columnCount }, (_, i) => ({
        x: i * columnWidth,
        y: Math.random() * -canvas.height,
        speed: Math.random() * 3 + 1,
        chars: Array.from({ length: 30 }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ),
      }))
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      if (!canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`
      ctx.fillStyle = '#0f9b0f'

      columnsRef.current.forEach((column) => {
        column.y += column.speed

        if (column.y - column.chars.length * fontSize > canvas.height) {
          column.y = Math.random() * -200
          column.speed = Math.random() * 3 + 1
        }

        column.chars.forEach((char, i) => {
          const charY = column.y - i * fontSize
          if (charY > 0 && charY < canvas.height) {
            const opacity = 1 - (i / column.chars.length)
            ctx.fillStyle = `rgba(15, 155, 15, ${opacity})`
            
            if (i === 0) {
              ctx.fillStyle = '#d0ffd0'
            }
            
            ctx.fillText(char, column.x, charY)
          }
        })

        if (Math.random() > 0.95) {
          const randomIndex = Math.floor(Math.random() * column.chars.length)
          column.chars[randomIndex] = chars[Math.floor(Math.random() * chars.length)]
        }
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
      style={{ opacity: 0.6 }}
    />
  )
}
