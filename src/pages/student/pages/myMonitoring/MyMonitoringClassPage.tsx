import * as React from "react"
import {
  ChevronLeft,
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  BookOpen,
} from "lucide-react"
import { useNavigate, useRevalidator } from "react-router"
import { useLoaderData } from "react-router"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/empty-state"
import { studentMaterial } from "@/routes/paths"
import { useLessonEnrollment } from "@/hooks/use-lesson-enrollment.hook"
import type { MyMonitoringClassLoaderResult } from "@/loaders/my-monitoring-class.loader"
import type { LessonResponseDto } from "@/types/lesson.type"
import { formatData, formatHora } from "@/lib/data-format.lib"

interface LessonCardProps {
  data: LessonResponseDto
  onViewContent: (id: number) => void
  onUnenroll: (id: number) => void
  isLoading: boolean
}

function LessonCard({ data, onViewContent, onUnenroll, isLoading }: LessonCardProps) {
  const subjectName = data.class?.subject?.name ?? data.modality
  const initials = subjectName.substring(0, 2).toUpperCase()

  return (
    <Card className="shadow-sm border-border">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-3 items-center">
            <div className="size-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-base leading-tight">{subjectName}</span>
              <span className="text-xs text-muted-foreground">{data.description ?? "Sem descrição"}</span>
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
            <span>{formatData(data.date_time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span>{formatHora(data.date_time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">{data.modality}</span>
          </div>
        </div>

        <div className="mt-auto pt-2 flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full text-foreground"
            onClick={() => onViewContent(data.class_id)}
          >
            Ver conteúdos
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs h-8"
            onClick={() => onUnenroll(data.id)}
            disabled={isLoading}
          >
            Cancelar Inscrição
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function MyMonitoringClassPage() {
  const navigate = useNavigate()
  const { classId, lessons, subjectName, monitorName } =
    useLoaderData<MyMonitoringClassLoaderResult>()
  const { unenroll, isLoading } = useLessonEnrollment()
  const revalidator = useRevalidator()

  const sortedLessons = React.useMemo(() => {
    return [...lessons].sort(
      (a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
    )
  }, [lessons])

  const handleUnenroll = async (lessonId: number) => {
    try {
      await unenroll(lessonId)
      toast.success("Inscrição cancelada")
      revalidator.revalidate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao cancelar inscrição")
    }
  }

  const handleViewContent = (id: number) => {
    navigate(studentMaterial(id))
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <Button
        variant="ghost"
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-1 size-4" />
        Voltar às minhas monitorias
      </Button>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          {subjectName}
        </h1>
        {monitorName && (
          <p className="text-sm text-muted-foreground">Monitor: {monitorName}</p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          Turma {classId} — {lessons.length} aula{lessons.length !== 1 && "s"} inscrita
          {lessons.length !== 1 && "s"}
        </p>
      </div>

      {sortedLessons.length === 0 ? (
        <EmptyState
          title="Nenhuma aula inscrita"
          description="Você não está inscrito em nenhuma aula desta turma."
          icon={<BookOpen className="size-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              data={lesson}
              onViewContent={handleViewContent}
              onUnenroll={handleUnenroll}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  )
}
