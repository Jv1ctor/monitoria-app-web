type TurmaFormData = {
    disciplina: string
    modalidade: string
    local: string
    diaSemana: string
    horaInicio: string
    horaFim: string
}

type TurmaModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    subtitle?: string
    submitLabel: string
    initialData?: Partial<TurmaFormData>
    onSubmit: (data: TurmaFormData) => void
    disciplinas: string[]
    modalidades: string[]
    diasSemana: string[]
}

export type { TurmaFormData, TurmaModalProps }