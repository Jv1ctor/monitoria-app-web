import * as React from "react"
import { NavLink, useNavigate } from "react-router"
import { Book } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { loginSchema } from "@/schemas/auth"
import { paths } from "@/routes/paths"
import { useAuth } from "@/hooks/use-auth.hook"
import type { Role } from "@/types/roles/Role"

const roleRedirect: Record<Role, string> = {
  student: paths.student,
  monitor: paths.monitor,
  admin: paths.admin,
}

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading, user } = useAuth()
  const [formErrors, setFormErrors] = React.useState<{
    registration?: string
    password?: string
  }>({})
  const [globalError, setGlobalError] = React.useState<string>("")

  const registrationRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    setGlobalError("")

    const data = {
      registration: registrationRef.current?.value || "",
      password: passwordRef.current?.value || "",
    }

    const result = loginSchema.safeParse(data)

    if (!result.success) {
      const errors: typeof formErrors = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "registration")
          errors.registration = issue.message
        if (issue.path[0] === "password") errors.password = issue.message
      })
      setFormErrors(errors)
      return
    }

    const { registration, password } = result.data

    const apiResult = await login(registration, password)

    if (!apiResult.success) {
      if (apiResult.fieldErrors) {
        const errors: typeof formErrors = {}
        apiResult.fieldErrors.forEach((err) => {
          if (err.field === "registration") errors.registration = err.message
          if (err.field === "password") errors.password = err.message
        })
        setFormErrors(errors)
      }
      if (apiResult.errorMessage) {
        setGlobalError(apiResult.errorMessage)
      }
      return
    }

    toast.success("Login efetuado com sucesso!")
  }

  React.useEffect(() => {
    if (user) {
      const role = user.roles[0]?.role ?? "student"
      navigate(roleRedirect[role] ?? paths.student)
    }
  }, [user, navigate])

  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-background px-6 py-12">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl">
          <Book size={28} />
          Monitoria
        </div>
        <h1 className="text-3xl font-bold mt-6 text-foreground tracking-tight">
          Bem-vindo de volta
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Faça login com sua matrícula da Unifor.
        </p>
      </div>

      <Card className="w-full max-w-110 shadow-card border-border rounded-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel>Matrícula</FieldLabel>
                <Input
                  ref={registrationRef}
                  placeholder="Digite sua matrícula"
                  className={
                    formErrors.registration
                      ? "border-destructive focus-visible:ring-destructive/30"
                      : ""
                  }
                />
                {formErrors.registration && (
                  <FieldError errors={[{ message: formErrors.registration }]} />
                )}
              </Field>

              <Field>
                <FieldLabel>Senha</FieldLabel>
                <Input
                  ref={passwordRef}
                  type="password"
                  placeholder="Digite sua senha"
                  className={
                    formErrors.password
                      ? "border-destructive focus-visible:ring-destructive/30"
                      : ""
                  }
                />
                {formErrors.password && (
                  <FieldError errors={[{ message: formErrors.password }]} />
                )}
              </Field>

              {globalError && (
                <p className="text-sm text-destructive font-medium">
                  {globalError}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="size-4" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>

              <div className="relative flex items-center justify-center my-1">
                <div className="absolute inset-0 top-1/2 border-t border-border" />
                <span className="relative bg-background px-3 text-xs text-muted-foreground font-semibold">
                  ou
                </span>
              </div>

              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Primeiro acesso?{" "}
                  <NavLink
                    to={paths.register}
                    className="font-bold text-primary hover:underline"
                  >
                    Cadastre-se aqui
                  </NavLink>
                </p>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
