import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale, 
                opacity: 1,
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
                rotate: isGrowing ? [0, 2, 0] : 0 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                opacity: { duration: 0.5, delay: 0.2 },
                rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 200px" }}
            >
              <ellipse
                cx="130"
                cy="200"
                rx="25"
                ry="15"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(30 130 200)"
              />
            </motion.g>
          )}

          {growthStage >= 3 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale * 1.1, 
                opacity: 1,
                rotate: isGrowing ? [0, -3, 0] : 0 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut", delay: 0.4 },
                opacity: { duration: 0.5, delay: 0.4 },
                rotate: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 170px" }}
            >
              <ellipse
                cx="65"
                cy="170"
                rx="28"
                ry="17"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(-35 65 170)"
              />
            </motion.g>
          )}

          {growthStage >= 4 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale * 1.1, 
                opacity: 1,
                rotate: isGrowing ? [0, 3, 0] : 0 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut", delay: 0.6 },
                opacity: { duration: 0.5, delay: 0.6 },
                rotate: { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 140px" }}
            >
              <ellipse
                cx="135"
                cy="140"
                rx="28"
                ry="17"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(35 135 140)"
              />
            </motion.g>
          )}

          {growthStage >= 5 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1
              }}
              transition={{ 
                scale: { duration: 1, ease: "easeOut", delay: 0.8 },
                opacity: { duration: 0.5, delay: 0.8 }
              }}
            >
              <motion.circle
                cx="100"
                cy="110"
                r="12"
                fill="oklch(0.85 0.20 85)"
                filter="url(#glow)"
                animate={isGrowing ? {
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.g
                animate={isGrowing ? {
                  rotate: [0, 360]
                } : {}}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformOrigin: "100px 110px" }}
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <ellipse
                    key={angle}
                    cx="100"
                    cy="110"
                    rx="15"
                    ry="5"
                    fill="oklch(0.90 0.18 80)"
                    opacity="0.8"
                    transform={`rotate(${angle} 100 110)`}
                  />
                ))}
              </motion.g>
            </motion.g>
          )}
        </motion.g>

        {isPaused && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <circle cx="100" cy="150" r="80" fill="oklch(0.5 0 0 / 0.1)" />
          </motion.g>
        )}
      </svg>

      {progress === 100 && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-4xl">🌸</div>
        </motion.div>
      )}

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-[20px]">
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, oklch(0.45 0.12 140 / 0.6) 0%, transparent 70%)'
          }}
          initial={{ scaleX: 0.5 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  )
}
