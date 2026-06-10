import * as React from "react"
import { ChevronLeft, CalendarDays, Clock, CheckCircle2, BookOpen } from "lucide-react"
import { useNavigate } from "react-router"
import { useLoaderData } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/empty-state"
import { studentMaterial } from "@/routes/paths"
import type { MyMonitoringsLoaderResult } from "@/loaders/my-monitorings.loader"
import type { LessonResponseDto } from "@/types/lesson.type"
import { formatData, formatHora } from "@/lib/data-format.lib"

interface MonitoringCardProps {
  lesson: LessonResponseDto
  onViewContents: (classId: number) => void
}

function MonitoringCard({ lesson, onViewContents }: MonitoringCardProps) {
  const initials = lesson.modality.substring(0, 2).toUpperCase()

  return (
    <Card className="shadow-sm border-border">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-3 items-center">
            <div className="size-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-base leading-tight">
                {lesson.modality}
              </span>
            </div>
          </div>

          <div className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
            <CheckCircle2 className="size-3" />
            Inscrito
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6 flex-1">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            <span>{formatData(lesson.date_time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span>{formatHora(lesson.date_time)}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {lesson.description ?? "Sem descrição"}
          </p>
        </div>

        <div className="mt-auto pt-2 flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full text-foreground"
            onClick={() => onViewContents(lesson.class_id)}
          >
            Ver conteúdos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function MyMonitorings() {
  const navigate = useNavigate()
  const { lessons } = useLoaderData<MyMonitoringsLoaderResult>()

  const handleViewContents = (classId: number) => {
    navigate(studentMaterial(String(classId)))
  }

  const sortedLessons = React.useMemo(() => {
    return [...lessons].sort(
      (a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
    )
  }, [lessons])

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <Button
        variant="ghost"
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-1 size-4" />
        Voltar
      </Button>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          Minhas Monitorias
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe as monitorias em que você está inscrito.
        </p>
      </div>

      {sortedLessons.length === 0 ? (
        <EmptyState
          title="Nenhuma monitoria encontrada"
          description="Você ainda não está inscrito em nenhuma monitoria. Explore as monitorias disponíveis e inscreva-se."
          icon={<BookOpen className="size-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLessons.map((lesson) => (
            <MonitoringCard
              key={lesson.id}
              lesson={lesson}
              onViewContents={handleViewContents}
            />
          ))}
        </div>
      )}
    </div>
  )
}
