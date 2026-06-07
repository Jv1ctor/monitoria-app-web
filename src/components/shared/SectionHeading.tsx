import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  meta?: ReactNode
  className?: string
}

function SectionHeading({ title, meta, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      {meta && <span className="text-sm text-muted-foreground">{meta}</span>}
    </div>
  )
}

export { SectionHeading }
