import * as React from "react"
import { cva, type VariantProps } from "cla
import { cn } from "@/lib/utils"

  {

          "bg-primary text-
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
   
          "bg-s
        link: "t
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        icon: "h-9 w
    },
      variant: "
    },
)
export interface ButtonProps
    VariantProps<typeof buttonVariants> {
}
const Bu
    const Com
      <Comp
        ref={ref}
      />
  }
Button.d
export




























