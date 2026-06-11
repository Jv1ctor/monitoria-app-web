import * as React from "react"
import { Pencil, Trash2, MapPin} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const initialClasses = [
  { id: "1", discipline: "Programação Funcional", location: "C23", modality: "Presencial", days: "Terça e Quinta", time: "14:00-16:00" },
  { id: "2", discipline: "Estrutura de Dados", location: "D14", modality: "Presencial", days: "Sexta", time: "16:00-18:00" },
  { id: "3", discipline: "Grafos", location: "K11", modality: "Presencial", days: "Segunda e Quarta", time: "10:00-12:00" },
]

const availableDisciplines = [
   "Estrutura de Dados",
   "Programação Funcional",
   "Grafos"
]

export function AdminClassesPage() {
  const [classes, setClasses] = React.useState(initialClasses)

  const [disciplineInput, setDisciplineInput] = React.useState("")
  const [modalityInput, setModalityInput] = React.useState("")
  const [locationInput, setLocationInput] = React.useState("")
  const [capacityInput, setCapacityInput] = React.useState("")
  const [dayInput, setDayInput] = React.useState("")
  const [startTimeInput, setStartTimeInput] = React.useState("")
  const [endTimeInput, setEndTimeInput] = React.useState("")
  const [startDateInput, setStartDateInput] = React.useState("")
  const [endDateInput, setEndDateInput] = React.useState("")

  const [showErrors, setShowErrors] = React.useState(false)

  const handleRegister = () => {
    if (
      !disciplineInput ||
      !modalityInput ||
      !locationInput.trim() ||
      !dayInput.trim() ||
      !startTimeInput ||
      !endTimeInput
    ) {
      setShowErrors(true)
      return
    }

    const newClass = {
      id: crypto.randomUUID(),
      discipline: disciplineInput,
      location: locationInput,
      modality: modalityInput,
      days: dayInput, 
      time: `${startTimeInput}-${endTimeInput}`, 
      capacity: capacityInput,
      startDate: startDateInput,
      endDate: endDateInput
    }

    setClasses([...classes, newClass])

    setDisciplineInput("")
    setModalityInput("")
    setLocationInput("")
    setCapacityInput("")
    setDayInput("")
    setStartTimeInput("")
    setEndTimeInput("")
    setStartDateInput("")
    setEndDateInput("")
    setShowErrors(false)
  }

  const getErrorClass = (value: string) => {
    return showErrors && !value.trim()
      ? "border-red-500 focus-visible:ring-red-500"
      : "border-muted-foreground/20 focus-visible:ring-[#0047BA]"
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Turmas</h1>
        <p className="text-muted-foreground mt-1">
          Abra turmas de monitoria com horário, local e modalidade.
        </p>
      </div>

      <Card className="shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Nova Turma</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Disciplina <span className="text-red-500">*</span></label>
            <select
              value={disciplineInput}
              onChange={(e) => { setDisciplineInput(e.target.value); setShowErrors(false) }}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${getErrorClass(disciplineInput)}`}
            >
              <option value="" disabled>Selecione uma disciplina...</option>
              {availableDisciplines.map((disc, idx) => (
                <option key={idx} value={disc}>{disc}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Modalidade <span className="text-red-500">*</span></label>
            <select
              value={modalityInput}
              onChange={(e) => { setModalityInput(e.target.value); setShowErrors(false) }}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${getErrorClass(modalityInput)}`}
            >
              <option value="" disabled>Selecione...</option>
              <option value="Presencial">Presencial</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Local / Sala <span className="text-red-500">*</span></label>
            <Input
              placeholder="Digite o local da monitoria..."
              value={locationInput}
              onChange={(e) => { setLocationInput(e.target.value); setShowErrors(false) }}
              className={`bg-white transition-colors ${getErrorClass(locationInput)}`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Capacidade máxima</label>
            <Input
              type="number"
              placeholder="Digite a capacidade máxima..."
              value={capacityInput}
              onChange={(e) => setCapacityInput(e.target.value)}
              className="bg-white border-muted-foreground/20 focus-visible:ring-[#0047BA]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Dia da semana <span className="text-red-500">*</span></label>
            <Input
              placeholder="Digite o(s) dia(s) da monitoria..."
              value={dayInput}
              onChange={(e) => { setDayInput(e.target.value); setShowErrors(false) }}
              className={`bg-white transition-colors ${getErrorClass(dayInput)}`}
            />
          </div>
          <div className="hidden md:block"></div> 

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Horário de início <span className="text-red-500">*</span></label>
            <Input
              type="time"
              value={startTimeInput}
              onChange={(e) => { setStartTimeInput(e.target.value); setShowErrors(false) }}
              className={`bg-white transition-colors ${getErrorClass(startTimeInput)}`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Horário de término <span className="text-red-500">*</span></label>
            <Input
              type="time"
              value={endTimeInput}
              onChange={(e) => { setEndTimeInput(e.target.value); setShowErrors(false) }}
              className={`bg-white transition-colors ${getErrorClass(endTimeInput)}`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Data de início (semestre)</label>
            <Input
              type="date"
              value={startDateInput}
              onChange={(e) => setStartDateInput(e.target.value)}
              className="bg-white border-muted-foreground/20 focus-visible:ring-[#0047BA]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Data de término (semestre)</label>
            <Input
              type="date"
              value={endDateInput}
              onChange={(e) => setEndDateInput(e.target.value)}
              className="bg-white border-muted-foreground/20 focus-visible:ring-[#0047BA]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleRegister}
            className="bg-[#0047BA] hover:bg-[#003a99] text-white px-8"
          >
            Cadastrar
          </Button>
        </div>
      </Card>

      <div className="space-y-4 mt-4">
        <h2 className="text-lg font-bold text-foreground">Turmas Cadastradas</h2>
        
        <Card className="shadow-sm overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="border-b bg-slate-50/70">
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[25%]">Disciplina</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%]">Local</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%]">Modalidade</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[20%]">Dias</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%]">Horário</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%] text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-slate-50/40 transition-colors">
         
                    <td className="px-6 py-4 font-semibold text-foreground truncate">
                      {cls.discipline}
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-muted-foreground truncate">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-slate-400" />
                        <span>{cls.location}</span>
                    </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                        ${cls.modality === 'Presencial' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {cls.modality}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground truncate">
                      {cls.days}
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground truncate">
                      {cls.time}
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
                
                {classes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-muted-foreground">
                      Nenhuma turma cadastrada ainda.
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