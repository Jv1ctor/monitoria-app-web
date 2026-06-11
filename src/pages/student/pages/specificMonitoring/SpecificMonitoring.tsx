import * as React from "react"
import {
  ChevronLeft,
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { useNavigate, useParams, useRevalidator } from "react-router"
import { useLoaderData } from "react-router"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { studentMaterial } from "@/routes/paths"
import { useLessonEnrollment } from "@/hooks/use-lesson-enrollment.hook"
import type { SpecificMonitoringLoaderResult } from "@/loaders/specific-monitoring.loader"
import type { LessonResponseDto } from "@/types/lesson.type"

interface MonitorCardProps {
  data: LessonResponseDto
  isEnrolled?: boolean
  onViewContent: (id: number) => void
  onEnroll: (id: number) => void
  onUnenroll: (id: number) => void
}

function MonitorCard({
  data,
  isEnrolled = false,
  onViewContent,
  onEnroll,
  onUnenroll,
}: MonitorCardProps) {
  const dateObj = new Date(data.date_time)
  const dateLabel = dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const timeLabel = dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className="shadow-sm border-border">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-3 items-center">
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-xl">
                {data.description ?? "Sem descrição"}
              </span>
              <span className="text-xs text-muted-foreground">
                {data.class?.monitor
                  ? `Monitor: ${data.class.monitor.first_name} ${data.class.monitor.last_name}`
                  : "Monitor não atribuído"}
              </span>
            </div>
          </div>

          {isEnrolled && (
            <div className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
              <CheckCircle2 className="size-3" />
              Inscrito
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6 flex-1">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span>{timeLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">{data.modality}</span>
          </div>
        </div>

        <div className="mt-auto pt-2 flex flex-col gap-2">
          {isEnrolled ? (
            <>
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
              >
                Cancelar Inscrição
              </Button>
            </>
          ) : (
            <Button
              className="w-full bg-[#0047BA] hover:bg-[#003a99] text-white"
              onClick={() => onEnroll(data.id)}
            >
              Inscrever-se
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function SpecificMonitoringPage() {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const { lessons, enrolledLessonIds } =
    useLoaderData<SpecificMonitoringLoaderResult>()
  const { enroll, unenroll } = useLessonEnrollment()
  const revalidator = useRevalidator()

  const enrolled = React.useMemo(
    () => lessons.filter((l) => enrolledLessonIds.includes(l.id)),
    [lessons, enrolledLessonIds],
  )

  const available = React.useMemo(
    () => lessons.filter((l) => !enrolledLessonIds.includes(l.id)),
    [lessons, enrolledLessonIds],
  )

  const handleEnroll = async (id: number) => {
    try {
      await enroll(id)
      toast.success("Inscrição realizada")
      revalidator.revalidate()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao realizar inscrição",
      )
    }
  }

  const handleUnenroll = async (id: number) => {
    try {
      await unenroll(id)
      toast.success("Inscrição cancelada")
      revalidator.revalidate()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao cancelar inscrição",
      )
    }
  }

  const handleViewContent = (id: number) => {
    navigate(studentMaterial(id))
  }

  const subjectTitle = params.id ? `Turma ${params.id}` : "Disciplina"

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <Button
        variant="ghost"
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-1 size-4" />
        Voltar à busca
      </Button>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          Monitores de {subjectTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe as monitorias em que você está inscrito ou escolha uma nova
          para participar.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-foreground">
              Monitorias Inscritas
            </h2>
            <span className="text-sm text-muted-foreground">
              ({enrolled.length})
            </span>
          </div>

          {enrolled.length === 0 ? (
            <div className="py-8 text-sm text-muted-foreground border border-dashed rounded-lg text-center">
              Você ainda não está inscrito em nenhuma monitoria desta
              disciplina.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolled.map((monitoring) => (
                <MonitorCard
                  key={monitoring.id}
                  data={monitoring}
                  isEnrolled={true}
                  onViewContent={handleViewContent}
                  onEnroll={handleEnroll}
                  onUnenroll={handleUnenroll}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-foreground">
              Monitorias Disponíveis
            </h2>
            <span className="text-sm text-muted-foreground">
              ({available.length})
            </span>
          </div>

          {available.length === 0 ? (
            <div className="py-8 text-sm text-muted-foreground border border-dashed rounded-lg text-center">
              Não há mais monitorias disponíveis para esta disciplina no
              momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {available.map((monitoring) => (
                <MonitorCard
                  key={monitoring.id}
                  data={monitoring}
                  isEnrolled={false}
                  onViewContent={handleViewContent}
                  onEnroll={handleEnroll}
                  onUnenroll={handleUnenroll}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
