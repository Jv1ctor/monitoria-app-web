import { getToken, getUserFromToken } from "@/lib/jwt";
import type { User } from "@/types/User";

export const authLoader = async (): Promise<User | null> => {
  const jwtUser = getUserFromToken(getToken());
  if (!jwtUser) return null;
  return {
    id: {
      firstName: jwtUser.firstName,
      lastName: jwtUser.lastName,
      registration: jwtUser.registration,
      role: { role: jwtUser.roles[0]?.role ?? "student" },
    },
  };
};
