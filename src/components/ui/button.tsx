import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/0 before:via-white/5 before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        destructive:
          "bg-gradient-to-br from-destructive via-destructive to-destructive/80 text-white shadow-lg shadow-destructive/20 hover:shadow-xl hover:shadow-destructive/30 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/0 before:via-white/5 before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:shadow-md hover:border-primary/30 hover:scale-[1.01] active:scale-[0.99]",
        secondary:
          "bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-t before:from-primary/0 before:via-primary/5 before:to-primary/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        ghost:
          "hover:bg-gradient-to-br hover:from-accent hover:to-accent/80 hover:text-accent-foreground dark:hover:bg-accent/50 hover:scale-[1.01] active:scale-[0.99]",
        link: "text-primary underline-offset-4 hover:underline bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-no-repeat bg-bottom hover:bg-[length:100%_2px] transition-all duration-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
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
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
