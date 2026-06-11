import * as React from "react"
import { Pencil, Trash2, Search, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DialogComponent from "@/components/shared/DialogComponent"
import EditMonitorFormModal from "../components/EditMonitorFormModal"

type Monitor = {
  id: string
  name: string
  course: string
  mat: string
  class: string
  email: string
}

const initialMonitors: Monitor[] = [
  { id: "1", name: "Renata Gonçalves", course: "Ciência da Computação", mat: "2422333", class: "Matemática Discreta", email: "renata@edu.unifor.br" },
  { id: "2", name: "Laura Silva", course: "Engenharia da Computação", mat: "2422434", class: "Construção e Análise de Algoritmos", email: "laura@edu.unifor.br" },
  { id: "3", name: "Maurício Mendes", course: "Arquitetura e Urbanismo", mat: "2422443", class: "Desenho Técnico", email: "mauricio@edu.unifor.br" },
]

const availableClasses = [
  "Cálculo I — Ter/Qui 14:00",
  "Programação I — Seg/Qua 10:00",
  "Física II — Sex 16:00"
]

export function AdminMonitorsPage() {
  const [monitors, setMonitors] = React.useState<Monitor[]>(initialMonitors)

  const [classInput, setClassInput] = React.useState("")
  const [matInput, setMatInput] = React.useState("")
  const [showErrors, setShowErrors] = React.useState(false)

  const [editing, setEditing] = React.useState<Monitor | null>(null)
  const [deleting, setDeleting] = React.useState<Monitor | null>(null)

  const classOptions = availableClasses.map((cls) => ({ value: cls, label: cls }))

  const handleUpdateMonitor = (values: { class: string; email: string }) => {
    if (!editing) return
    setMonitors((prev) =>
      prev.map((m) =>
        m.id === editing.id ? { ...m, class: values.class, email: values.email } : m
      )
    )
    setEditing(null)
  }

  const handleConfirmDelete = () => {
    if (!deleting) return
    setMonitors((prev) => prev.filter((m) => m.id !== deleting.id))
    setDeleting(null)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const handleLinkMonitor = () => {
    if (!classInput || !matInput.trim()) {
      setShowErrors(true)
      return
    }

    const newMonitor = {
      id: crypto.randomUUID(),
      name: "Novo Monitor", 
      course: "Eng. Software",
      mat: matInput,
      class: classInput,
      email: "monitor@edu.unifor.br"
    }
    setMonitors([...monitors, newMonitor])
    
    setClassInput("")
    setMatInput("")
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
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Monitores</h1>
        <p className="text-muted-foreground mt-1">
          Cadastre e gerencie monitores do programa. O vínculo busca o aluno pela matrícula.
        </p>
      </div>

      <Card className="shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Novo Monitor</h2>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-foreground">Turma responsável <span className="text-red-500">*</span></label>
            <select
              value={classInput}
              onChange={(e) => { setClassInput(e.target.value); setShowErrors(false) }}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${getErrorClass(classInput)}`}
            >
              <option value="" disabled>Selecione a turma...</option>
              {availableClasses.map((cls, idx) => (
                <option key={idx} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-foreground">Matrícula do aluno <span className="text-red-500">*</span></label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Digite a matrícula do aluno monitor..."
                value={matInput}
                onChange={(e) => { setMatInput(e.target.value); setShowErrors(false) }}
                className={`pl-9 bg-white transition-colors ${getErrorClass(matInput)}`}
              />
            </div>
          </div>

          <Button 
            onClick={handleLinkMonitor}
            className="bg-[#0047BA] hover:bg-[#003a99] text-white px-8"
          >
            <Check className="size-4 mr-2" />
            Vincular como Monitor
          </Button>
        </div>
      </Card>

      <div className="space-y-4 mt-4">
        <h2 className="text-lg font-bold text-foreground">Monitores Cadastrados</h2>
        
        <Card className="shadow-sm overflow-hidden border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50/70">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Matrícula</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Turma</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">E-mail</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {monitors.map((mon) => (
                <tr key={mon.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#0047BA] text-white flex items-center justify-center font-bold text-sm">
                        {getInitials(mon.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{mon.name}</p>
                        <p className="text-xs text-muted-foreground">{mon.course}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">{mon.mat}</td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {mon.class}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">{mon.email}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditing(mon)}
                        className="h-8 w-8 text-slate-400 hover:text-[#0047BA] hover:bg-blue-50"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(mon)}
                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <EditMonitorFormModal
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        monitor={editing}
        classes={classOptions}
        onSubmit={handleUpdateMonitor}
      />

      <DialogComponent
        title="Remover monitor"
        description={
          deleting
            ? `Tem certeza que deseja remover "${deleting.name}" da monitoria? Esta ação não pode ser desfeita.`
            : ""
        }
        isOpen={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        icon={<AlertTriangle />}
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleting(null)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Remover
          </Button>
        </div>
      </DialogComponent>
    </div>
  )
}