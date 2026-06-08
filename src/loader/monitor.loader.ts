import type { User } from "@/types/User"

const MONITOR_USER: User = {
  id: {
    firstName: "Brenda",
    lastName: "Lima",
    registration: "Mát. 12345678",
    role: { role: "monitor" },
  },
}

export const monitorLoader = async (): Promise<User> => {
  // TODO(back): trocar pelo fetch real quando a API existir
  return MONITOR_USER
}
