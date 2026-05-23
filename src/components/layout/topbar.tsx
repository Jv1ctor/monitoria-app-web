import type { ReactElement, ReactNode } from "react"

import { cn } from "@/lib/utils"
import { type NavLinkProps } from "react-router"
import { Book } from "lucide-react"

type Props = {
  navComponents?: ReactElement<NavLinkProps>[]
  className?: string
  actions?: ReactNode
}

function Topbar({ navComponents = [], className, actions }: Props) {
  return (
    <div
      className={cn(
        "flex gap-3 px-10 py-4 justify-between sm:flex-row sm:items-center",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-primary font-bold text-xl">
        <Book />
        Monitoria
      </div>

      <nav className="hidden lg:block space-y-1">
        <ul className="flex justify-between gap-7">
          {navComponents &&
            navComponents.map((component) => (
              <li
                key={component.key}
                className="text-gray-700 text-sm cursor-pointer tracking-wide"
              >
                {component}
              </li>
            ))}
        </ul>
        {/* <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )} */}
      </nav>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export { Topbar }
