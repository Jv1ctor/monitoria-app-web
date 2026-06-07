import type { LucideIcon } from "lucide-react"

type Metric = {
  label: string
  value: number
  icon: LucideIcon
}

type Session = {
  id: number
  dataISO: string
  disciplina: string
  local: string
}

export type { Metric, Session }