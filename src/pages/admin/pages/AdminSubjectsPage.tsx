import * as React from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const initialSubjects = [
  { id: "1", code: "ECI010", name: "Cálculo I", course: "Engenharia Civil", monitorsCount: 2 },
  { id: "2", code: "ARQ020", name: "Ambiente e Conforto", course: "Arquitetura e Urbanismo", monitorsCount: 1 },
  { id: "3", code: "CC002", name: "Algoritmos", course: "Ciência da Computação", monitorsCount: 2 },
  { id: "4", code: "CC003", name: "Estrutura de Dados", course: "Ciência da Computação", monitorsCount: 1 },
]

const availableCourses = [
  { name: "Ciência da Computação", prefix: "CC" },
  { name: "Engenharia da Computação", prefix: "EC" },
  { name: "Análise e Desenvolvimento de Sistemas", prefix: "ADS" },
  { name: "Engenharia Elétrica", prefix: "EE" },
  { name: "Arquitetura e Urbanismo", prefix: "ARQ" },
  { name: "Engenharia Mecânica", prefix: "EM" },
  { name: "Engenharia de Produção", prefix: "EP" },
  { name: "Engenharia Civil", prefix: "ECI" }
]

export function AdminSubjectsPage() {
  const [subjects, setSubjects] = React.useState(initialSubjects)
  const [nameInput, setNameInput] = React.useState("")
  const [courseInput, setCourseInput] = React.useState("")
  const [showErrors, setShowErrors] = React.useState(false)

  const handleRegisterSubject = () => {
    if (!nameInput.trim() || !courseInput.trim()) {
      setShowErrors(true)
      return
    }

    const selectedCourseObj = availableCourses.find(
      (course) => course.name === courseInput
    )
    
    const coursePrefix = selectedCourseObj ? selectedCourseObj.prefix : "DISC"

    const finalCode = `${coursePrefix}-${Math.floor(100 + Math.random() * 900)}`

    const newSubject = {
      id: crypto.randomUUID(),
      code: finalCode,
      name: nameInput,
      course: courseInput,
      monitorsCount: 0,
    }

    setSubjects([...subjects, newSubject])
    setNameInput("")
    setCourseInput("")
    setShowErrors(false)
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Disciplinas</h1>
        <p className="text-muted-foreground mt-1">
          Crie e gerencie as disciplinas que recebem monitoria.
        </p>
      </div>

      <Card className="shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Nova Disciplina</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Nome da Disciplina <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Digite o nome da disciplina..."
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value)
                if (showErrors) setShowErrors(false)
              }}
              className={`bg-white transition-colors ${
                showErrors && !nameInput.trim()
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-muted-foreground/20 focus-visible:ring-[#0047BA]"
              }`}
            />
            {showErrors && !nameInput.trim() && (
              <span className="text-xs text-red-500">Este campo é obrigatório.</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Curso <span className="text-red-500">*</span>
            </label>
            <select
              value={courseInput}
              onChange={(e) => {
                setCourseInput(e.target.value)
                if (showErrors) setShowErrors(false)
              }}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                showErrors && !courseInput.trim()
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-muted-foreground/20 focus-visible:ring-[#0047BA]"
              }`}
            >
              <option value="" disabled>Selecione um curso...</option>
              {availableCourses.map((courseOption, index) => (
                <option key={index} value={courseOption.name}>
                  {courseOption.name}
                </option>
              ))}
            </select>
            {showErrors && !courseInput.trim() && (
              <span className="text-xs text-red-500">Selecione um curso.</span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleRegisterSubject}
            className="bg-[#0047BA] hover:bg-[#003a99] text-white px-8"
          >
            Cadastrar
          </Button>
        </div>
      </Card>

      <div className="space-y-4 mt-4">
        <h2 className="text-lg font-bold text-foreground">Disciplinas Cadastradas</h2>
        
        <Card className="shadow-sm overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="border-b bg-slate-50/70">
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%]">Código</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[30%]">Disciplina</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[25%]">Curso</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%] text-center">Monitores</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%] text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 text-sm text-muted-foreground font-medium truncate">
                      {subject.code}
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground truncate">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground truncate">
                      {subject.course}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <a href="#" className="font-semibold text-[#0047BA] hover:underline">
                        {subject.monitorsCount} monitores
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#0047BA] hover:bg-blue-50">
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {subjects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-muted-foreground">
                      Nenhuma disciplina cadastrada ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}