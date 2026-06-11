import { jwtDecode } from "jwt-decode";
import type { UserJWT } from "@/types/auth/auth-responses.type";

export function decodeToken<T = Record<string, unknown>>(
  token: string,
): T | null {
  try {
    return jwtDecode<T>(token);
  } catch {
    return null;
  }
}

export function extractUserFromPayload(
  payload: Record<string, unknown> | null,
): UserJWT | null {
  if (!payload) return null;

  const name = payload.name;
  const userId = payload.user_id;
  const role = payload.role;

  if (typeof name !== "string" || typeof userId !== "number") {
    return null;
  }

  let parsedRole: UserJWT["roles"][number]["role"] = "student";
  if (typeof role === "string") {
    const normalized = role.toLowerCase();
    if (
      normalized === "student" ||
      normalized === "monitor" ||
      normalized === "admin"
    ) {
      parsedRole = normalized;
    }
  }

  return {
    userId,
    firstName: name,
    lastName: "",
    registration: "",
    email: "",
    roles: [{ role: parsedRole }],
  };
}

export function getToken(): string | null {
  try {
    return localStorage.getItem("access_token");
  } catch {
    return null;
  }
}

export function getUserFromToken(token: string | null): UserJWT | null {
  if (!token) return null;
  return extractUserFromPayload(decodeToken(token));
}

export function getRoleFromToken(token: string): string | null {
  const payload = decodeToken<Record<string, unknown>>(token);
  if (!payload) return null;
  const role = payload.role;
  if (typeof role !== "string") return null;
  const normalized = role.toLowerCase();
  if (normalized === "student" || normalized === "monitor" || normalized === "admin") {
    return normalized;
  }
  return null;
}
