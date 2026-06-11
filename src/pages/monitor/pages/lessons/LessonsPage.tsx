import * as React from "react";
import { useLoaderData, useRevalidator } from "react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

import {
  createLesson,
  updateLesson,
  deleteLesson,
} from "@/services/lesson.service";
import { ApiError } from "@/lib/handle-request";
import { mapFieldErrors, mapApiFieldErrors } from "@/lib/zod-field-errors";
import { createLessonSchema } from "@/schemas/monitor/lesson.schema";
import { formatData, formatHora } from "@/lib/data-format.lib";
import type { MonitorLessonsLoaderResult } from "@/loaders/monitor-lessons.loader";

type FormState = {
  class_id: string;
  modality: "REMOTE" | "INPERSON";
  date_time: string;
  description: string;
};

const EMPTY_FORM: FormState = {
  class_id: "",
  modality: "REMOTE",
  date_time: "",
  description: "",
};

export function LessonsPage() {
  const { classes, lessons } =
    useLoaderData() as MonitorLessonsLoaderResult;
  const revalidator = useRevalidator();

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>(
    {},
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(
    null,
  );

  const onOpenCreate = (open: boolean) => {
    setIsCreateOpen(open);
    if (!open) {
      setForm(EMPTY_FORM);
      setFormErrors({});
    }
  };

  const onOpenEdit = (open: boolean) => {
    setIsEditOpen(open);
    if (!open) {
      setForm(EMPTY_FORM);
      setFormErrors({});
      setEditingId(null);
    }
  };

  const openEdit = (lessonId: number) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    setEditingId(lessonId);
    setForm({
      class_id: String(lesson.class_id),
      modality: lesson.modality as "REMOTE" | "INPERSON",
      date_time: new Date(lesson.date_time).toISOString().slice(0, 16),
      description: lesson.description ?? "",
    });
    setFormErrors({});
    setIsEditOpen(true);
  };

  const submit = async (mode: "create" | "edit") => {
    const parsed = createLessonSchema.safeParse(form);
    if (!parsed.success) {
      setFormErrors(mapFieldErrors(parsed.error));
      return;
    }
    setFormErrors({});
    setSubmitting(true);
    try {
      if (mode === "create") {
        await createLesson({
          class_id: parsed.data.class_id,
          modality: parsed.data.modality,
          date_time: new Date(parsed.data.date_time).toISOString(),
          description: parsed.data.description,
        });
        toast.success("Aula criada com sucesso!");
        onOpenCreate(false);
      } else if (editingId !== null) {
        await updateLesson(editingId, {
          modality: parsed.data.modality,
          date_time: new Date(parsed.data.date_time).toISOString(),
          description: parsed.data.description,
        });
        toast.success("Aula atualizada!");
        onOpenEdit(false);
      }
      revalidator.revalidate();
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.fieldErrors.length) {
          setFormErrors(mapApiFieldErrors(e.fieldErrors));
        } else {
          toast.error(e.message || "Erro ao salvar");
        }
      } else {
        toast.error("Erro inesperado");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async () => {
    if (deleteTargetId === null) return;
    try {
      await deleteLesson(deleteTargetId);
      toast.success("Aula excluída!");
      revalidator.revalidate();
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : "Erro ao excluir";
      toast.error(msg);
    } finally {
      setDeleteOpen(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <SectionHeading title="Aulas" meta="Crie e gerencie suas aulas." />
        <Dialog open={isCreateOpen} onOpenChange={onOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-[#0047BA] hover:bg-[#003a99] text-white">
              <Plus className="mr-2 size-4" />
              Nova Aula
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="mb-2">
              <DialogTitle>Nova Aula</DialogTitle>
              <DialogDescription>Preencha os dados da aula.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit("create");
              }}
            >
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel>Turma</FieldLabel>
                  <Select
                    value={form.class_id}
                    onValueChange={(v) => setForm({ ...form, class_id: v })}
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
                    <FieldError
                      errors={[{ message: formErrors.class_id }]}
                    />
                  )}
                </Field>
                <Field>
                  <FieldLabel>Modalidade</FieldLabel>
                  <Select
                    value={form.modality}
                    onValueChange={(v) =>
                      setForm({
                        ...form,
                        modality: v as "REMOTE" | "INPERSON",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="REMOTE">Remota</SelectItem>
                      <SelectItem value="INPERSON">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Data e hora</FieldLabel>
                  <Input
                    type="datetime-local"
                    value={form.date_time}
                    onChange={(e) =>
                      setForm({ ...form, date_time: e.target.value })
                    }
                    className={
                      formErrors.date_time ? "border-destructive" : ""
                    }
                  />
                  {formErrors.date_time && (
                    <FieldError
                      errors={[{ message: formErrors.date_time }]}
                    />
                  )}
                </Field>
                <Field>
                  <FieldLabel>Descrição (opcional)</FieldLabel>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Conteúdo da aula"
                  />
                  {formErrors.description && (
                    <FieldError
                      errors={[{ message: formErrors.description }]}
                    />
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
                    {submitting ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {lessons.length === 0 ? (
        <EmptyState
          title="Nenhuma aula cadastrada"
          description="Crie a primeira aula para começar."
        />
      ) : (
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Turma</TableHead>
              <TableHead>Modalidade</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right pr-6">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">
                  {l.class?.code ?? l.class_id}
                </TableCell>
                <TableCell>
                  {l.modality === "REMOTE" ? "Remota" : "Presencial"}
                </TableCell>
                <TableCell>{formatData(l.date_time)}</TableCell>
                <TableCell>{formatHora(l.date_time)}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {l.description ?? "—"}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => openEdit(l.id)}
                      title="Editar"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                      setDeleteTargetId(l.id);
                      setDeleteOpen(true);
                    }}
                      title="Excluir"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Excluir esta aula?"
        description="Esta ação não pode ser desfeita."
        onConfirm={onDelete}
      />

      <Dialog open={isEditOpen} onOpenChange={onOpenEdit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="mb-2">
            <DialogTitle>Editar Aula</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit("edit");
            }}
          >
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel>Turma</FieldLabel>
                <Select
                  value={form.class_id}
                  onValueChange={(v) => setForm({ ...form, class_id: v })}
                >
                  <SelectTrigger
                    className={
                      formErrors.class_id ? "border-destructive" : ""
                    }
                  >
                    <SelectValue />
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
                <FieldLabel>Modalidade</FieldLabel>
                <Select
                  value={form.modality}
                  onValueChange={(v) =>
                    setForm({
                      ...form,
                      modality: v as "REMOTE" | "INPERSON",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REMOTE">Remota</SelectItem>
                    <SelectItem value="INPERSON">Presencial</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Data e hora</FieldLabel>
                <Input
                  type="datetime-local"
                  value={form.date_time}
                  onChange={(e) =>
                    setForm({ ...form, date_time: e.target.value })
                  }
                />
                {formErrors.date_time && (
                  <FieldError errors={[{ message: formErrors.date_time }]} />
                )}
              </Field>
              <Field>
                <FieldLabel>Descrição (opcional)</FieldLabel>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                {formErrors.description && (
                  <FieldError
                    errors={[{ message: formErrors.description }]}
                  />
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
  );
}
