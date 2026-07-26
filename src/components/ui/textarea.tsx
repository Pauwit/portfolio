import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-control border border-foreground/20 bg-transparent px-3 py-2 text-base text-foreground transition-colors outline-none placeholder:text-foreground/40 focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-accent aria-invalid:ring-3 aria-invalid:ring-accent/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
