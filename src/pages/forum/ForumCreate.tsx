import * as React from "react"
import { NavLink, useNavigate } from "react-router"
import { ChevronLeft } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTopicSchema } from "@/schemas/auth"

const COURSES = [
  { value: "calculo1", label: "Cálculo I" },
  { value: "estrutura", label: "Estrutura de Dados" },
  { value: "discreta", label: "Matemática Discreta" },
]

export function ForumCreatePage() {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = React.useState("")
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const titleRef = React.useRef<HTMLInputElement>(null)
  const contentRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    const data = { course: selectedCourse, title: titleRef.current?.value || "", content: contentRef.current?.value || "" }
    const result = createTopicSchema.safeParse(data)

    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((issue) => errors[issue.path[0] as string] = issue.message)
      setFormErrors(errors)
      return
    }
    toast.success("Tópico publicado!")
    navigate("/forum")
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 w-full">
      <NavLink to="/forum" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6"><ChevronLeft className="mr-1 size-4" /> Voltar</NavLink>
      <h1 className="text-3xl font-bold mb-6">Novo Tópico</h1>
      <Card><CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-6">
            <Field>
              <FieldLabel>Disciplina</FieldLabel>
              <Select onValueChange={setSelectedCourse}>
                <SelectTrigger className={formErrors.course ? "border-destructive" : ""}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>{COURSES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
              {formErrors.course && <FieldError errors={[{ message: formErrors.course }]} />}
            </Field>
            <Field>
              <FieldLabel>Título</FieldLabel>
              <Input ref={titleRef} className={formErrors.title ? "border-destructive" : ""} />
              {formErrors.title && <FieldError errors={[{ message: formErrors.title }]} />}
            </Field>
            <Field>
              <FieldLabel>Mensagem</FieldLabel>
              <textarea ref={contentRef} className={`w-full h-32 border p-2 ${formErrors.content ? "border-destructive" : ""}`} />
              {formErrors.content && <FieldError errors={[{ message: formErrors.content }]} />}
            </Field>
            <Button type="submit">Publicar</Button>
          </FieldGroup>
        </form>
      </CardContent></Card>
    </div>
  )
}