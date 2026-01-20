import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

  isPaused: boolean

  const [isGrowing,
 

      setIsGrowing(false)
  }, [progress, isPaused])

  const stemHeight 
  return (
      <svg 
        height="300" 
        className="drop-s
     
            <stop offset="

          
            <stop offset="0%" stopColor="oklch(0.
            <stop offset="100%" stopColor="oklch(0.55 0.1

          
              <feMergeNode in="coloredBlur"/>
           
        </defs>
        <motion.g
          animate={{ opacity:
        >
       
            wi
            rx="5"
            filter="url(#glow)"
            transition={{ duration: 0.5, ease: "easeOut" }}
          
            <motion.g
          
                opacity: 1,
              }}
                scale: { duration: 0.8, ease: "easeOut" },
                rotate: { duration: 2, repeat: Infinity, ease: "eas
              style={{ tran
          
                cy="220"
                ry="15"
                filte
              />
          )}
          {growthStage
              initi
               

              tra
                opacity: { duratio
              }}
            >
         
                rx="25
                fi
                transform="rotat
            </motion.g

            <motio
              animate={{ 
                opacity: 1,
              }}
                scale: { duration: 0.8, ease: "easeOut" },
            
          
              <ellipse
                cy="2
                ry="15"
                filter="u
              />
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

                    transform={`
                ))}
            </motion.g>
        </motion.g>
        {isPaused && (
            cx="100"
            r="30"
            init
            exit={{ scale: 0
          />
      </svg>
      {progress === 100 && (
          classN
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div classNa
      )}
      <div className="ab
          className="w-
            background:
          initial={{ opacity: 0, scale: 0
          transition={{ duration: 0
      </div>
  )






































































        )}



        <motion.div



          transition={{ duration: 0.5 }}




      )}









          transition={{ duration: 0.5 }}

      </div>

  )

