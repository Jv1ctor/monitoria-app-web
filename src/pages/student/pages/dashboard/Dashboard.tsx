import { useMemo } from "react"
import { Calendar, Clock3 } from "lucide-react"

import { Avatar } from "@/components/shared/Avatar"
import { ScheduleCard } from "@/components/shared/ScheduleCard"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { Badge } from "@/components/ui/badge"
import type { Monitoring } from "@/types/student/Monitoring.type"
import { formatData, formatHora, hoje } from "@/lib/data-format.lib"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { NavLink } from "react-router"
import { studentMaterial } from "@/routes/paths"



const MOCK_MONITORING: Monitoring[] = [
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




const Dashboard = () => {
    const monitoriasOrdenadas = useMemo(() => {
        return [...MOCK_MONITORING].sort((a, b) => new Date(a.dataISO).getTime() - new Date(b.dataISO).getTime())
    }, [])
    return (
        <div className="">
            <div className="mx-auto w-full max-w-5xl space-y-4">
                <SectionHeading title="Próximas Monitorias" meta={`${monitoriasOrdenadas.length} agendadas`} />

                {monitoriasOrdenadas.length === 0 ? (
                    <EmptyState
                        title="Nenhuma monitoria agendada"
                        description="Quando houver monitorias, elas aparecerao aqui."
                    />
                ) : (
                    <div className="space-y-3">
                        {monitoriasOrdenadas.map((item) => (
                            <ScheduleCard
                                key={item.id}
                                accent={hoje(item.dataISO)}
                                leading={<Avatar initials={item.monitorIniciais} />}
                                title={item.disciplina}
                                badge={
                                    hoje(item.dataISO) && (
                                        <Badge variant="info" className="h-4 px-1.5 text-[10px] font-bold uppercase tracking-wide">
                                            Hoje
                                        </Badge>
                                    )
                                }
                                subtitle={
                                    <>
                                        Monitor: <span className="font-semibold">{item.monitorNome}</span>
                                    </>
                                }
                                meta={[
                                    { icon: <Calendar className="size-4" />, text: formatData(item.dataISO) },
                                    { icon: <Clock3 className="size-4" />, text: formatHora(item.dataISO) },
                                ]}
                                action={
                                    <Button variant="outline" size="sm" asChild>
                                        <NavLink to={studentMaterial(item.id)}>Ver detalhes</NavLink>
                                    </Button>
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard