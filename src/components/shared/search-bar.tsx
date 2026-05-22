import * as React from "react"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type SearchBarProps = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  action?: React.ReactNode
  className?: string
}

function SearchBar({
  value,
  placeholder = "Buscar",
  onChange,
  onSubmit,
  action,
  className,
}: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.()
  }

  const inputProps: React.ComponentProps<typeof Input> = {
    placeholder,
    className: "pl-9",
  }

  if (value !== undefined) {
    inputProps.value = value
  }

  if (onChange) {
    inputProps.onChange = (event) => onChange(event.target.value)
  }

  return (
    <form
      className={cn("flex w-full flex-col gap-3 sm:flex-row", className)}
      onSubmit={handleSubmit}
    >
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input {...inputProps} />
      </div>
      {action}
    </form>
  )
}

export { SearchBar }
