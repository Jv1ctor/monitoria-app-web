import * as React from "react"
import { useLoaderData } from "react-router"
import { Check, Plus, Users, UserCheck, UserMinus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { updateFrequencyValue } from "@/services/frequencys.service"
import { ApiError } from "@/lib/handle-request"
import { formatData, formatHora } from "@/lib/data-format.lib"
import type { MonitorAttendanceLoaderResult } from "@/loaders/monitor-attendance.loader"
import type { FrequencysResponseDto } from "@/types/frequencys.type"

type Row = FrequencysResponseDto & { pending?: boolean }

export function AttendanceFrequencyPage() {
  const { lesson, frequencies } =
    useLoaderData() as MonitorAttendanceLoaderResult

  const [rows, setRows] = React.useState<Row[]>(frequencies)
  React.useEffect(() => {
    setRows(frequencies)
  }, [frequencies])

  const totalInscribed = rows.length
  const totalPresent = rows.filter((s) => s.value === true).length
  const totalAbsent = totalInscribed - totalPresent

  const togglePresence = async (id: number, next: boolean) => {
    const previous = rows.find((r) => r.id === id)
    setRows((current) =>
      current.map((row) =>
        row.id === id ? { ...row, value: next, pending: true } : row,
      ),
    )
    try {
      await updateFrequencyValue(id, next)
      setRows((current) =>
        current.map((row) =>
          row.id === id ? { ...row, value: next, pending: false } : row,
        ),
      )
    } catch (e) {
      setRows((current) =>
        current.map((row) =>
          row.id === id
            ? { ...row, value: previous?.value ?? false, pending: false }
            : row,
        ),
      )
      const msg = e instanceof ApiError ? e.message : "Erro ao salvar"
      toast.error(msg)
    }
  }

  const getInitials = (label: string) => {
    return label
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Registrar Frequência
          </h1>
          <p className="text-muted-foreground mt-1">
            {lesson.class?.code ?? `Turma ${lesson.class_id}`} -{" "}
            {formatData(lesson.date_time)} - {formatHora(lesson.date_time)} -{" "}
            {lesson.modality === "REMOTE" ? "Remota" : "Presencial"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-slate-400">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase">
                Alunos inscritos
              </p>
              <h2 className="text-3xl font-bold">{totalInscribed}</h2>
            </div>
            <Users className="size-8 text-slate-300" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase">
                Marcados como presentes
              </p>
              <h2 className="text-3xl font-bold text-green-600">
                {totalPresent}
              </h2>
            </div>
            <UserCheck className="size-8 text-green-200" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase">
                Ausentes
              </p>
              <h2 className="text-3xl font-bold text-red-600">{totalAbsent}</h2>
            </div>
            <UserMinus className="size-8 text-red-200" />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Aluno
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-32">
                  Identificação
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">
                  Presença
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => {
                const name = row.student
                  ? `${row.student.first_name} ${row.student.last_name}`
                  : `ID: ${row.student_id}`
                return (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-[#0047BA] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {getInitials(name)}
                        </div>
                        <span className="font-medium text-foreground">
                          {name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {row.student?.registration ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-right w-36">
                      {row.value === true ? (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={row.pending === true}
                          onClick={() => togglePresence(row.id, false)}
                          className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 gap-1.5 font-bold w-24"
                        >
                          <Check className="size-3.5" />
                          Presente
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={row.pending === true}
                          onClick={() => togglePresence(row.id, true)}
                          className="text-muted-foreground hover:text-foreground gap-1.5 w-24"
                        >
                          <Plus className="size-3.5" />
                          Marcar
                        </Button>
                      )}
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
