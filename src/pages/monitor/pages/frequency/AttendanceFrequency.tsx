import * as React from "react"
import { Check, Plus, Save, Users, UserCheck, UserMinus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { WelcomeHeader } from "@/components/shared/WelcomeHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatGrid } from "@/components/shared/StatGrid"
import { Avatar } from "@/components/shared/Avatar"

const initialStudents = [
  { id: "1", name: "Breno Sampaio", registration: "2422074", isPresent: false },
  { id: "2", name: "Gabriel Oliveira", registration: "2419441", isPresent: false },
  { id: "3", name: "João Victor", registration: "2422076", isPresent: false },
  { id: "4", name: "Lara Cruz", registration: "2422079", isPresent: false },

]

const sessionContext = {
  subject: "Desenvolvimento Web",
  date: "11/06/2026",
  time: "14:00",
  room: "Sala K11"
}

export function AttendanceFrequencyPage() {
  const [students, setStudents] = React.useState(initialStudents)

  const totalInscribed = students.length
  const totalPresent = students.filter(s => s.isPresent).length
  const totalAbsent = totalInscribed - totalPresent

  const togglePresence = (id: string) => {
    setStudents(current =>
      current.map(student =>
        student.id === id ? { ...student, isPresent: !student.isPresent } : student
      )
    )
  }

  const handleSave = () => {
    toast.success("Frequência salva com sucesso!")
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <WelcomeHeader
          title="Registrar Frequência"
          subtitle={`${sessionContext.subject} · ${sessionContext.date} · ${sessionContext.time} · ${sessionContext.room}`}
        />
        <Button onClick={handleSave} className="gap-2 px-6">
          <Save className="size-4" />
          Salvar Frequência
        </Button>
      </div>

      <StatGrid className="sm:grid-cols-3 lg:grid-cols-3">
        <StatCard
          className="border-l-4 border-l-slate-400"
          icon={<Users className="size-5" />}
          label="Alunos inscritos"
          value={totalInscribed}
        />
        <StatCard
          className="border-l-4 border-l-green-500"
          icon={<UserCheck className="size-5" />}
          label="Marcados como presentes"
          value={<span className="text-green-600">{totalPresent}</span>}
        />
        <StatCard
          className="border-l-4 border-l-red-500"
          icon={<UserMinus className="size-5" />}
          label="Ausentes"
          value={<span className="text-red-600">{totalAbsent}</span>}
        />
      </StatGrid>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead className="w-32">Matrícula</TableHead>
            <TableHead className="text-right">Presença</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const parts = student.name.split(" ")
            return (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={{ firstName: parts[0], lastName: parts[parts.length - 1] }} />
                    <span className="font-medium text-foreground">{student.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {student.registration}
                </TableCell>
                <TableCell className="text-right">
                  {student.isPresent ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePresence(student.id)}
                      className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 gap-1.5 font-bold w-24"
                    >
                      <Check className="size-3.5" />
                      Presente
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePresence(student.id)}
                      className="text-muted-foreground hover:text-foreground gap-1.5 w-24"
                    >
                      <Plus className="size-3.5" />
                      Marcar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}