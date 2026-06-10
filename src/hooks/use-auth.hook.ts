import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import type { AuthContextData } from "@/types/auth/auth-context-data.type";

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useAuth };
