import { useMemo } from "react"
import { Calendar, Clock3 } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { Badge } from "@/components/ui/badge"
import type { LessonResponseDto } from "@/types/lesson.type"
import { formatData, formatHora, hoje } from "@/lib/data-format.lib"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { NavLink } from "react-router"
import { studentMaterial } from "@/routes/paths"

interface DashboardProps {
  lessons: LessonResponseDto[]
}

const Dashboard = ({ lessons }: DashboardProps) => {
    const monitoriasOrdenadas = useMemo(() => {
        return [...lessons].sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime())
    }, [lessons])

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
                        {monitoriasOrdenadas.map((item) => {
                            const subjectName = item.class?.subject?.name ?? item.modality
                            const monitorFullName = item.class?.monitor
                                ? `${item.class.monitor.first_name} ${item.class.monitor.last_name}`
                                : `Monitor #${item.class_id}`
                            return (
                            <article
                                key={item.id}
                                className="rounded-lg border border-border bg-card shadow-card"
                            >
                                <div className={`flex flex-col gap-3 rounded-l-lg border-l-4 ${hoje(item.date_time) ? "border-l-4 border-l-primary/50 " : "border-l-4 border-l-primary"} p-4 md:flex-row md:items-center md:justify-between`}>
                                    <div className="flex items-center gap-3">
                                        <Avatar size="default">
                                            <AvatarFallback className="bg-primary text-white">
                                                {(item.class?.subject?.name ?? item.modality).substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <div className="flex items-center gap-2"> <p className="text-base font-semibold">{subjectName}</p> {hoje(item.date_time) && (<Badge variant="info" className="h-4 px-1.5 text-[10px] font-bold uppercase tracking-wide"> Hoje </Badge>)} </div>
                                            <p className="text-sm text-muted-foreground">
                                                Monitor:{" "}
                                                <span className="font-semibold">{monitorFullName}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Calendar className="size-4" />
                                            <span>{formatData(item.date_time)}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Clock3 className="size-4" />
                                            <span>{formatHora(item.date_time)}</span>
                                        </div>

                                        <Button variant="outline" size="sm">
                                            <NavLink to={studentMaterial(item.class_id)}>
                                                Ver detalhes
                                            </NavLink>
                                        </Button>
                                    </div>
                                </div>
                            </article>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard