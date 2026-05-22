import * as React from "react"

import { cn } from "@/lib/utils"

type AppShellProps = {
  sidebar: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function AppShell({ sidebar, header, children, className }: AppShellProps) {
  return (
    <div className={cn("min-h-svh bg-background", className)}>
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-sidebar-border bg-sidebar lg:block">
          {sidebar}
        </aside>
        <div className="flex min-h-svh flex-col">
          {header && (
            <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
              {header}
            </header>
          )}
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}

export { AppShell }
