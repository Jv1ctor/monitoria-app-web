import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type WelcomeHeaderProps = {
  title: string
  subtitle?: ReactNode
  className?: string
}

function WelcomeHeader({ title, subtitle, className }: WelcomeHeaderProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

export { WelcomeHeader }
