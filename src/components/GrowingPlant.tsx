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
      const timer = setTimeout(() => {
        setIsGrowing(false)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setIsGrowing(false)
    }
  }, [progress, isPaused])

  const stemHeight = Math.max(20, progress * 1.2)
  const growthStage = Math.floor(progress / 25)
  const leafScale = Math.min(1, progress / 100)

  return (
    <div className="relative flex flex-col items-center">
      <svg 
        width="200" 
        height="300" 
        className="drop-shadow-2xl"
        viewBox="0 0 200 300"
      >
        <defs>
          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.15 145)" />
            <stop offset="100%" stopColor="oklch(0.50 0.12 140)" />
          </linearGradient>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.70 0.18 145)" />
            <stop offset="100%" stopColor="oklch(0.55 0.15 140)" />
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
          animate={{ opacity: progress > 0 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.rect
            x="95"
            y={280 - stemHeight}
            width="10"
            height={stemHeight}
            rx="5"
            fill="url(#stemGradient)"
              height: stemHeigh
            animate={{ 
              height: stemHeight,
              y: 280 - stemHeight 
            }}
          {growthStage >= 0 && (
          />

          {growthStage >= 0 && (
                rotat
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale, 
              }}
                rotate: isGrowing ? [0, -2, 0] : 0 
              <e
              transition={{ 
                rx="25"
                opacity: { duration: 0.5 },
                rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 220px" }}
            >
              <ellipse
                cx="70"
              animate={{
                rx="25"
                rotate:
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(-30 70 220)"
              }}
            </motion.g>
            

          {growthStage >= 0 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
                scale: { 
                scale: leafScale, 
              }}
                rotate: isGrowing ? [0, 2, 0] : 0 
              <e
            <motion.g
              animate={{ 
                opacity: 1,
              }}
                
                rotate: { duration: 2, repeat: Infinity,
             
              <ellipse
                cy="200
                ry="15"
                filter=
              />
          )}
          {growthStage >= 2 && (
              initial={{ scale: 0, opacity: 0 
                
                rotate:
            

              }}
            >
                cx="130"
                rx="25"
                fill="url(#leafGra
                transform="
            </motion.g>

            <motion.g
              animate={{ 
                opacity: 1,
              }}
                
                rotate: { duration: 3, repeat: Infinity,
             
              <ellipse
                cy="160"
                ry="17"
                filter=
              />
          )}
          {growthStage >= 3 && (
              initial={{ scale: 0, opacity: 0 
                
                rotate:
            

              }}
            >
                cx="135"
                rx="28"
                fill="url(#leafGra
                transform="
            </motion.g>

            <motion.g
              animate={{ scale: 1, opacity: 1, rotate: [0,
                scale: { duration: 0.5 },
              }}
              {[
                  key={i}
             
                  ry="
                  filte
                />
            </motion.g>
        </motion.g>
        {isPaused && (
            cx="100"
            r="30"
            init
            exit={{ sca
        )}

        <motion.div
          initial={{ 
          transition={{ duration: 0.5 }}
          <div className=
          </div>
      )}
      <div className="absolute bottom-0 w-full fle
          classN
            background: `lin
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
      </div>
  )









































          {growthStage >= 3 && (
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
                rotate: { duration: 2.7, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 160px" }}
            >
              <ellipse
                cx="135"
                cy="160"
                rx="28"
                ry="17"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(35 135 160)"
              />

          )}

          {progress === 100 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [0, 5, -5, 0] }}
              transition={{ 
                scale: { duration: 0.5 },
                rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="140"
                  rx="8"
                  ry="12"
                  fill="oklch(0.85 0.15 50)"
                  filter="url(#glow)"
                  transform={`rotate(${angle} 100 140)`}
                />
              ))}
            </motion.g>
          )}



          <motion.circle

            cy="150"

            fill="oklch(0.3 0 0 / 0.7)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}

        )}



        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}

          transition={{ duration: 0.5 }}

          <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
            🌸 Fully Grown! 🌸
          </div>
        </motion.div>


      <div className="absolute bottom-0 w-full flex justify-center">

          className="w-32 h-2 bg-gradient-to-r from-transparent via-green-500/30 to-transparent rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, oklch(0.65 0.15 145 / ${progress / 100}), transparent)`
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}

        />

    </div>

}
