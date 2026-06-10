import { createContext } from "react";
import type { AuthContextData } from "@/types/auth/auth-context-data.type";

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export { AuthContext };
