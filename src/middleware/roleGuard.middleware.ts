import { redirect } from "react-router";
import { getRoleFromToken, getToken } from "@/lib/jwt";
import { homeByRole } from "./guestGuard.middleware";
import { paths } from "@/routes/paths";
import type { Role } from "@/types/roles/Role";

export const roleGuardMiddleware =
  (allowed: Role[]) =>
  async (): Promise<null> => {
    const token = getToken();
    if (!token) throw redirect(paths.login);
    const role = getRoleFromToken(token);
    if (!role || !allowed.includes(role as Role)) {
      throw redirect(homeByRole(role ?? ""));
    }
    return null;
  };
