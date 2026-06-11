import * as React from "react"
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router"
import { Book, CheckCircle2 } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"

import { registerSchema } from "@/schemas/auth"
import { paths } from "@/routes/paths"
import { useAuth } from "@/hooks/use-auth.hook"
import type { MajorLoaderResult } from "@/loaders/major.loader"

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/)
  const firstName = parts[0] ?? ""
  const lastName = parts.slice(1).join(" ")
  return { firstName, lastName }
}

export function RegisterPage() {
  const navigate = useNavigate()
  const { majors, error } = useLoaderData<MajorLoaderResult>()
  const majorsLoading = useNavigation().state === "loading"
  const { register, isLoading, user } = useAuth()

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [globalError, setGlobalError] = React.useState<string>("")
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [selectedCourse, setSelectedCourse] = React.useState("")

  const nameRef = React.useRef<HTMLInputElement>(null)
  const enrollmentRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    setGlobalError("")

    const data = {
      name: nameRef.current?.value || "",
      registration: enrollmentRef.current?.value || "",
      course: selectedCourse,
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
    }

    const result = registerSchema.safeParse(data)

    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string
        errors[path] = issue.message
      })
      setFormErrors(errors)
      return
    }

    const { firstName, lastName } = splitName(result.data.name)

    const apiResult = await register({
      firstName,
      lastName,
      registration: result.data.registration,
      email: result.data.email,
      password: result.data.password,
      course: result.data.course,
    })

    if (!apiResult.success) {
      if (apiResult.fieldErrors) {
        const errors: Record<string, string> = {}
        apiResult.fieldErrors.forEach((err) => {
          const key =
            err.field === "registration"
              ? "registration"
              : err.field === "first_name" || err.field === "last_name"
                ? "name"
                : err.field === "major_id"
                  ? "course"
                  : err.field
          errors[key] = err.message
        })
        setFormErrors(errors)
      }
      if (apiResult.errorMessage) {
        setGlobalError(apiResult.errorMessage)
      }
      return
    }

    setIsSuccess(true)
    toast.success("Conta criada com sucesso!")
  }

  React.useEffect(() => {
    if (isSuccess && user) {
      navigate(paths.student)
    }
  }, [isSuccess, user, navigate])

  if (isSuccess && !user) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-background px-6 py-12">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-2 text-primary font-bold text-2xl">
            <Book size={28} />
            Monitoria
          </div>
        </div>

        <Card className="w-full max-w-110 shadow-card border-border rounded-lg text-center">
          <CardContent className="p-10 flex flex-col items-center">
            <div className="size-16 bg-success/15 text-success rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Cadastro Realizado!
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Sua conta foi criada com sucesso. Você já pode acessar a
              plataforma utilizando sua matrícula e senha.
            </p>
            <Button
              onClick={() => navigate(paths.login)}
              className="w-full"
              size="lg"
            >
              Ir para o Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-background px-6 py-12">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl">
          <Book size={28} />
          Monitoria
        </div>
        <h1 className="text-3xl font-bold mt-6 text-foreground tracking-tight">
          Crie sua conta
        </h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Cadastre-se com sua matrícula para acessar a Monitoria.
        </p>
      </div>

      <Card className="w-full max-w-125 shadow-card border-border rounded-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel>Nome Completo</FieldLabel>
                <Input
                  ref={nameRef}
                  placeholder="Digite seu nome completo"
                  className={
                    formErrors.name
                      ? "border-destructive focus-visible:ring-destructive/30"
                      : ""
                  }
                />
                {formErrors.name && (
                  <FieldError errors={[{ message: formErrors.name }]} />
                )}
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field>
                  <FieldLabel>Matrícula</FieldLabel>
                  <Input
                    ref={enrollmentRef}
                    placeholder="Digite sua matrícula"
                    className={
                      formErrors.registration
                        ? "border-destructive focus-visible:ring-destructive/30"
                        : ""
                    }
                  />
                  {formErrors.registration && (
                    <FieldError
                      errors={[{ message: formErrors.registration }]}
                    />
                  )}
                </Field>

                <Field>
                  <FieldLabel>Curso</FieldLabel>
                  <Select
                    onValueChange={setSelectedCourse}
                    disabled={majorsLoading}
                  >
                    <SelectTrigger
                      className={
                        formErrors.course
                          ? "border-destructive focus-visible:ring-destructive/30"
                          : ""
                      }
                    >
                      <SelectValue
                        placeholder={
                          majorsLoading ? "Carregando..." : "Selecione..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((major) => (
                        <SelectItem key={major.id} value={major.name}>
                          {major.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.course && (
                    <FieldError errors={[{ message: formErrors.course }]} />
                  )}
                </Field>
              </div>

              <Field>
                <FieldLabel>E-mail Institucional</FieldLabel>
                <Input
                  ref={emailRef}
                  placeholder="Digite seu e-mail institucional"
                  className={
                    formErrors.email
                      ? "border-destructive focus-visible:ring-destructive/30"
                      : ""
                  }
                />
                {formErrors.email && (
                  <FieldError errors={[{ message: formErrors.email }]} />
                )}
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field>
                  <FieldLabel>Senha</FieldLabel>
                  <Input
                    ref={passwordRef}
                    type="password"
                    placeholder="Crie uma senha"
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

                <Field>
                  <FieldLabel>Confirmar Senha</FieldLabel>
                  <Input
                    ref={confirmPasswordRef}
                    type="password"
                    placeholder="Confirme a senha"
                    className={
                      formErrors.confirmPassword
                        ? "border-destructive focus-visible:ring-destructive/30"
                        : ""
                    }
                  />
                  {formErrors.confirmPassword && (
                    <FieldError
                      errors={[{ message: formErrors.confirmPassword }]}
                    />
                  )}
                </Field>
              </div>

              {globalError && (
                <p className="text-sm text-destructive font-medium">
                  {globalError}
                </p>
              )}

              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Spinner className="size-4" />
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>

              <div className="text-center mt-2">
                <p className="text-sm text-muted-foreground font-medium">
                  Já tem uma conta?{" "}
                  <NavLink
                    to={paths.login}
                    className="font-bold text-primary hover:underline"
                  >
                    Entrar aqui
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
