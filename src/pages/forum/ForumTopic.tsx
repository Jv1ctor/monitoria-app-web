import * as React from "react"
import { NavLink, useLoaderData, useParams } from "react-router"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/shared/Avatar"
import EntityPreview from "@/components/shared/EntityPreview"
import type { User } from "@/types/User"
import type { Reply } from "@/types/forum/Reply.type"
import { forumByRole } from "@/routes/paths"
import { initialReplies, initialTopics } from "./forum.mock"

export function ForumTopicPage() {
  const { id: topicId } = useParams()
  const { id: user } = useLoaderData() as User
  const role = user.role.role

  const topic = initialTopics.find((t) => t.id === topicId)

  const [replies, setReplies] = React.useState<Reply[]>(() =>
    initialReplies.filter((reply) => reply.topicId === topicId)
  )

  const replyContentRef = React.useRef<HTMLTextAreaElement>(null)

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 w-full text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Tópico não encontrado</h1>
        <NavLink to={forumByRole[role]}>
          <Button variant="outline">Voltar ao fórum</Button>
        </NavLink>
      </div>
    )
  }

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    const content = replyContentRef.current?.value

    if (!content || content.trim() === "") return

    const newReply: Reply = {
      id: Math.random().toString(),
      topicId: topicId || "",
      author: { firstName: user.firstName, lastName: user.lastName },
      role: role,
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
      <NavLink to={forumByRole[role]} className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors">
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

          <EntityPreview
            className="mb-6"
            leading={<Avatar name={topic.author} size="lg" />}
            title={`${topic.author.firstName} ${topic.author.lastName}`}
            subtitle="Autor do Tópico"
          />

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
                    <Avatar
                      name={reply.author}
                      size="sm"
                      className={reply.role === "monitor" ? "bg-info text-white font-bold" : "font-bold"}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{reply.author.firstName} {reply.author.lastName}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          reply.role === "monitor" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"
                        }`}>
                          {reply.role === "monitor" ? "Monitor" : "Aluno"}
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
