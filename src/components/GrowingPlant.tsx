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
    <div className="relative w-full h-[300px] flex items-center justify-center">
      <svg 
        width="200" 
        height="300" 
        viewBox="0 0 200 300"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.55 0.12 140)" />
            <stop offset="50%" stopColor="oklch(0.60 0.14 142)" />
            <stop offset="100%" stopColor="oklch(0.55 0.12 140)" />
          </linearGradient>
          
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.15 145)" />
            <stop offset="50%" stopColor="oklch(0.60 0.14 142)" />
            <stop offset="100%" stopColor="oklch(0.55 0.12 140)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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
            rx="5"
            fill="url(#stemGradient)"
            filter="url(#glow)"
            animate={{ height: stemHeight }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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

          {growthStage >= 1 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale, 
                opacity: 1,
                rotate: isGrowing ? [0, 2, 0] : 0 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 2.3, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 220px" }}
            >
              <ellipse
                cx="130"
                cy="220"
                rx="25"
                ry="15"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(30 130 220)"
              />
            </motion.g>
          )}

          {growthStage >= 2 && (
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
              style={{ transformOrigin: "100px 200px" }}
            >
              <ellipse
                cx="70"
                cy="200"
                rx="25"
                ry="15"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(-30 70 200)"
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
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.5 },
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
                scale: leafScale, 
                opacity: 1,
                rotate: isGrowing ? [0, -3, 0] : 0 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 160px" }}
            >
              <ellipse
                cx="65"
                cy="160"
                rx="28"
                ry="17"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(-35 65 160)"
              />
            </motion.g>
          )}

          {growthStage >= 4 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale, 
                opacity: 1,
                rotate: isGrowing ? [0, 3, 0] : 0 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.5 },
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
                scale: leafScale, 
                opacity: 1 
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.5 }
              }}
              style={{ transformOrigin: "100px 110px" }}
            >
              <motion.circle
                cx="100"
                cy="110"
                r="20"
                fill="oklch(0.85 0.25 90)"
                filter="url(#glow)"
                animate={isGrowing ? {
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.g
                animate={{
                  rotate: isGrowing ? 360 : 0
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformOrigin: "100px 110px" }}
              >
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx={100 + Math.cos((angle * Math.PI) / 180) * 15}
                    cy={110 + Math.sin((angle * Math.PI) / 180) * 15}
                    rx="8"
                    ry="4"
                    fill="oklch(0.90 0.18 80)"
                    transform={`rotate(${angle} ${100 + Math.cos((angle * Math.PI) / 180) * 15} ${110 + Math.sin((angle * Math.PI) / 180) * 15})`}
                  />
                ))}
              </motion.g>
            </motion.g>
          )}
        </motion.g>

        {isPaused && (
          <motion.circle
            cx="100"
            cy="150"
            r="30"
            fill="oklch(0.3 0.1 240 / 0.2)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </svg>

      {progress === 100 && (
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl font-bold text-lime">🌟</div>
          <div className="text-xs font-semibold text-lime mt-1">Complete!</div>
        </motion.div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-8 -z-10">
        <motion.div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, oklch(0.45 0.12 140 / 0.3) 0%, transparent 70%)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
