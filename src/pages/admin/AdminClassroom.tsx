import { useState } from "react"
import { TurmaModal } from "./components/TurmaModal"

export default function AdminClassroom() {
    const [open, setOpen] = useState(true)
  return (
    <TurmaModal
      open={open}
      onOpenChange={setOpen}
      title="Editar Turma"
      subtitle="Calculo I"
      submitLabel="Salvar Alteracoes"
      initialData={{
        disciplina: "Calculo I",
        modalidade: "Presencial",
        local: "C-201",
        diaSemana: "Segunda",
        horaInicio: "14:00",
        horaFim: "16:00",
      }}
      onSubmit={(data) => {
        console.log(data)
      }}
      disciplinas={["Calculo I", "Fisica II", "Algoritmos"]}
      modalidades={["Presencial", "Online"]}
      diasSemana={["Segunda", "Terca", "Quarta", "Quinta", "Sexta"]}
    />
  )
}