import type { ReactNode } from "react"
import { NavLink } from "react-router"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type ShortcutCardProps = {
  icon: ReactNode
  title: string
  description: string
  to: string
  className?: string
}

function ShortcutCard({ icon, title, description, to, className }: ShortcutCardProps) {
  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-card transition-colors hover:border-primary/40 hover:bg-muted/40",
        className,
      )}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </NavLink>
  )
}

export { ShortcutCard }
