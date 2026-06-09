import type { FullName } from "@/lib/getInitials"

export type Topic = {
  id: string
  title: string
  tag: string
  preview: string
  author: FullName
  date: string
  repliesCount: number
}
