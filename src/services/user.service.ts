import { handleRequest } from "@/lib/handle-request"
import type { UserJWT } from "@/types/auth/auth-responses.type"
import type { ApiRole } from "@/types/roles/Role"

type MeResponse = {
  id: number
  registration: string
  email: string
  first_name: string
  last_name: string
  role: ApiRole
  createdAt: string
}

function toRole(role: ApiRole): UserJWT["roles"][number]["role"] {
  return role.toLowerCase() as UserJWT["roles"][number]["role"]
}

async function meRequest(): Promise<UserJWT | null> {
  try {
    const data = await handleRequest<MeResponse>({
      method: "GET",
      url: "/user/me",
    })

    return {
      userId: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      registration: data.registration,
      email: data.email,
      roles: [{ role: toRole(data.role) }],
    }
  } catch {
    return null
  }
}

export { meRequest }
