import { useEffect, useState } from 'react'


}
export function Gr

 

      }, 500)
    } else {


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
          <linearGradient id="stemGradient" x1=
            <stop offset="100%" stopColor="oklc

          
          <filter id="glow">
           
              <feMer
          </filter>

          animate={{ opacity:
       
            x=
            width="10"
            rx="5"
            animate={{ 
              y: 280 - stem
            transition={{ duration: 0.5, ease: "easeOut" }}

            <motion.g
              animate={{ 
                opacity: 1,
              }}
                scale
                rotate: { duration: 2, repeat
              style={{ transformOrigin: "100px 
              <ellipse
                cy=
               

              />
          )}
          {growthStage >= 0 && (
         
                scale:
                ro
              transition={{ 
                opacit
              }}
            >
                cx="130"
                ry="15"
                filter="url(#glow
              />
          )}
            transition={{ duration: 0.5, ease: "easeOut" }}
            

                rotate: isGrowin
            <motion.g
                opacity: { duration: 0.5 },
              }}
            >
                opacity: 1,
                rx="25"
              }}
                transform="r
                scale: { duration: 0.5, ease: "easeOut" },

            <motion.g
              an
                opacity: 1,
             
                scale:
                rotate:
                cy="220"
              <ellipse
                ry="15"
                ry="15"
                filter="url(#glow)"
              />
              />
          {growthStage 
          )}
            
                rotate: isGrowin
              transit
                opacity: { duration: 0.5 },
              animate={{ 
            >
                opacity: 1,
                rx="28"
              }}
              transition={{ 
                scale: { duration: 0.5, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
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

          {growthStage >= 1 && (
              <ellips
              initial={{ scale: 0, opacity: 0 }}
                rx="28"
                scale: leafScale, 
                filter="url
                rotate: isGrowing ? [0, -2.5, 0] : 0 
            </mo
              transition={{ 
                scale: { duration: 0.6, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 200px" }}
            >
                scale:
                cx="65"
                cy="200"
                rx="25"
              <ellipse
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(-35 65 200)"
                
            </motion.g>
            

          {growthStage >= 1 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale, 
                opacity: 1,
                rotate: isGrowing ? [0, 2.5, 0] : 0 
              st
              transition={{ 
                scale: { duration: 0.6, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 200px" }}
             
              <ellipse
                cx="135"
                cy="200"
          {progress ===
                ry="15"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(35 135 200)"
              />
              {[0, 72, 
          )}

          {growthStage >= 2 && (
                  ry=
              initial={{ scale: 0, opacity: 0 }}
                  transfo
                scale: leafScale, 
            </motion.g>
                rotate: isGrowing ? [0, -3, 0] : 0 

              transition={{ 
                scale: { duration: 0.7, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 180px" }}
            >
      </svg>
                cx="60"
                cy="180"
                rx="28"
          animate={{ op
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(-40 60 180)"
        </motion
            </motion.g>
      <div c

          {growthStage >= 2 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale, 
                opacity: 1,
                rotate: isGrowing ? [0, 3, 0] : 0 

              transition={{ 
                scale: { duration: 0.7, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformOrigin: "100px 180px" }}

              <ellipse
                cx="140"
                cy="180"

                ry="17"
                fill="url(#leafGradient)"
                filter="url(#glow)"
                transform="rotate(40 140 180)"
              />

          )}

          {growthStage >= 3 && (

              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: leafScale, 
                opacity: 1,
                rotate: isGrowing ? [0, -2.7, 0] : 0 

              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.5 },
                rotate: { duration: 2.7, repeat: Infinity, ease: "easeInOut" }
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

          )}

























            </motion.g>

























        </motion.g>

        {isPaused && (

            cx="100"

            r="30"




          />

      </svg>

      {progress === 100 && (



          animate={{ opacity: 1, y: 0, scale: 1 }}

        >




      )}


        <motion.div






          transition={{ duration: 0.5 }}

      </div>

  )

