import * as React from "react"

import { cn } from "@/lib/utils"

type SidebarProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

function Sidebar({
  title,
  subtitle,
  children,
  footer,
  className,
}: SidebarProps) {
  return (
    <div className={cn("flex h-full flex-col gap-6 px-4 py-6", className)}>
      <div className="space-y-1">
        <p className="text-base font-semibold text-sidebar-foreground">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <nav className="flex-1 space-y-2">{children}</nav>
      {footer && <div>{footer}</div>}
    </div>
  )
}

export { Sidebar }
