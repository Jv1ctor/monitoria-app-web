import * as React from "react"
import { useNavigate } from "react-router"
import { MessageSquare, Trash2, Plus } from "lucide-react"
import { toast } from "sonner" 

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { createTopicSchema } from "@/schemas/forum"

const COURSES = [
  { value: "calculo1", label: "Cálculo I" },
  { value: "estrutura", label: "Estrutura de Dados" },
  { value: "discreta", label: "Matemática Discreta" },
]

export const initialTopics = [
  {
    id: "1",
    title: "Grafos e Árvores",
    tag: "Matemática Discreta",
    preview: "Introdução aos conceitos de vértices, arestas, árvores binárias e aplicações em problemas computacionais.",
    author: "Gabriel Santos",
    date: "10/05/2026",
    repliesCount: 3,
  },
  {
    id: "2",
    title: "Pilhas, Filas e Listas Encadeadas",
    tag: "Estrutura de Dados",
    preview: "Explicação prática sobre funcionamento, implementação e aplicações das principais estruturas lineares.",
    author: "Camila Rocha",
    date: "08/05/2026",
    repliesCount: 5,
  }
]

export function ForumListPage() {
  const navigate = useNavigate()
  const [currentUserRole] = React.useState<"STUDENT" | "MONITOR">("STUDENT") 
  const [topics, setTopics] = React.useState(initialTopics)
  
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedCourse, setSelectedCourse] = React.useState("")
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const titleRef = React.useRef<HTMLInputElement>(null)
  const contentRef = React.useRef<HTMLTextAreaElement>(null)

  const handleDelete = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation() // vai evitar que o clique na lixeira abra o card do tópico
    setTopics((currentTopics) => currentTopics.filter((topic) => topic.id !== topicId))
    toast.success("Tópico removido com sucesso!")
  }

  const handleCardClick = (topicId: string) => {
    navigate(`/forum/${topicId}`)
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    const data = { 
      course: selectedCourse, 
      title: titleRef.current?.value || "", 
      content: contentRef.current?.value || "" 
    }
    
    const result = createTopicSchema.safeParse(data)

    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((issue) => errors[issue.path[0] as string] = issue.message)
      setFormErrors(errors)
      return
    }

    const newTopic = {
      id: Math.random().toString(),
      title: data.title,
      tag: COURSES.find(c => c.value === data.course)?.label || data.course,
      preview: data.content,
      author: "Você (Monitor)",
      date: "Agora",
      repliesCount: 0
    }

    setTopics([newTopic, ...topics])
    toast.success("Tópico publicado!")
    setIsSheetOpen(false) 
 
    setSelectedCourse("")
    if (titleRef.current) titleRef.current.value = ""
    if (contentRef.current) contentRef.current.value = ""
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Fórum da Monitoria</h1>
          <p className="text-sm text-muted-foreground mt-1">Tire dúvidas e converse com a turma.</p>
        </div>
        
        {currentUserRole === "MONITOR" && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 size-4" />
                Novo Tópico
              </Button>
            </SheetTrigger>
            
            <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle>Novo Tópico</SheetTitle>
                <SheetDescription>
                  Inicie uma discussão para sua turma preenchendo os dados abaixo.
                </SheetDescription>
              </SheetHeader>

              <form onSubmit={handleCreateSubmit}>
                <FieldGroup className="gap-6">
                  <Field>
                    <FieldLabel>Disciplina</FieldLabel>
                    <Select onValueChange={setSelectedCourse} value={selectedCourse}>
                      <SelectTrigger className={formErrors.course ? "border-destructive" : ""}>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {COURSES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
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
                    <textarea ref={contentRef} className={`flex w-full min-h-[160px] rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 resize-y ${formErrors.content ? "border-destructive focus-visible:ring-destructive" : "border-input focus-visible:ring-ring"}`} />
                    {formErrors.content && <FieldError errors={[{ message: formErrors.content }]} />}
                  </Field>
                  <div className="flex justify-end gap-3 mt-4">
                    <Button type="button" variant="secondary" onClick={() => setIsSheetOpen(false)}>Cancelar</Button>
                    <Button type="submit">Publicar</Button>
                  </div>
                </FieldGroup>
              </form>
            </SheetContent>
          </Sheet>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {topics.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Nenhum tópico encontrado.</div>
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
                  <div className="text-xs text-muted-foreground/80 font-medium">Por {topic.author} · {topic.date} · {topic.repliesCount} respostas</div>
                </div>
                {currentUserRole === "MONITOR" && (
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
    </div>
  )
}