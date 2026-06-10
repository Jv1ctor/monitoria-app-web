import { handleRequest, ApiError } from "@/lib/handle-request"
import type {
  AuthResponse,
  RegisterResponse,
  AuthRequestResult,
} from "@/types/auth/auth-responses.type"

type LoginPayload = {
  regitration: string
  password: string
}

type RegisterServicePayload = {
  firstName: string
  lastName: string
  email: string
  password: string
  registration: string
  course: string
}

async function loginRequest(payload: LoginPayload): Promise<AuthRequestResult> {
  try {
    const data = await handleRequest<AuthResponse>({
      method: "POST",
      url: "/auth/login",
      data: {
        registration: payload.regitration,
        password: payload.password,
      },
    })

    return {
      success: true,
      accessToken: data.token,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        fieldErrors:
          error.fieldErrors.length > 0 ? error.fieldErrors : undefined,
        errorMessage: error.message,
      }
    }

    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "Erro inesperado ao fazer login.",
    }
  }
}

async function registerRequest(
  payload: RegisterServicePayload,
): Promise<AuthRequestResult> {
  try {
    const registerPayload = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      registration: payload.registration,
      email: payload.email,
      password: payload.password,
      major_name: payload.course,
    }

    await handleRequest<RegisterResponse>({
      method: "POST",
      url: "/auth/register",
      data: registerPayload,
    })

    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        fieldErrors:
          error.fieldErrors.length > 0 ? error.fieldErrors : undefined,
        errorMessage: error.message,
      }
    }

    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "Erro inesperado ao criar conta.",
    }
  }
}

export { loginRequest, registerRequest }
export type { LoginPayload, RegisterServicePayload }
