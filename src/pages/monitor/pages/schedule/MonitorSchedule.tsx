import * as React from "react";
import { useLoaderData, useRevalidator } from "react-router";
import { Plus, Trash2, Calendar, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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

import { createLesson, deleteLesson } from "@/services/lesson.service";
import { ApiError } from "@/lib/handle-request";
import { mapFieldErrors, mapApiFieldErrors } from "@/lib/zod-field-errors";
import { createLessonSchema } from "@/schemas/monitor/lesson.schema";
import { formatData, formatHora } from "@/lib/data-format.lib";
import type { MonitorScheduleLoaderResult } from "@/loaders/monitor-schedule.loader";
import type { ClassResponseDto } from "@/types/class.type";

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

export function MonitorSchedulePage() {
  const { me, schedules } =
    useLoaderData() as MonitorScheduleLoaderResult;
  const revalidator = useRevalidator();

  const classes: ClassResponseDto[] =
    (me.academicProfile?.classes as ClassResponseDto[] | undefined) ?? [];

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
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

  const handleCreate = async () => {
    const parsed = createLessonSchema.safeParse(form);
    if (!parsed.success) {
      setFormErrors(mapFieldErrors(parsed.error));
      return;
    }
    setFormErrors({});
    setSubmitting(true);
    try {
      await createLesson({
        class_id: parsed.data.class_id,
        modality: parsed.data.modality,
        date_time: new Date(parsed.data.date_time).toISOString(),
        description: parsed.data.description,
      });
      toast.success("Aula agendada!");
      onOpenCreate(false);
      revalidator.revalidate();
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.fieldErrors.length) {
          setFormErrors(mapApiFieldErrors(e.fieldErrors));
        } else {
          toast.error(e.message);
        }
      } else {
        toast.error("Erro ao agendar");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (deleteTargetId === null) return;
    try {
      await deleteLesson(deleteTargetId);
      toast.success("Aula cancelada!");
      revalidator.revalidate();
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : "Erro ao cancelar";
      toast.error(msg);
    } finally {
      setDeleteOpen(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <SectionHeading
          title="Meus Horários"
          meta="Veja e agende aulas por turma."
        />
        <Dialog open={isCreateOpen} onOpenChange={onOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-[#0047BA] hover:bg-[#003a99] text-white">
              <Plus className="mr-2 size-4" />
              Agendar Aula
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="mb-2">
              <DialogTitle>Agendar Aula</DialogTitle>
              <DialogDescription>
                Crie uma aula avulsa para uma de suas turmas.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
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
                  />
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
                    {submitting ? "Agendando..." : "Agendar"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Cancelar esta aula?"
        description="Esta ação não pode ser desfeita."
        confirmLabel="Cancelar"
        onConfirm={handleDelete}
      />

      {schedules.length === 0 ? (
        <EmptyState
          title="Nenhuma aula agendada"
          description="Use o botão acima para criar a primeira."
        />
      ) : (
        <div className="space-y-3">
          {schedules.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded bg-primary/10 text-primary flex items-center justify-center">
                    <Calendar className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {s.class?.code ?? `Turma ${s.class_id}`}
                    </CardTitle>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{formatData(s.date_time)}</span>
                      <span>{formatHora(s.date_time)}</span>
                      <span className="flex items-center gap-1">
                        {s.modality === "REMOTE" ? (
                          <>
                            <Users className="size-3" /> Remota
                          </>
                        ) : (
                          <>
                            <MapPin className="size-3" /> Presencial
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-destructive"
                  onClick={() => {
                  setDeleteTargetId(s.id);
                  setDeleteOpen(true);
                }}
                  title="Cancelar"
                >
                  <Trash2 className="size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
