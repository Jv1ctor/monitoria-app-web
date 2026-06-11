import { useEffect, useState } from "react"
import { AuthContext } from "@/context/auth.context"
import { loginRequest, registerRequest } from "@/services/auth.service"
import { meRequest } from "@/services/user.service"
import { getToken, getUserFromToken } from "@/lib/jwt"
import type {
  AuthContextData,
  RegisterPayload,
} from "@/types/auth/auth-context-data.type"
import type {
  AuthRequestResult,
  UserJWT,
} from "@/types/auth/auth-responses.type"

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserJWT | null>(() =>
    getUserFromToken(getToken()),
  )
  const [isLoading, setIsLoading] = useState(false)

  // Completa o usuário com o perfil de /user/me (matrícula, sobrenome, etc.),
  // que não vêm no JWT. Cai no decode do token se a requisição falhar.
  async function loadUser(token: string) {
    const me = await meRequest()
    setUser(me ?? getUserFromToken(token))
  }

  // Ao iniciar com um token salvo, enriquece o usuário decodificado do JWT.
  useEffect(() => {
    const token = getToken()
    if (!token) return
    meRequest().then((me) => {
      if (me) setUser(me)
    })
  }, [])

  async function login(
    regitration: string,
    password: string,
  ): Promise<AuthRequestResult> {
    setIsLoading(true)
    try {
      const result = await loginRequest({ regitration, password })

      if (!result.success) {
        return result
      }

      if (result.accessToken) {
        localStorage.setItem("access_token", result.accessToken)
        await loadUser(result.accessToken)
      }

      return result
    } finally {
      setIsLoading(false)
    }
  }

  async function register(
    payload: RegisterPayload,
  ): Promise<AuthRequestResult> {
    setIsLoading(true)
    try {
      const registerResult = await registerRequest({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        registration: payload.registration,
        course: payload.course,
      })

      if (!registerResult.success) {
        return registerResult
      }

      const loginResult = await loginRequest({
        regitration: payload.registration,
        password: payload.password,
      })

      if (!loginResult.success) {
        return loginResult
      }

      if (loginResult.accessToken) {
        localStorage.setItem("access_token", loginResult.accessToken)
        await loadUser(loginResult.accessToken)
      }

      return loginResult
    } finally {
      setIsLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem("access_token")
    setUser(null)
  }

  const value: AuthContextData = {
    user,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
