import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ScheduleMeta = { icon?: ReactNode; text: ReactNode }

type ScheduleCardProps = {
  /** Conteúdo à esquerda: avatar (student) ou bloco de hora (monitor). */
  leading: ReactNode
  title: ReactNode
  badge?: ReactNode
  subtitle?: ReactNode
  meta?: ScheduleMeta[]
  action?: ReactNode
  /** Destaca a borda esquerda (ex.: sessão de hoje). */
  accent?: boolean
  className?: string
}

function ScheduleCard({
  leading,
  title,
  badge,
  subtitle,
  meta = [],
  action,
  accent = false,
  className,
}: ScheduleCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-card shadow-card",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3 rounded-l-lg border-l-4 p-4 md:flex-row md:items-center md:justify-between",
          accent ? "border-l-[var(--primary-500)]" : "border-l-primary",
        )}
      >
        <div className="flex items-center gap-3">
          {leading}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold">{title}</p>
              {badge}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        {(meta.length > 0 || action) && (
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {meta.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
            {action}
          </div>
        )}
      </div>
    </article>
  )
}

export { ScheduleCard }
