import * as React from "react"
import { CalendarDays, Clock, MapPin, Plus, BookOpen, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { EmptyState } from "@/components/shared/empty-state"
import { formatData, formatHora } from "@/lib/data-format.lib"

const MOCK_CLASSES = [
  { value: "1", label: "Cálculo I — Turma CS101-T1" },
  { value: "2", label: "Física II — Turma PH201-T2" },
]

const MOCK_LESSONS = [
  { id: 1, modality: "PRESENCIAL", date_time: "2026-06-12T14:00:00-03:00", description: "Aula sobre limites", class_id: 1, createdAt: "2026-06-10T10:00:00-03:00", class: { id: 1, code: "CS101-T1", subject: { id: 1, name: "Cálculo I" } } },
  { id: 2, modality: "REMOTO", date_time: "2026-06-15T10:00:00-03:00", description: "Aula sobre derivadas", class_id: 1, createdAt: "2026-06-10T10:30:00-03:00", class: { id: 1, code: "CS101-T1", subject: { id: 1, name: "Cálculo I" } } },
  { id: 3, modality: "PRESENCIAL", date_time: "2026-06-20T14:00:00-03:00", description: null, class_id: 2, createdAt: "2026-06-10T11:00:00-03:00", class: { id: 2, code: "PH201-T2", subject: { id: 2, name: "Física II" } } },
]

export function LessonsPage() {
  const [lessons, setLessons] = React.useState(MOCK_LESSONS)
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [classId, setClassId] = React.useState("")
  const [modality, setModality] = React.useState("")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [description, setDescription] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (!classId) errors.classId = "Selecione a turma."
    if (!modality) errors.modality = "Selecione a modalidade."
    if (!date) errors.date = "Informe a data."
    if (!time) errors.time = "Informe o horário."
    if (!location || location.trim() === "") errors.location = "Informe a sala ou link."

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})

    const selectedClass = MOCK_CLASSES.find(c => c.value === classId)
    const className = selectedClass?.label?.split(" — ")[0] ?? "Monitoria"
    const classCode = selectedClass?.label?.split(" — ")[1] ?? ""

    const newLesson = {
      id: Math.max(0, ...lessons.map(l => l.id)) + 1,
      modality,
      date_time: `${date}T${time}:00-03:00`,
      description: description || null,
      class_id: Number(classId),
      createdAt: new Date().toISOString(),
      class: { id: Number(classId), code: classCode, subject: { id: Number(classId), name: className } },
    }

    setLessons([...lessons, newLesson])
    toast.success("Aula criada com sucesso!")

    setClassId("")
    setModality("")
    setDate("")
    setTime("")
    setLocation("")
    setDescription("")
  }

  const handleDelete = (id: number) => {
    setLessons(current => current.filter(l => l.id !== id))
    toast.success("Aula removida!")
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Aulas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie as aulas das suas turmas e registre frequência.
        </p>
      </div>

      <Card className="shadow-sm border-border mb-10">
        <CardContent className="p-6">
          <h2 className="text-base font-bold text-foreground mb-4">Nova Aula</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <Field className="md:col-span-2">
                <FieldLabel>Turma</FieldLabel>
                <Select onValueChange={setClassId} value={classId}>
                  <SelectTrigger className={formErrors.classId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione a turma..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_CLASSES.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.classId && <FieldError errors={[{ message: formErrors.classId }]} />}
              </Field>

              <Field>
                <FieldLabel>Modalidade</FieldLabel>
                <Select onValueChange={setModality} value={modality}>
                  <SelectTrigger className={formErrors.modality ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                    <SelectItem value="REMOTO">Online</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.modality && <FieldError errors={[{ message: formErrors.modality }]} />}
              </Field>

              <Field>
                <FieldLabel>Sala / Link</FieldLabel>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Ex: C-201 ou https://meet.google.com/..."
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className={`pl-10 ${formErrors.location ? "border-destructive" : ""}`}
                  />
                </div>
                {formErrors.location && <FieldError errors={[{ message: formErrors.location }]} />}
              </Field>

              <Field>
                <FieldLabel>Data</FieldLabel>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className={`pl-10 ${formErrors.date ? "border-destructive" : ""}`}
                  />
                </div>
                {formErrors.date && <FieldError errors={[{ message: formErrors.date }]} />}
              </Field>

              <Field>
                <FieldLabel>Horário</FieldLabel>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className={`pl-10 ${formErrors.time ? "border-destructive" : ""}`}
                  />
                </div>
                {formErrors.time && <FieldError errors={[{ message: formErrors.time }]} />}
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel>Descrição (opcional)</FieldLabel>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 size-4 text-muted-foreground pointer-events-none" />
                  <Textarea
                    placeholder="Ex: Aula sobre derivadas e aplicações..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="pl-10 min-h-[80px]"
                  />
                </div>
              </Field>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit" className="bg-[#0047BA] hover:bg-[#003a99] text-white">
                <Plus className="mr-2 size-4" />
                Criar Aula
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <SectionHeading title="Aulas cadastradas" meta={`${lessons.length} aula(s)`} />

      {lessons.length === 0 ? (
        <EmptyState
          title="Nenhuma aula cadastrada"
          description="Crie sua primeira aula usando o formulário acima."
          icon={<BookOpen className="size-8" />}
        />
      ) : (
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-xs font-bold text-muted-foreground uppercase">Turma</TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground uppercase">Modalidade</TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground uppercase">Data</TableHead>
              <TableHead className="text-xs font-bold text-muted-foreground uppercase">Horário</TableHead>
              <TableHead className="text-right text-xs font-bold text-muted-foreground uppercase pr-6">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell className="font-medium text-sm">
                  {lesson.class?.subject?.name ?? "Monitoria"}
                </TableCell>
                <TableCell>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    lesson.modality === "PRESENCIAL"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}>
                    {lesson.modality === "PRESENCIAL" ? "Presencial" : "Online"}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatData(lesson.date_time)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatHora(lesson.date_time)}</TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" className="size-8 text-muted-foreground hover:text-foreground" title="Editar">
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20"
                      onClick={() => handleDelete(lesson.id)}
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
    </div>
  )
}
