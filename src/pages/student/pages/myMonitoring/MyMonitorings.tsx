import * as React from "react"
import { useNavigate, useLoaderData } from "react-router"
import {
  ChevronLeft,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  CalendarDays,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/empty-state"
import { paths } from "@/routes/paths"
import type { MyMonitoringsLoaderResult } from "@/loaders/my-monitorings.loader"
import type { LessonResponseDto } from "@/types/lesson.type"

type ClassGroup = {
  classInfo: NonNullable<LessonResponseDto["class"]>
  lessons: LessonResponseDto[]
}

function MonitoringClassCard({
  group,
  onClick,
}: {
  group: ClassGroup
  onClick: () => void
}) {
  const subjectName = group.classInfo.subject?.name ?? "Monitoria"
  const monitorFullName = group.classInfo.monitor
    ? `${group.classInfo.monitor.first_name} ${group.classInfo.monitor.last_name}`
    : undefined
  const initials = subjectName.substring(0, 2).toUpperCase()

  const upcomingCount = React.useMemo(
    () => group.lessons.filter((l) => new Date(l.date_time) > new Date()).length,
    [group.lessons]
  )

  return (
    <Card
      className="shadow-sm border-border hover:border-[#0047BA]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
      onClick={onClick}
    >
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-3 items-center">
            <div className="size-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-base leading-tight">
                {subjectName}
              </span>
              {monitorFullName && (
                <span className="text-xs text-muted-foreground">
                  Monitor: {monitorFullName}
                </span>
              )}
            </div>
          </div>

          <div className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
            <CheckCircle2 className="size-3" />
            Inscrito
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6 flex-1">
          <div className="flex items-center gap-2">
            <Users className="size-4 shrink-0" />
            <span>Turma {group.classInfo.code}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            <span>
              {group.lessons.length} aula{group.lessons.length !== 1 && "s"}
              {upcomingCount > 0 && ` (${upcomingCount} próximas)`}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-2 flex items-center gap-2 text-sm font-medium text-[#0047BA] group-hover:underline">
          Ver aulas
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  )
}

export function MyMonitorings() {
  const navigate = useNavigate()
  const { lessons } = useLoaderData<MyMonitoringsLoaderResult>()

  const groups = React.useMemo(() => {
    const map = new Map<number, ClassGroup>()
    for (const lesson of lessons) {
      if (!lesson.class) continue
      const existing = map.get(lesson.class_id)
      if (existing) {
        existing.lessons.push(lesson)
      } else {
        map.set(lesson.class_id, {
          classInfo: lesson.class,
          lessons: [lesson],
        })
      }
    }
    return Array.from(map.values())
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
          Acompanhe as turmas em que você está inscrito.
        </p>
      </div>

      {groups.length === 0 ? (
        <EmptyState
          title="Nenhuma monitoria encontrada"
          description="Você ainda não está inscrito em nenhuma monitoria. Explore as monitorias disponíveis e inscreva-se."
          icon={<BookOpen className="size-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <MonitoringClassCard
              key={group.classInfo.id}
              group={group}
              onClick={() => navigate(`${paths.studentMyMonitorings}/${group.classInfo.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
