import * as React from "react"
import { NavLink, useParams } from "react-router" 
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { initialTopics } from "./ForumList"

const allReplies = [
  {
    id: "1",
    topicId: "1",
    authorInitials: "RS",
    authorName: "Rita Souza",
    role: "STUDENT",
    date: "10/05/2026 - 09:14",
    content: "Qual a diferença entre um grafo e uma árvore?",
  },
  {
    id: "2",
    topicId: "1",
    authorInitials: "JL",
    authorName: "João Luiz",
    role: "MONITOR",
    date: "10/05/2026 - 10:02",
    content: "Oi, Rita! A árvore é um tipo especial de grafo que não possui ciclos e possui uma organização hierárquica.",
  }
]

export function ForumTopicPage() {
  const { id } = useParams() 
  
  const topic = initialTopics.find((t) => t.id === id)

  const [currentUserRole] = React.useState<"STUDENT" | "MONITOR">("STUDENT")
  
  const [replies, setReplies] = React.useState(() => 
    allReplies.filter((reply) => reply.topicId === id)
  )
  
  const replyContentRef = React.useRef<HTMLTextAreaElement>(null)

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 w-full text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Tópico não encontrado</h1>
        <NavLink to="/forum">
          <Button variant="outline">Voltar ao fórum</Button>
        </NavLink>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
  }

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    const content = replyContentRef.current?.value

    if (!content || content.trim() === "") return

    let authorName = "Você (Monitor)"
    let authorInitials = "MO"

    if (currentUserRole === "STUDENT") {
      authorName = "Você (Aluno)"
      authorInitials = "AL"
    }

    const newReply = {
      id: Math.random().toString(),
      topicId: id || "",
      authorInitials: authorInitials,
      authorName: authorName,
      role: currentUserRole,
      date: "Agora mesmo",
      content: content,
    }

    setReplies([...replies, newReply])

    if (replyContentRef.current) {
      replyContentRef.current.value = ""
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 w-full">
      <NavLink to="/forum" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ChevronLeft className="mr-1 size-4" />
        Voltar ao fórum
      </NavLink>

      <Card className="shadow-sm border-border mb-8">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">
              {topic.tag}
            </span>
            <span>·</span>
            <span>{topic.date}</span>
            <span>·</span>
            <span>{replies.length} respostas</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            {topic.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              {getInitials(topic.author)}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">{topic.author}</p>
              <p className="text-xs text-muted-foreground">Autor do Tópico</p>
            </div>
          </div>

          <p className="text-sm text-foreground leading-relaxed">
            {topic.preview}
          </p>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4">Respostas</h2>
        
        <div className="flex flex-col gap-4">
          {replies.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-lg">
              Nenhuma resposta ainda. Seja o primeiro a perguntar!
            </p>
          ) : (
            replies.map((reply) => (
              <Card key={reply.id} className="shadow-sm border-border">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`size-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      reply.role === "MONITOR" ? "bg-[#00A8E8] text-white" : "bg-primary text-primary-foreground"
                    }`}>
                      {reply.authorInitials}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{reply.authorName}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          reply.role === "MONITOR" ? "bg-[#00A8E8]/10 text-[#00A8E8]" : "bg-muted text-muted-foreground"
                        }`}>
                          {reply.role === "MONITOR" ? "Monitor" : "Aluno"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground hidden sm:inline">·</span>
                      <span className="text-xs text-muted-foreground">{reply.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {reply.content}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Card className="shadow-sm border-border">
        <CardContent className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Sua resposta</h3>
          <form onSubmit={handleSubmitReply}>
            <textarea
              ref={replyContentRef}
              placeholder="Escreva sua resposta..."
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y mb-4"
            />
            <div className="flex justify-end">
              <Button type="submit">
                Publicar Resposta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}