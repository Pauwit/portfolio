import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-control border border-foreground/20 bg-transparent px-3 py-2 text-base text-foreground transition-colors outline-none placeholder:text-foreground/40 focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-accent aria-invalid:ring-3 aria-invalid:ring-accent/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
