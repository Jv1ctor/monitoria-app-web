import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"
import { router } from "./router"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/auth.provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster position="top-center" />
  </StrictMode>,
)
