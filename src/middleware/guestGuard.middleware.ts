import { getRoleFromToken, getToken } from "@/lib/jwt"
import { paths } from "@/routes/paths"
import { redirect } from "react-router"

export function homeByRole(role: string): string {
  if (role === "student") return paths.student
  if (role === "monitor") return paths.monitor
  if (role === "admin") return paths.admin
  return "/"
}

export const guestGuardMiddleware = async () => {
  const token = getToken()
  if (token) {
    const role = getRoleFromToken(token) ?? "/"
    throw redirect(homeByRole(role))
  }
}
