import * as React from "react"
import { NavLink, useNavigate } from "react-router" 
import { Book, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { loginSchema } from "@/schemas/auth"

export const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [formErrors, setFormErrors] = React.useState<{ matricula?: string; senha?: string }>({})

  const matriculaRef = React.useRef<HTMLInputElement>(null)
  const senhaRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    const data = {
      matricula: matriculaRef.current?.value || "",
      senha: senhaRef.current?.value || "",
    }


    const result = loginSchema.safeParse(data)

    if (!result.success) {
      const errors: typeof formErrors = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "matricula") errors.matricula = issue.message
        if (issue.path[0] === "senha") errors.senha = issue.message
      })
      setFormErrors(errors)
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    const { matricula, senha } = result.data

    if (matricula === "2222222" && senha === "aluno123") {
      toast.success("Login efetuado com sucesso!")
      navigate("/") // redireciona o estudante pro dashboard 
    } else if (matricula === "1111111" && senha === "monitor123") {
      toast.success("Bem-vindo, Monitor!")
      navigate("/") // rota de monitoria
    } else if(matricula === "0000000" && senha === "admin123"){
        toast.success("Bem vindo, Monitor!")
        navigate("/")
    } else {
      toast.error("Matrícula ou senha inválida. Tente novamente.")
    }

    setIsLoading(false)
  }

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

      <Card className="w-full max-w-[440px] shadow-card border-border rounded-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-5">
              
              <Field>
                <FieldLabel>Matrícula</FieldLabel>
                <Input
                  ref={matriculaRef}
                  placeholder="Digite sua matrícula"
                  className={formErrors.matricula ? "border-destructive focus-visible:ring-destructive/30" : ""}
                />
                {formErrors.matricula && <FieldError errors={[{ message: formErrors.matricula }]} />}
              </Field>

              <Field>
                <FieldLabel>Senha</FieldLabel>
                <Input
                  ref={senhaRef}
                  type="password"
                  placeholder="Digite sua senha"
                  className={formErrors.senha ? "border-destructive focus-visible:ring-destructive/30" : ""}
                />
                {formErrors.senha && <FieldError errors={[{ message: formErrors.senha }]} />}
              </Field>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="lembrarMe"
                    className="size-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <label htmlFor="lembrarMe" className="text-xs font-semibold text-foreground select-none cursor-pointer">
                    Lembrar-me
                  </label>
                </div>
                <NavLink to="/recover" className="text-xs font-semibold text-primary hover:underline">
                  Esqueci minha senha
                </NavLink>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin size-4" />
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
                  <NavLink to="/register" className="font-bold text-primary hover:underline">
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