import * as React from "react"
import { Pencil, Trash2, AlertTriangle, Info } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DialogComponent from "@/components/shared/DialogComponent"
import EditClassroomFormModal from "../components/EditClassroomFormModal"
import { getClasses, updateClass, deleteClass } from "@/services/class.service"
import { getSubjects } from "@/services/subject.service"
import { ApiError } from "@/lib/handle-request"
import type { ClassResponseDto } from "@/types/class.type"
import type { SubjectResponseDto } from "@/types/subject.type"

export function AdminClassesPage() {
  const [classes, setClasses] = React.useState<ClassResponseDto[]>([])
  const [subjects, setSubjects] = React.useState<SubjectResponseDto[]>([])

  const [editing, setEditing] = React.useState<ClassResponseDto | null>(null)
  const [deleting, setDeleting] = React.useState<ClassResponseDto | null>(null)

  React.useEffect(() => {
    getClasses()
      .then(setClasses)
      .catch((error) => {
        const message =
          error instanceof ApiError ? error.message : "Erro ao carregar turmas."
        toast.error(message)
      })
    getSubjects()
      .then(setSubjects)
      .catch(() => {
        /* lista de disciplinas é opcional para a tela carregar */
      })
  }, [])

  const subjectName = (cls: ClassResponseDto) => {
    if (cls.subject) return cls.subject.name
    return subjects.find((s) => s.id === cls.subject_id)?.name ?? `#${cls.subject_id}`
  }

  const monitorName = (cls: ClassResponseDto) =>
    cls.monitor ? `${cls.monitor.first_name} ${cls.monitor.last_name}` : "—"

  const handleUpdateClass = async (values: {
    code: string
    subject_id: number
  }) => {
    if (!editing) return
    try {
      const updated = await updateClass(editing.id, values)
      setClasses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
      setEditing(null)
      toast.success("Turma atualizada com sucesso!")
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Erro ao atualizar turma."
      toast.error(message)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleting) return
    try {
      await deleteClass(deleting.id)
      setClasses((prev) => prev.filter((c) => c.id !== deleting.id))
      toast.success("Turma removida com sucesso!")
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Erro ao remover turma."
      toast.error(message)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Turmas</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as turmas de monitoria: disciplina, código e monitor responsável.
        </p>
      </div>

      <Card className="shadow-sm border border-amber-100 bg-amber-50/50 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 shrink-0 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800">
            O cadastro de novas turmas exige a atribuição de um monitor. Assim que o
            backend expor a listagem de monitores, o formulário de criação será
            reativado. Por ora, é possível editar e remover turmas existentes.
          </p>
        </div>
      </Card>

      <div className="space-y-4 mt-4">
        <h2 className="text-lg font-bold text-foreground">Turmas Cadastradas</h2>

        <Card className="shadow-sm overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="border-b bg-slate-50/70">
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[35%]">Disciplina</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[20%]">Código</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[30%]">Monitor</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%] text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground truncate">
                      {subjectName(cls)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground truncate">
                      {cls.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground truncate">
                      {monitorName(cls)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditing(cls)}
                          className="h-8 w-8 text-slate-400 hover:text-[#0047BA] hover:bg-blue-50"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleting(cls)}
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {classes.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-muted-foreground">
                      Nenhuma turma cadastrada ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <EditClassroomFormModal
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        classroom={editing}
        subjects={subjects}
        onSubmit={handleUpdateClass}
      />

      <DialogComponent
        title="Remover turma"
        description={
          deleting
            ? `Tem certeza que deseja remover a turma "${deleting.code}"? Esta ação não pode ser desfeita.`
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
