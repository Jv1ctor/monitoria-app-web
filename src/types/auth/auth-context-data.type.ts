import type {
  AuthRequestResult,
  UserJWT,
} from "@/types/auth/auth-responses.type"

type AuthContextData = {
  user: UserJWT | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthRequestResult>
  register: (payload: RegisterPayload) => Promise<AuthRequestResult>
  logout: () => void
}

type RegisterPayload = {
  firstName: string
  lastName: string
  registration: string
  email: string
  password: string
  course: string
}

export type { AuthContextData, RegisterPayload }
