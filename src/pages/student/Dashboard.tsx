import { useMemo } from "react"
import { Calendar, Clock3 } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { Badge } from "@/components/ui/badge"

type Monitoria = {
    id: number;
    disciplina: string;
    monitorNome: string;
    monitorIniciais: string;
    monitorAvatarUrl?: string;
    dataISO: string;  //todo: verificar formato

}

const MOCK_MONITORIAS: Monitoria[] = [
    {
        id: 1,
        disciplina: "Calculo I",
        monitorNome: "Joao Luiz",
        monitorIniciais: "JL",
        dataISO: "2026-05-24T14:00:00-03:00",
    },
    {
        id: 2,
        disciplina: "Fisica II",
        monitorNome: "Pedro Costa",
        monitorIniciais: "PC",
        dataISO: "2026-05-10T16:00:00-03:00",

    },
    {
        id: 3,
        disciplina: "Programacao I",
        monitorNome: "Maria Estela",
        monitorIniciais: "ME",
        dataISO: "2026-05-15T18:00:00-03:00",
    },
]

const formatData = (dataISO: string) =>
    new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(dataISO))

const formatHora = (dataISO: string) =>
    new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(dataISO))

const hoje = (dataISO: string) => {
    const data = new Date(dataISO)
    const hoje = new Date()

    return (
        data.getDate() === hoje.getDate() &&
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
    )
}


const Dashboard = () => {
    const monitoriasOrdenadas = useMemo(() => {
        return [...MOCK_MONITORIAS].sort((a, b) => new Date(b.dataISO).getTime() - new Date(a.dataISO).getTime())
    }, [])
    return (
        <div className="min-h-svh bg-muted/30 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-5xl space-y-4">
                <h1>Proximas Monitorias</h1>

                {monitoriasOrdenadas.length === 0 ? (
                    <EmptyState
                        title="Nenhuma monitoria agendada"
                        description="Quando houver monitorias, elas aparecerao aqui."
                    />
                ) : (
                    <div className="space-y-3">
                        {monitoriasOrdenadas.map((item) => (
                            <article
                                key={item.id}
                                className="rounded-lg border border-border bg-card shadow-card"
                            >
                                <div className={`flex flex-col gap-3 rounded-l-lg border-l-4 ${hoje(item.dataISO) ? "border-l-4 border-l-[var(--primary-500)] " : "border-l-4 border-l-primary"} p-4 md:flex-row md:items-center md:justify-between`}>
                                    <div className="flex items-center gap-3">
                                        <Avatar size="default">
                                            <AvatarFallback className="bg-primary text-white">
                                                {item.monitorIniciais}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <div className="flex items-center gap-2"> <p className="text-base font-semibold">{item.disciplina}</p> {hoje(item.dataISO) && (<Badge variant="info" className="h-4 px-1.5 text-[10px] font-bold uppercase tracking-wide"> Hoje </Badge>)} </div>
                                            <p className="text-sm text-muted-foreground">
                                                Monitor:{" "}
                                                <span className="font-semibold">{item.monitorNome}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Calendar className="size-4" />
                                            <span>{formatData(item.dataISO)}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Clock3 className="size-4" />
                                            <span>{formatHora(item.dataISO)}</span>
                                        </div>

                                        <Button variant="outline" size="sm">
                                            Ver detalhes
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard