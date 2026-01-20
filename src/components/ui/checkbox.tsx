"use client"

import { ComponentProps } from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import CheckIcon from "lucide-react/dist/esm/icons/check"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-all duration-300 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-primary data-[state=checked]:via-primary data-[state=checked]:to-primary/80 data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-md data-[state=checked]:shadow-primary/30 data-[state=checked]:scale-105",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-all duration-200 animate-in zoom-in-50"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
