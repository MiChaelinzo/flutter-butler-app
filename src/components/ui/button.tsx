import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/0 before:via-white/5 before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        destructive:
          "bg-gradient-to-br from-destructive via-destructive to-destructive/80 text-white shadow-lg shadow-destructive/20 hover:shadow-xl hover:shadow-destructive/30 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/0 before:via-white/5 before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        outline:
          "border-2 border-primary/30 bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary/10 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-[0.98]",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.95]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      {...props}
    />
  )
}

export { Button, buttonVariants }
