import * as React from "react"
import { useLoaderData, useNavigate } from "react-router"
import { MessageSquare, Trash2, Plus, InfoIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import FormModal from "@/components/shared/FormModal"
import SelectComponent from "@/components/shared/SelectComponent"
import { createTopicSchema } from "@/schemas/forum"
import type { User } from "@/types/User"
import type { Topic } from "@/types/forum/Topic.type"
import { forumByRole } from "@/routes/paths"
import { initialTopics } from "./forum.mock"

const COURSES = [
  { value: "calculo1", label: "Cálculo I" },
  { value: "estrutura", label: "Estrutura de Dados" },
  { value: "discreta", label: "Matemática Discreta" },
]

export function ForumListPage() {
  const navigate = useNavigate()
  const { id } = useLoaderData() as User
  const role = id.role.role
  const [topics, setTopics] = React.useState<Topic[]>(initialTopics)

  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedCourse, setSelectedCourse] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})

  const resetForm = () => {
    setSelectedCourse("")
    setTitle("")
    setContent("")
    setFormErrors({})
  }

  const handleDelete = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation() // vai evitar que o clique na lixeira abra o card do tópico
    setTopics((currentTopics) => currentTopics.filter((topic) => topic.id !== topicId))
    toast.success("Tópico removido com sucesso!")
  }

  const handleCardClick = (topicId: string) => {
    navigate(`${forumByRole[role]}/${topicId}`)
  }

  const handleCreateSubmit = () => {
    const data = { course: selectedCourse, title, content }
    const result = createTopicSchema.safeParse(data)

    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        errors[issue.path[0] as string] = issue.message
      })
      setFormErrors(errors)
      return
    }

    const newTopic: Topic = {
      id: Math.random().toString(),
      title: data.title,
      tag: COURSES.find((c) => c.value === data.course)?.label || data.course,
      preview: data.content,
      author: { firstName: id.firstName, lastName: id.lastName },
      date: "Agora",
      repliesCount: 0,
    }

    setTopics([newTopic, ...topics])
    toast.success("Tópico publicado!")
    setIsSheetOpen(false)
    resetForm()
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Fórum da Monitoria</h1>
          <p className="text-sm text-muted-foreground mt-1">Tire dúvidas e converse com a turma.</p>
        </div>

        {role === "monitor" && (
          <Button onClick={() => setIsSheetOpen(true)}>
            <Plus className="mr-2 size-4" />
            Novo Tópico
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {topics.length === 0 ? (
          <div className="text-center py-5 flex flex-row gap-3 items-center justify-center ">
            <InfoIcon/> <p>Nenhum tópico criado até o momento.</p>
          </div>
        ) : (
          topics.map((topic) => (
            <Card
              key={topic.id}
              onClick={() => handleCardClick(topic.id)}
              className="shadow-sm border-border cursor-pointer hover:border-primary/50 hover:shadow-md hover:bg-muted/10 transition-all"
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <MessageSquare className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {topic.title}
                    </span>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">{topic.tag}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{topic.preview}</p>
                  <div className="text-xs text-muted-foreground/80 font-medium">Por {topic.author.firstName} {topic.author.lastName} · {topic.date} · {topic.repliesCount} respostas</div>
                </div>
                {role === "monitor" && (
                  <button
                    onClick={(e) => handleDelete(e, topic.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-2 z-10"
                    title="Excluir"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {role === "monitor" && (
        <FormModal
          id="create-topic-form"
          open={isSheetOpen}
          onOpenChange={(open) => {
            setIsSheetOpen(open)
            if (!open) resetForm()
          }}
          title="Novo Tópico"
          description="Inicie uma discussão para sua turma preenchendo os dados abaixo."
          handleSafeChanges={handleCreateSubmit}
          handleCloseModal={() => {
            setIsSheetOpen(false)
            resetForm()
          }}
          labelSaveModalButton="Publicar"
          labelCloseModalButton="Cancelar"
        >
          <Field>
            <FieldLabel>Disciplina</FieldLabel>
            <SelectComponent
              label="Disciplina"
              placeholder="Selecione..."
              items={COURSES}
              value={selectedCourse}
              onValueChange={setSelectedCourse}
              className={formErrors.course ? "border-destructive" : undefined}
            />
            {formErrors.course && <FieldError errors={[{ message: formErrors.course }]} />}
          </Field>

          <Field>
            <FieldLabel>Título</FieldLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dúvida sobre limites"
              className={formErrors.title ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {formErrors.title && <FieldError errors={[{ message: formErrors.title }]} />}
          </Field>

          <Field>
            <FieldLabel>Mensagem</FieldLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Descreva sua dúvida ou tópico de discussão"
              className={formErrors.content ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {formErrors.content && <FieldError errors={[{ message: formErrors.content }]} />}
          </Field>
        </FormModal>
      )}
    </div>
  )
}
