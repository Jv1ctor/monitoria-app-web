import type { User } from "@/types/User"

const ADMIN_USER: User = {
  id: {
    firstName: "Gabriela",
    lastName: "Souza",
    registration: "Mát. 12345678",
    role: { role: "admin" },
  },
}

export const adminLoader = async (): Promise<User> => {
  // TODO(back): trocar pelo fetch real quando a API existir
  return ADMIN_USER
}
