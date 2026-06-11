import * as React from "react"
import { useLoaderData, useRevalidator } from "react-router"
import { Eye, Download, FileText, Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { SectionHeading } from "@/components/shared/SectionHeading"
import { EmptyState } from "@/components/shared/empty-state"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"

import {
  createDocumentUploadUrl,
  updateDocument,
  deleteDocument,
  getSignedDownloadAndPreview,
} from "@/services/document.service"
import { ApiError } from "@/lib/handle-request"
import { mapFieldErrors, mapApiFieldErrors } from "@/lib/zod-field-errors"
import {
  createDocumentSchema,
  updateDocumentSchema,
} from "@/schemas/monitor/document.schema"
import { formatData } from "@/lib/data-format.lib"
import type { MonitorMaterialsLoaderResult } from "@/loaders/monitor-materials.loader"

type CreateForm = {
  class_id: string
  description: string
  file: File | null
}

type EditForm = {
  description: string
}

export function MaterialsListPage() {
  const { classes, documentsByClass } =
    useLoaderData() as MonitorMaterialsLoaderResult
  const revalidator = useRevalidator()

  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<number | null>(null)
  const [createForm, setCreateForm] = React.useState<CreateForm>({
    class_id: "",
    description: "",
    file: null,
  })
  const [editForm, setEditForm] = React.useState<EditForm>({
    description: "",
  })
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [submitting, setSubmitting] = React.useState(false)
  const [loadingKey, setLoadingKey] = React.useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(
    null,
  )

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const onOpenCreate = (open: boolean) => {
    setIsCreateOpen(open)
    if (!open) {
      setCreateForm({ class_id: "", description: "", file: null })
      setFormErrors({})
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const onOpenEdit = (open: boolean) => {
    setIsEditOpen(open)
    if (!open) {
      setEditingId(null)
      setEditForm({ description: "" })
      setFormErrors({})
    }
  }

  const handleCreate = async () => {
    const parsed = createDocumentSchema.safeParse({
      class_id: createForm.class_id,
      description: createForm.description || undefined,
      file: createForm.file,
    })
    if (!parsed.success) {
      setFormErrors(mapFieldErrors(parsed.error))
      return
    }
    setFormErrors({})
    setSubmitting(true)
    try {
      const { upload_url } = await createDocumentUploadUrl({
        class_id: parsed.data.class_id,
        file_name: parsed.data.file.name,
        contentType: parsed.data.file.type,
        size: parsed.data.file.size,
        description: parsed.data.description ?? null,
      })
      const put = await fetch(upload_url, {
        method: "PUT",
        body: parsed.data.file,
        headers: { "Content-Type": parsed.data.file.type },
      })
      if (!put.ok) {
        throw new Error(`Upload falhou (HTTP ${put.status})`)
      }
      toast.success("Material enviado!")
      onOpenCreate(false)
      revalidator.revalidate()
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.fieldErrors.length) {
          setFormErrors(mapApiFieldErrors(e.fieldErrors))
        } else {
          toast.error(e.message)
        }
      } else if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error("Erro no upload")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const openEdit = (id: number, description: string | null) => {
    setEditingId(id)
    setEditForm({ description: description ?? "" })
    setFormErrors({})
    setIsEditOpen(true)
  }

  const handleEdit = async () => {
    if (editingId === null) return
    const parsed = updateDocumentSchema.safeParse(editForm)
    if (!parsed.success) {
      setFormErrors(mapFieldErrors(parsed.error))
      return
    }
    setFormErrors({})
    setSubmitting(true)
    try {
      await updateDocument(editingId, {
        description: parsed.data.description ?? null,
      })
      toast.success("Material atualizado!")
      onOpenEdit(false)
      revalidator.revalidate()
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.fieldErrors.length) {
          setFormErrors(mapApiFieldErrors(e.fieldErrors))
        } else {
          toast.error(e.message)
        }
      } else {
        toast.error("Erro ao atualizar")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (deleteTargetId === null) return
    try {
      await deleteDocument(deleteTargetId)
      toast.success("Material excluído!")
      revalidator.revalidate()
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : "Erro ao excluir"
      toast.error(msg)
    } finally {
      setDeleteOpen(false)
    }
  }

  const renderTable = (classId: number) => {
    const docs = documentsByClass[classId] ?? []
    if (docs.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={4}
            className="h-16 text-center text-muted-foreground"
          >
            Nenhum material nesta turma.
          </TableCell>
        </TableRow>
      )
    }
    return docs.map((d) => (
      <TableRow key={d.id}>
        <TableCell className="font-medium">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FileText className="size-4" />
            </div>
            <span className="text-sm font-bold">
              {d.description || d.filename}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <span className="text-[10px] font-bold bg-muted text-muted-foreground px-2 py-1 rounded uppercase">
            {d.mime_type.split("/").pop()}
          </span>
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          {formatData(d.createdAt)}
        </TableCell>
        <TableCell className="text-right pr-6">
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={loadingKey === d.key}
              onClick={async () => {
                setLoadingKey(d.key)
                try {
                  const { preview_url } = await getSignedDownloadAndPreview(
                    d.key,
                  )
                  window.open(preview_url, "_blank")
                } catch (e) {
                  toast.error("Erro ao gerar visualização")
                  console.error(e)
                } finally {
                  setLoadingKey(null)
                }
              }}
              title="Visualizar"
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={loadingKey === d.key}
              onClick={async () => {
                setLoadingKey(d.key)
                try {
                  const { download_url } = await getSignedDownloadAndPreview(
                    d.key,
                  )
                  window.open(download_url, "_blank")
                } catch (e) {
                  toast.error("Erro ao baixar")
                  console.error(e)
                } finally {
                  setLoadingKey(null)
                }
              }}
              title="Baixar"
            >
              <Download className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => openEdit(d.id, d.description)}
              title="Editar descrição"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              onClick={() => {
                setDeleteTargetId(d.id)
                setDeleteOpen(true)
              }}
              title="Excluir"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Materiais</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publique apostilas, listas e slides por turma.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={onOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-[#0047BA] hover:bg-[#003a99] text-white">
              <Plus className="mr-2 size-4" />
              Publicar Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="mb-2">
              <DialogTitle>Publicar Material</DialogTitle>
              <DialogDescription>
                Selecione a turma, anexe o arquivo (.pdf, .docx, .pptx, máx
                20MB).
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreate()
              }}
            >
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel>Turma</FieldLabel>
                  <Select
                    value={createForm.class_id}
                    onValueChange={(v) =>
                      setCreateForm({ ...createForm, class_id: v })
                    }
                  >
                    <SelectTrigger
                      className={
                        formErrors.class_id ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.class_id && (
                    <FieldError errors={[{ message: formErrors.class_id }]} />
                  )}
                </Field>
                <Field>
                  <FieldLabel>Descrição (opcional)</FieldLabel>
                  <Input
                    value={createForm.description}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Ex: Lista 01 — Limites"
                  />
                  {formErrors.description && (
                    <FieldError
                      errors={[{ message: formErrors.description }]}
                    />
                  )}
                </Field>
                <Field>
                  <FieldLabel>Arquivo</FieldLabel>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        file: e.target.files?.[0] ?? null,
                      })
                    }
                    className={`cursor-pointer ${formErrors.file ? "border-destructive" : ""}`}
                  />
                  {formErrors.file && (
                    <FieldError errors={[{ message: formErrors.file }]} />
                  )}
                </Field>
                <div className="flex justify-end gap-3 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenCreate(false)}
                    disabled={submitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#0047BA] hover:bg-[#003a99]"
                    disabled={submitting}
                  >
                    {submitting ? "Enviando..." : "Salvar"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {classes.length === 0 ? (
        <EmptyState
          title="Nenhuma turma vinculada"
          description="Você ainda não tem turmas atribuídas."
        />
      ) : (
        <div className="space-y-8">
          {classes.map((c) => (
            <section key={c.id}>
              <SectionHeading
                title={c.code}
                meta={`${(documentsByClass[c.id] ?? []).length} material(is)`}
              />
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Descrição / Arquivo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Publicado</TableHead>
                    <TableHead className="text-right pr-6">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{renderTable(c.id)}</TableBody>
              </Table>
            </section>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Excluir este material?"
        description="Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />

      <Dialog open={isEditOpen} onOpenChange={onOpenEdit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="mb-2">
            <DialogTitle>Editar Material</DialogTitle>
            <DialogDescription>
              Altere a descrição do material selecionado.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleEdit()
            }}
          >
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel>Descrição</FieldLabel>
                <Input
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                {formErrors.description && (
                  <FieldError errors={[{ message: formErrors.description }]} />
                )}
              </Field>
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenEdit(false)}
                  disabled={submitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#0047BA] hover:bg-[#003a99]"
                  disabled={submitting}
                >
                  {submitting ? "Salvando..." : "Atualizar"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
