import * as React from "react"
import { NavLink } from "react-router"
import { MessageSquare, Trash2, Plus } from "lucide-react"
import { toast } from "sonner" 
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { id } from "zod/v4/locales"

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
  const [currentUserRole] = React.useState<"STUDENT" | "MONITOR">("MONITOR") 
  const [topics, setTopics] = React.useState(initialTopics)

  const handleDelete = (topicId: string) => {
    setTopics((currentTopics) => currentTopics.filter((topic) => topic.id !== topicId))
    toast.success("Tópico removido com sucesso!")
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Fórum da Monitoria</h1>
          <p className="text-sm text-muted-foreground mt-1">Tire dúvidas e converse com a turma.</p>
        </div>
        
        {currentUserRole === "MONITOR" && (
          <NavLink to="/forum/new">
            <Button>
              <Plus className="mr-2 size-4" />
              Novo Tópico
            </Button>
          </NavLink>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {topics.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Nenhum tópico encontrado.</div>
        ) : (
          topics.map((topic) => (
            <Card key={topic.id} className="shadow-sm border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <MessageSquare className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <NavLink to={`/forum/${topic.id}`} className="text-base font-bold text-foreground hover:underline truncate">
                      {topic.title}
                    </NavLink>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">{topic.tag}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{topic.preview}</p>
                  <div className="text-xs text-muted-foreground/80 font-medium">Por {topic.author} · {topic.date} · {topic.repliesCount} respostas</div>
                </div>
                {currentUserRole === "MONITOR" && (
                  <button onClick={() => handleDelete(topic.id)} className="text-muted-foreground hover:text-destructive transition-colors p-2" title="Excluir">
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