import { useEffect, useState } from 'react'


interface GrowingPlantProps {
  progress: number
  isPaused: boolean
}

export function GrowingPlant({ progress, isPaused }: GrowingPlantProps) {
  const [isGrowing, setIsGrowing] = useState(false)

  useEffect(() => {
    if (progress > 0 && !isPaused) {
      setIsGrowing(true)
    } else if (isPaused) {
      setIsGrowing(false)
    }
  }, [progress, isPaused])

  const growthStage = Math.min(Math.floor((progress / 100) * 5), 5)
  const leafScale = Math.max(0.3, progress / 100)
  const stemHeight = Math.max(20, (progress / 100) * 100)

  return (
    <div className="relative w-full h-[300px] flex items-end justify-center">
      <svg
        width="200"
        height="300"
        viewBox="0 0 200 300"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.15 145)" />
            <stop offset="100%" stopColor="oklch(0.50 0.18 150)" />
          </linearGradient>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.75 0.20 140)" />
            <stop offset="50%" stopColor="oklch(0.70 0.18 145)" />
            <stop offset="100%" stopColor="oklch(0.65 0.16 150)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.rect
            x="95"
            y={300 - stemHeight}
            width="10"
            height={stemHeight}
            fill="url(#stemGradient)"
            rx="5"
            initial={{ height: 0 }}
            animate={{ height: stemHeight }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {growthStage >= 1 && (
            <motion.g
                opacity: 1,
              }}
                scale: { duration:
                rotate: { d
                rotate: isGrowing ? [0, -2, 0] : 0 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 220px" }}
            >
              <ellipse
                cx="70"
                cy="220"
                rx="25"
                ry="15"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(-30 70 220)"
              />
            </motion.g>
          )}

          {growthStage >= 2 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale, 
                opacity: 1,
              style={{ transformOrigin: "100px 200
              <e
                cy="200"
                ry="15"
                filter="url(#glow)"
              />
          )}
          {growthStage >= 3 && (
             
                scale:
                rotate: 
              transition
                opacity
              }}
            >
                cx="65"
                rx="28"
                
                transfo
            

            <motion.g
              animate
                opacity: 1,
              }}
                scale: { duration: 0.8, 
                rotate: { d
              style={{ transformOrigin: "100px 140p
              <e
                cy="140"
                ry="17"
                filter="url(#glow)"
              />
          )}
          {growthStage >= 5 && (
             
                scale:
              }}
                scale: {
              }}
              <motion.c
                cy="110"
                fill="oklch(0.85 0.
                animate={isGrowing ? {
                
                transit
            

              <motion.g
                  rot
                transition={{
                  repeat:
                }}
              >
                  <ellipse
                
                    rx="15"
                    fill="oklch(0.90 0.18 80)"
                    transform={`rotate(${angle} 100 110
                ))}
            </mo
        </motion.g>
        {isPa
            initial={{
            transition={
            <circle cx="
        )}

        <motion.div
          initial={{ opacity: 0, y:
          transition={{ duration: 0.5 }}
          <div c
      )}
      <div c

            background: 'radial-
          initial={{ 
          transition={{ duration: 1 }}
      </div>
  )























































































