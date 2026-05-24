import * as React from "react"
import { NavLink } from "react-router"
import { Book, Loader2, Send } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { recuperarSenhaSchema } from "@/schemas/auth"

export function RecoverPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [formError, setFormError] = React.useState<string | null>(null)

  const emailRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const data = {
      email: emailRef.current?.value || "",
    }

    const result = recuperarSenhaSchema.safeParse(data)

    if (!result.success) {
      setFormError(result.error.issues[0].message)
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsLoading(false)
    setIsSuccess(true)
    toast.success("Link de recuperação enviado com sucesso!")
  }

  if (isSuccess) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-background px-6 py-12">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-2 text-primary font-bold text-2xl">
            <Book size={28} />
            Monitoria
          </div>
        </div>

        <Card className="w-full max-w-[440px] shadow-card border-border rounded-lg text-center">
          <CardContent className="p-10 flex flex-col items-center">
            <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <Send size={28} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">E-mail Enviado!</h2>
            <p className="text-sm text-muted-foreground mb-8">
              Se o e-mail informado estiver cadastrado em nosso sistema, enviamos um link de redefinição de senha para a sua caixa de entrada.
            </p>
            <NavLink to="/login" className="w-full">
              <Button className="w-full" size="lg">
                Voltar para o Login
              </Button>
            </NavLink>
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
      </div>

      <Card className="w-full max-w-[440px] shadow-card border-border rounded-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-5 text-center">
              
              <div className="flex flex-col items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-foreground mt-2">Recuperar senha</h1>
                <p className="text-sm text-muted-foreground leading-normal">
                  Informe seu e-mail institucional. Enviaremos um link de redefinição para você.
                </p>
              </div>

              <Field className="text-left">
                <FieldLabel>E-mail Institucional</FieldLabel>
                <Input
                  ref={emailRef}
                  type="email"
                  placeholder="Digite seu e-mail institucional"
                  className={formError ? "border-destructive focus-visible:ring-destructive/30" : ""}
                />
                {formError && <FieldError errors={[{ message: formError }]} />}
              </Field>

              <Button type="submit" className="w-full mt-2" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin size-4" />
                    Enviando...
                  </>
                ) : (
                  "Enviar link de recuperação"
                )}
              </Button>

              <div className="text-center mt-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Lembrou da senha?{" "}
                  <NavLink to="/login" className="font-bold text-primary hover:underline">
                    Entrar
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