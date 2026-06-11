import * as React from "react"
import { Pencil, Trash2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DialogComponent from "@/components/shared/DialogComponent"
import EditSubjectFormModal from "../components/EditSubjectFormModal"
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "@/services/subject.service"
import { getMajors, type Major } from "@/services/major.service"
import { ApiError } from "@/lib/handle-request"
import type { SubjectResponseDto } from "@/types/subject.type"

export function AdminSubjectsPage() {
  const [subjects, setSubjects] = React.useState<SubjectResponseDto[]>([])
  const [majors, setMajors] = React.useState<Major[]>([])

  const [nameInput, setNameInput] = React.useState("")
  const [majorInput, setMajorInput] = React.useState("")
  const [showErrors, setShowErrors] = React.useState(false)

  const [editing, setEditing] = React.useState<SubjectResponseDto | null>(null)
  const [deleting, setDeleting] = React.useState<SubjectResponseDto | null>(null)

  React.useEffect(() => {
    getSubjects()
      .then(setSubjects)
      .catch((error) => {
        const message =
          error instanceof ApiError ? error.message : "Erro ao carregar disciplinas."
        toast.error(message)
      })
    getMajors()
      .then(setMajors)
      .catch(() => {
        /* lista de cursos é opcional para a tela carregar */
      })
  }, [])

  const majorName = (majorId: number) => {
    const major = majors.find((m) => Number(m.id) === majorId)
    return major?.name ?? "—"
  }

  const handleRegisterSubject = async () => {
    if (!nameInput.trim() || !majorInput.trim()) {
      setShowErrors(true)
      return
    }

    const selectedMajor = majors.find((m) => String(m.id) === majorInput)
    const prefix = selectedMajor?.code ?? selectedMajor?.name.slice(0, 3).toUpperCase() ?? "DISC"
    const generatedCode = `${prefix}-${Math.floor(100 + Math.random() * 900)}`

    try {
      const created = await createSubject({
        code: generatedCode,
        name: nameInput.trim(),
        major_id: Number(majorInput),
      })
      setSubjects((prev) => [...prev, created])
      setNameInput("")
      setMajorInput("")
      setShowErrors(false)
      toast.success("Disciplina cadastrada com sucesso!")
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Erro ao cadastrar disciplina."
      toast.error(message)
    }
  }

  const handleUpdateSubject = async (values: {
    code: string
    name: string
    major_id: number
  }) => {
    if (!editing) return
    try {
      const updated = await updateSubject(editing.id, values)
      setSubjects((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      )
      setEditing(null)
      toast.success("Disciplina atualizada com sucesso!")
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Erro ao atualizar disciplina."
      toast.error(message)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleting) return
    try {
      await deleteSubject(deleting.id)
      setSubjects((prev) => prev.filter((s) => s.id !== deleting.id))
      toast.success("Disciplina removida com sucesso!")
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Erro ao remover disciplina."
      toast.error(message)
    } finally {
      setDeleting(null)
    }
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
              value={majorInput}
              onChange={(e) => {
                setMajorInput(e.target.value)
                if (showErrors) setShowErrors(false)
              }}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                showErrors && !majorInput.trim()
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-muted-foreground/20 focus-visible:ring-[#0047BA]"
              }`}
            >
              <option value="" disabled>Selecione um curso...</option>
              {majors.map((major) => (
                <option key={major.id} value={String(major.id)}>
                  {major.name}
                </option>
              ))}
            </select>
            {showErrors && !majorInput.trim() && (
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
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[20%]">Código</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[35%]">Disciplina</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[30%]">Curso</th>
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
                      {majorName(subject.major_id)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditing(subject)}
                          className="h-8 w-8 text-slate-400 hover:text-[#0047BA] hover:bg-blue-50"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleting(subject)}
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {subjects.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-muted-foreground">
                      Nenhuma disciplina cadastrada ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <EditSubjectFormModal
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        subject={editing}
        majors={majors}
        onSubmit={handleUpdateSubject}
      />

      <DialogComponent
        title="Remover disciplina"
        description={
          deleting
            ? `Tem certeza que deseja remover "${deleting.name}"? Esta ação não pode ser desfeita.`
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
