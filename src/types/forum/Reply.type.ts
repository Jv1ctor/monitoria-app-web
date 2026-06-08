import type { Role } from "@/types/roles/Role"

type Author = {
  firstName: string,
  lastName: string
}

type Reply = {
  id: string
  topicId: string
  author: Author
  role: Role
  date: string
  content: string
}

export type { Reply }