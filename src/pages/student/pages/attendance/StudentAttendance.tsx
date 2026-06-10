import * as React from "react"
import {
  CheckCircle2,
  XCircle,
  Calendar,
  BookOpen,
  User,
} from "lucide-react"
import { useLoaderData } from "react-router"
import { Card, CardContent } from "@/components/ui/card"
import type { StudentAttendanceLoaderResult } from "@/loaders/student-attendance.loader"

export function StudentAttendancePage() {
  const { me, frequencies, lessonsById } = useLoaderData<StudentAttendanceLoaderResult>()

  const totalSessions = frequencies.length
  const totalPresences = frequencies.filter(
    (a) => a.value === true,
  ).length
  const attendanceRate =
    totalSessions > 0 ? Math.round((totalPresences / totalSessions) * 100) : 0

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          Minhas Frequências
        </h1>
        <p className="text-muted-foreground">
          Histórico de presenças nas monitorias que você participou.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="shadow-sm border-t-4 border-t-slate-400">
          <CardContent className="p-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Sessões registradas
            </p>
            <h2 className="text-4xl font-bold text-slate-800">
              {totalSessions}
            </h2>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-green-500">
          <CardContent className="p-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Presenças
            </p>
            <h2 className="text-4xl font-bold text-green-600">
              {totalPresences}
            </h2>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-[#0047BA]">
          <CardContent className="p-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
              Taxa de presença
            </p>
            <h2 className="text-4xl font-bold text-[#0047BA]">
              {attendanceRate}%
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                  Data
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                  Horário
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                  Disciplina
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                  Status Registro
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {frequencies.map((item) => {
                const lesson = lessonsById[item.lesson_id]
                const dateObj = lesson ? new Date(lesson.date_time) : new Date(item.createdAt)
                const dateLabel = dateObj.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                const timeLabel = lesson ? lesson.date_time.slice(11, 16) : "--:--"
                const subjectName = lesson?.modality ?? `Aula #${item.lesson_id}`
                const isPresent = item.value === true
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3.5 text-slate-400" />
                        {dateLabel}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {timeLabel}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="size-3.5 text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">
                          {subjectName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <User className="size-3.5 text-slate-400" />
                        {item.status === "FINISHED" ? "Finalizado" : "Pendente"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end">
                        {isPresent ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 text-[11px] font-bold uppercase tracking-wide">
                            <CheckCircle2 className="size-3" />
                            Presente
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[11px] font-bold uppercase tracking-wide">
                            <XCircle className="size-3" />
                            Ausente
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
