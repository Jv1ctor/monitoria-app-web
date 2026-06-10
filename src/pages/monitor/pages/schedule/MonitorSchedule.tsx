import * as React from "react"
import { CalendarDays, Clock, MapPin, Pencil, Trash2, Plus, Users } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const initialSchedules = [
  { 
    id: "1", 
    course: "Cálculo I", 
    modality: "Presencial", 
    days: "Seg e Qua", 
    time: "10:00 - 12:00", 
    location: "Sala D22", 
    capacity: "20" 
  },
  { 
    id: "2", 
    course: "Cálculo I", 
    modality: "Online", 
    days: "Qua e Sex", 
    time: "15:00 - 17:00", 
    location: "Discord", 
    capacity: "50" 
  }
]

const COURSES = [
  { value: "Cálculo I", label: "Cálculo I" },
  { value: "Física II", label: "Física II" },
  { value: "Álgebra Linear", label: "Álgebra Linear" }
]

export function MonitorSchedulePage() {
  const [schedules, setSchedules] = React.useState(initialSchedules)

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})
  const [course, setCourse] = React.useState("")
  const [modality, setModality] = React.useState("")
  const [days, setDays] = React.useState("")
  const [time, setTime] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [capacity, setCapacity] = React.useState("")

  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editCourse, setEditCourse] = React.useState("")
  const [editModality, setEditModality] = React.useState("")
  const [editDays, setEditDays] = React.useState("")
  const [editTime, setEditTime] = React.useState("")
  const [editLocation, setEditLocation] = React.useState("")
  const [editCapacity, setEditCapacity] = React.useState("")

  const handleDelete = (id: string) => {
    setSchedules((current) => current.filter((item) => item.id !== id))
    toast.success("Horário removido com sucesso!")
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (!course) errors.course = "Selecione a disciplina."
    if (!modality) errors.modality = "Selecione a modalidade."
    if (!days || days.trim() === "") errors.days = "Informe os dias."
    if (!time || time.trim() === "") errors.time = "Informe o horário."
    if (!location || location.trim() === "") errors.location = "Informe a sala ou link."
    if (!capacity || capacity.trim() === "") errors.capacity = "Informe a capacidade."

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})

    const newSchedule = {
      id: Math.random().toString(),
      course,
      modality,
      days,
      time,
      location,
      capacity
    }

    setSchedules([...schedules, newSchedule])
    toast.success("Horário publicado com sucesso!")
    
    setCourse("")
    setModality("")
    setDays("")
    setTime("")
    setLocation("")
    setCapacity("")
  }

  const openEditModal = (schedule: any) => {
    setFormErrors({})
    setEditingId(schedule.id)
    setEditCourse(schedule.course)
    setEditModality(schedule.modality)
    setEditDays(schedule.days)
    setEditTime(schedule.time)
    setEditLocation(schedule.location)
    setEditCapacity(schedule.capacity)
    setIsEditOpen(true)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (!editCourse) errors.editCourse = "Selecione a disciplina."
    if (!editModality) errors.editModality = "Selecione a modalidade."
    if (!editDays || editDays.trim() === "") errors.editDays = "Informe os dias."
    if (!editTime || editTime.trim() === "") errors.editTime = "Informe o horário."
    if (!editLocation || editLocation.trim() === "") errors.editLocation = "Informe a sala ou link."
    if (!editCapacity || editCapacity.trim() === "") errors.editCapacity = "Informe a capacidade."

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})

    const updatedSchedules = []
    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i].id === editingId) {
        updatedSchedules.push({
          ...schedules[i],
          course: editCourse,
          modality: editModality,
          days: editDays,
          time: editTime,
          location: editLocation,
          capacity: editCapacity
        })
      } else {
        updatedSchedules.push(schedules[i])
      }
    }

    setSchedules(updatedSchedules)
    toast.success("Horário atualizado!")
    setIsEditOpen(false)
  }

  const onOpenEditChange = (open: boolean) => {
    setIsEditOpen(open)
    if (!open) setFormErrors({})
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Meus Horários de Monitoria</h1>
        <p className="text-sm text-muted-foreground mt-1">Defina horários, salas e modalidade. As informações ficam visíveis para os alunos no instante em que você publicar.</p>
      </div>

      <Card className="shadow-sm border-border mb-10">
        <CardContent className="p-6">
          <h2 className="text-base font-bold text-foreground mb-4">Novo horário</h2>
          <form onSubmit={handleCreateSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <Field>
                <FieldLabel>Disciplina</FieldLabel>
                <Select onValueChange={setCourse} value={course}>
                  <SelectTrigger className={formErrors.course ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {formErrors.course && <FieldError errors={[{ message: formErrors.course }]} />}
              </Field>

              <Field>
                <FieldLabel>Modalidade</FieldLabel>
                <Select onValueChange={setModality} value={modality}>
                  <SelectTrigger className={formErrors.modality ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.modality && <FieldError errors={[{ message: formErrors.modality }]} />}
              </Field>

              <Field>
                <FieldLabel>Dia(s) da semana</FieldLabel>
                <Input 
                  placeholder="Ex: Segundas e Sextas" 
                  value={days} onChange={e => setDays(e.target.value)}
                  className={formErrors.days ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {formErrors.days && <FieldError errors={[{ message: formErrors.days }]} />}
              </Field>

              <Field>
                <FieldLabel>Horário</FieldLabel>
                <Input 
                  placeholder="Ex: 15:00 - 17:00" 
                  value={time} onChange={e => setTime(e.target.value)}
                  className={formErrors.time ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {formErrors.time && <FieldError errors={[{ message: formErrors.time }]} />}
              </Field>

              <Field>
                <FieldLabel>Sala / Link</FieldLabel>
                <Input 
                  placeholder="Ex: C-201 ou https://meet.google.com/..." 
                  value={location} onChange={e => setLocation(e.target.value)}
                  className={formErrors.location ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {formErrors.location && <FieldError errors={[{ message: formErrors.location }]} />}
              </Field>

              <Field>
                <FieldLabel>Capacidade</FieldLabel>
                <Input 
                  type="number"
                  placeholder="Ex: 20" 
                  value={capacity} onChange={e => setCapacity(e.target.value)}
                  className={formErrors.capacity ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {formErrors.capacity && <FieldError errors={[{ message: formErrors.capacity }]} />}
              </Field>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit" className="bg-[#0047BA] hover:bg-[#003a99] text-white">
                <Plus className="mr-2 size-4" />
                Publicar horário
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Horários publicados</h2>
        <div className="flex flex-col gap-3">
          {schedules.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground border border-dashed rounded-lg">
              Nenhum horário cadastrado ainda.
            </div>
          ) : (
            schedules.map((schedule) => (
              <Card key={schedule.id} className="shadow-sm border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 text-sm">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-foreground text-base leading-none">{schedule.course}</span>
                      <div className="flex items-center text-muted-foreground gap-1.5">
                        <CalendarDays className="size-3.5" />
                        <span className="text-xs">{schedule.days}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground gap-2">
                      <Clock className="size-4" />
                      <span>{schedule.time}</span>
                    </div>

                    <div className="flex items-center text-muted-foreground gap-2">
                      <MapPin className="size-4 shrink-0" />
                      <span className="truncate">{schedule.location}</span>
                    </div>

                    <div className="flex items-center text-muted-foreground gap-2">
                      <Users className="size-4 shrink-0" />
                      <span className="truncate">{schedule.capacity} vagas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      schedule.modality === "Presencial" 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-green-100 text-green-600"
                    }`}>
                      {schedule.modality}
                    </span>

                    <div className="w-px h-6 bg-border mx-1 hidden sm:block"></div>

                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground" onClick={() => openEditModal(schedule)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(schedule.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={onOpenEditChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="mb-2">
            <DialogTitle>Editar Horário</DialogTitle>
            <DialogDescription>Altere as informações do seu horário de monitoria.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              <Field className="md:col-span-2">
                <FieldLabel>Disciplina</FieldLabel>
                <Select onValueChange={setEditCourse} value={editCourse}>
                  <SelectTrigger className={formErrors.editCourse ? "border-destructive" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {formErrors.editCourse && <FieldError errors={[{ message: formErrors.editCourse }]} />}
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel>Modalidade</FieldLabel>
                <Select onValueChange={setEditModality} value={editModality}>
                  <SelectTrigger className={formErrors.editModality ? "border-destructive" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.editModality && <FieldError errors={[{ message: formErrors.editModality }]} />}
              </Field>

              <Field>
                <FieldLabel>Dias</FieldLabel>
                <Input value={editDays} onChange={e => setEditDays(e.target.value)} className={formErrors.editDays ? "border-destructive" : ""} />
                {formErrors.editDays && <FieldError errors={[{ message: formErrors.editDays }]} />}
              </Field>

              <Field>
                <FieldLabel>Horário</FieldLabel>
                <Input value={editTime} onChange={e => setEditTime(e.target.value)} className={formErrors.editTime ? "border-destructive" : ""} />
                {formErrors.editTime && <FieldError errors={[{ message: formErrors.editTime }]} />}
              </Field>

              <Field>
                <FieldLabel>Sala / Link</FieldLabel>
                <Input value={editLocation} onChange={e => setEditLocation(e.target.value)} className={formErrors.editLocation ? "border-destructive" : ""} />
                {formErrors.editLocation && <FieldError errors={[{ message: formErrors.editLocation }]} />}
              </Field>

              <Field>
                <FieldLabel>Capacidade</FieldLabel>
                <Input type="number" value={editCapacity} onChange={e => setEditCapacity(e.target.value)} className={formErrors.editCapacity ? "border-destructive" : ""} />
                {formErrors.editCapacity && <FieldError errors={[{ message: formErrors.editCapacity }]} />}
              </Field>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#0047BA] hover:bg-[#003a99] text-white">Atualizar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}