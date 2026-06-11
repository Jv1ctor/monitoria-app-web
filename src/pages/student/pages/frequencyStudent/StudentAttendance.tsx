import * as React from "react"
import { CheckCircle2, XCircle, Calendar, Clock, BookOpen, User } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { WelcomeHeader } from "@/components/shared/WelcomeHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatGrid } from "@/components/shared/StatGrid"

const attendanceData = [
  { id: "1", date: "25/05/2026", time: "14:00", subject: "Projeto e Arquitetura de Sistemas", monitor: "Bonifácio Martins", status: "Ausente" },
  { id: "2", date: "27/05/2026", time: "14:00", subject: "Projeto e Arquitetura de Sistemas", monitor: "Bonifácio Martins", status: "Presente" },
  { id: "3", date: "30/05/2026", time: "16:00", subject: "Matemática Discreta", monitor: "Sarah Mendes", status: "Ausente" },
  { id: "4", date: "06/06/2026", time: "18:00", subject: "Ambiente de Dados", monitor: "Gustavo Nunes", status: "Ausente" },
]

export function StudentAttendancePage() {
  const [attendances] = React.useState(attendanceData);

  const totalSessions = attendances.length;
  const totalPresences = attendances.filter(a => a.status === "Presente").length;
  const attendanceRate = totalSessions > 0 ? Math.round((totalPresences / totalSessions) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 w-full space-y-10">
      <WelcomeHeader
        title="Minhas Frequências"
        subtitle="Histórico de presenças nas monitorias que você participou."
      />

      <StatGrid className="sm:grid-cols-3 lg:grid-cols-3">
        <StatCard
          className="border-t-4 border-t-slate-400"
          label="Sessões registradas"
          value={totalSessions}
        />
        <StatCard
          className="border-t-4 border-t-green-500"
          label="Presenças"
          value={<span className="text-green-600">{totalPresences}</span>}
        />
        <StatCard
          className="border-t-4 border-t-primary"
          label="Taxa de presença"
          value={<span className="text-primary">{attendanceRate}%</span>}
        />
      </StatGrid>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Disciplina</TableHead>
            <TableHead>Monitor</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendances.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  {item.date}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-muted-foreground" />
                  {item.time}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <BookOpen className="size-3.5 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">{item.subject}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="size-3.5 text-muted-foreground" />
                  {item.monitor}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  {item.status === "Presente" ? (
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}