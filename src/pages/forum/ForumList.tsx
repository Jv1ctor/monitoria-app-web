import * as React from "react"
import { useLoaderData, useNavigate } from "react-router"
import { MessageSquare, Trash2, Plus, InfoIcon } from "lucide-react"
import { toast } from "sonner" 

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
// import { createTopicSchema } from "@/schemas/forum"
import type { User } from "@/types/User"
import type { Topic } from "@/types/forum/Topic.type"
import { forumByRole } from "@/routes/paths"
import { initialTopics } from "./forum.mock"

// const COURSES = [
//   { value: "calculo1", label: "Cálculo I" },
//   { value: "estrutura", label: "Estrutura de Dados" },
//   { value: "discreta", label: "Matemática Discreta" },
// ]

export function ForumListPage() {
  const navigate = useNavigate()
  const { id } = useLoaderData() as User
  const role = id.role.role
  const [topics, setTopics] = React.useState<Topic[]>(initialTopics)

  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  // const [selectedCourse, setSelectedCourse] = React.useState("")
  // const [, setFormErrors] = React.useState<Record<string, string>>({})
  // const titleRef = React.useRef<HTMLInputElement>(null)
  // const contentRef = React.useRef<HTMLTextAreaElement>(null)

  const handleDelete = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation() // vai evitar que o clique na lixeira abra o card do tópico
    setTopics((currentTopics) => currentTopics.filter((topic) => topic.id !== topicId))
    toast.success("Tópico removido com sucesso!")
  }

  const handleCardClick = (topicId: string) => {
    navigate(`${forumByRole[role]}/${topicId}`)
  }

  // TODO: reativar quando o formulário de criação de tópico for implementado
  // const handleCreateSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setFormErrors({})

  //   const data = {
  //     course: selectedCourse,
  //     title: titleRef.current?.value || "",
  //     content: contentRef.current?.value || ""
  //   }
  //
  //   const result = createTopicSchema.safeParse(data)

  //   if (!result.success) {
  //     const errors: Record<string, string> = {}
  //     result.error.issues.forEach((issue) => errors[issue.path[0] as string] = issue.message)
  //     setFormErrors(errors)
  //     return
  //   }

  //   const newTopic: Topic = {
  //     id: Math.random().toString(),
  //     title: data.title,
  //     tag: COURSES.find(c => c.value === data.course)?.label || data.course,
  //     preview: data.content,
  //     author: { firstName: id.firstName, lastName: id.lastName },
  //     date: "Agora",
  //     repliesCount: 0
  //   }

  //   setTopics([newTopic, ...topics])
  //   toast.success("Tópico publicado!")
  //   setIsSheetOpen(false)
  //
  //   setSelectedCourse("")
  //   if (titleRef.current) titleRef.current.value = ""
  //   if (contentRef.current) contentRef.current.value = ""
  // }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Fórum da Monitoria</h1>
          <p className="text-sm text-muted-foreground mt-1">Tire dúvidas e converse com a turma.</p>
        </div>
        
        {role === "monitor" && (
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

              {/* <FormModal/> */}
            </SheetContent>
          </Sheet>
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
    </div>
  )
}