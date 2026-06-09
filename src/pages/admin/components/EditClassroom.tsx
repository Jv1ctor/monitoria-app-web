import { useEffect, useState } from "react"
import { Pencil, Clock3 } from "lucide-react"
import type { TurmaFormData, TurmaModalProps } from "../types/TurmaModal"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const EMPTY_FORM: TurmaFormData = {
    disciplina: "",
    modalidade: "",
    local: "",
    diaSemana: "",
    horaInicio: "",
    horaFim: "",
}

export function TurmaModal({
    open,
    onOpenChange,
    title,
    subtitle,
    submitLabel,
    initialData,
    onSubmit,
    disciplinas,
    modalidades,
    diasSemana,
}: TurmaModalProps) {
    const [form, setForm] = useState<TurmaFormData>(EMPTY_FORM)

    useEffect(() => {
        if (!open) return
        setForm({
            ...EMPTY_FORM,
            ...initialData,
        })
    }, [open, initialData])

    const update = <K extends keyof TurmaFormData>(key: K, value: TurmaFormData[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = () => {
        onSubmit(form)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span className="rounded-md bg-info/10 p-1.5 text-info">
                            <Pencil className="size-4" />
                        </span>
                        {title}
                    </DialogTitle>
                    {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
                </DialogHeader>

                <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Disciplina</p>
                        <Select value={form.disciplina} onValueChange={(v) => update("disciplina", v)}>
                            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                            <SelectContent>
                                {disciplinas.map((d) => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Modalidade</p>
                        <Select value={form.modalidade} onValueChange={(v) => update("modalidade", v)}>
                            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                            <SelectContent>
                                {modalidades.map((m) => (
                                    <SelectItem key={m} value={m}>{m}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Local / Sala</p>
                        <Input value={form.local} onChange={(e) => update("local", e.target.value)} placeholder="Ex: C-201" />
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Dia da semana</p>
                        <Select value={form.diaSemana} onValueChange={(v) => update("diaSemana", v)}>
                            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                            <SelectContent>
                                {diasSemana.map((d) => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Horario de inicio</p>
                        <div className="relative">
                            <Clock3 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="time"
                                className="pr-9"
                                value={form.horaInicio}
                                onChange={(e) => update("horaInicio", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Horario de termino</p>
                        <div className="relative">
                            <Clock3 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="time"
                                className="pr-9"
                                value={form.horaFim}
                                onChange={(e) => update("horaFim", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit}>{submitLabel}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}