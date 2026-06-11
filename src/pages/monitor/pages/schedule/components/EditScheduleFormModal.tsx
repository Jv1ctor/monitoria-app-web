import * as React from "react"

import FormModal from "@/components/shared/FormModal"
import SelectComponent from "@/components/shared/SelectComponent"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type Schedule = {
  id: string
  course: string
  modality: string
  days: string
  time: string
  location: string
  capacity: string
}

const MODALITIES = [
  { value: "Presencial", label: "Presencial" },
  { value: "Online", label: "Online" },
]

type EditScheduleFormModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule: Schedule | null
  courses: { value: string; label: string }[]
  onSave: (schedule: Schedule) => void
}

export default function EditScheduleFormModal({
  open,
  onOpenChange,
  schedule,
  courses,
  onSave,
}: EditScheduleFormModalProps) {
  const [course, setCourse] = React.useState(schedule?.course ?? "")
  const [modality, setModality] = React.useState(schedule?.modality ?? "")
  const [days, setDays] = React.useState(schedule?.days ?? "")
  const [time, setTime] = React.useState(schedule?.time ?? "")
  const [location, setLocation] = React.useState(schedule?.location ?? "")
  const [capacity, setCapacity] = React.useState(schedule?.capacity ?? "")

  const handleSafeChanges = () => {
    if (!schedule) return
    onSave({ ...schedule, course, modality, days, time, location, capacity })
    onOpenChange(false)
  }

  return (
    <FormModal
      id="edit-schedule-form"
      open={open}
      onOpenChange={onOpenChange}
      title="Editar horário"
      description="Atualize as informações do horário de monitoria."
      handleSafeChanges={handleSafeChanges}
      handleCloseModal={() => onOpenChange(false)}
      labelSaveModalButton="Atualizar"
      labelCloseModalButton="Cancelar"
    >
      <div className="grid gap-3">
        <Label>Disciplina</Label>
        <SelectComponent
          label="Selecione uma disciplina"
          placeholder="Selecione..."
          items={courses}
          value={course}
          onValueChange={setCourse}
        />
      </div>

      <div className="grid gap-3">
        <Label>Modalidade</Label>
        <SelectComponent
          label="Selecione uma modalidade"
          placeholder="Selecione..."
          items={MODALITIES}
          value={modality}
          onValueChange={setModality}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="edit-days">Dia(s) da semana</Label>
        <Input id="edit-days" value={days} onChange={e => setDays(e.target.value)} />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="edit-time">Horário</Label>
        <Input id="edit-time" value={time} onChange={e => setTime(e.target.value)} />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="edit-location">Sala / Link</Label>
        <Input id="edit-location" value={location} onChange={e => setLocation(e.target.value)} />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="edit-capacity">Capacidade</Label>
        <Input id="edit-capacity" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} />
      </div>
    </FormModal>
  )
}
