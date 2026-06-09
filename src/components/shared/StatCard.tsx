import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: ReactNode
  icon?: ReactNode
  hint?: ReactNode
  /** Slot opcional (ex.: barra de progresso) renderizado abaixo do valor. */
  children?: ReactNode
  className?: string
}

function StatCard({ label, value, icon, hint, children, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 shadow-card",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="min-w-0 space-y-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

export { StatCard }
