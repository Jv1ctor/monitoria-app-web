import * as React from "react"
import { Check, Plus, Save, Users, UserCheck, UserMinus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Registrar Frequência</h1>
          <p className="text-muted-foreground mt-1">
            {sessionContext.subject} - {sessionContext.date} - {sessionContext.time} - {sessionContext.room}
          </p>
        </div>
        <Button onClick={handleSave} className="bg-[#0047BA] hover:bg-[#003a99] text-white gap-2 px-6">
          <Save className="size-4" />
          Salvar Frequência
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-slate-400">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase">Alunos inscritos</p>
              <h2 className="text-3xl font-bold">{totalInscribed}</h2>
            </div>
            <Users className="size-8 text-slate-300" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase">Marcados como presentes</p>
              <h2 className="text-3xl font-bold text-green-600">{totalPresent}</h2>
            </div>
            <UserCheck className="size-8 text-green-200" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase">Ausentes</p>
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
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Aluno</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-32">Matrícula</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Presença</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-[#0047BA] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {getInitials(student.name)}
                      </div>
                      <span className="font-medium text-foreground">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {student.registration}
                  </td>
                  <td className="px-6 py-4 text-right w-36">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}