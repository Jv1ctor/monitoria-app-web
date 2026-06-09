import type { User } from "@/types/User"

const STUDENT_USER: User = {
  id: {
    firstName: "João",
    lastName: "Silva",
    registration: "Mat. 12345678",
    role: { role: "student" },
  },
}

export const studentLoader = async (): Promise<User> => {
  // TODO(back): trocar pelo fetch real quando a API existir
  return STUDENT_USER
}
