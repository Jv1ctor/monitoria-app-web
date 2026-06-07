import { BookOpen, CalendarCheck2, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Metric, Session } from "@/types/teachingAssistant/MonitoringDashboard.type"
import CardDashboardMonitor from "./components/cardDashboardMonitor"
import { formatData, formatHora, hoje } from "@/lib/data-format.lib"


const METRICS: Metric[] = [
    { label: "Alunos ativos", value: 24, icon: Users },
    { label: "Frequencias registradas", value: 86, icon: CalendarCheck2 },
    { label: "Materiais publicados", value: 12, icon: BookOpen },
]

const SESSIONS: Session[] = [
    { id: 1, dataISO: "2026-05-31T14:00:00-03:00", disciplina: "Cálculo I", local: "Sala C-201" },
    { id: 2, dataISO: "2026-06-07T14:00:00-03:00", disciplina: "Cálculo I", local: "Sala C-201" },
    { id: 3, dataISO: "2026-06-05T14:00:00-03:00", disciplina: "Cálculo I", local: "Online - Google Meet" },
]

function NextSessions() {
    return (
        <div className="min-h-svh bg-muted/30 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-5xl space-y-5">
                <section className="space-y-1">
                    <h1>Minhas Monitorias Agendadas</h1>
                    <p className="text-sm text-muted-foreground">
                        Acompanhe os encontros agendados e registre frequência.
                    </p>
                </section>

                <section className="grid gap-3 md:grid-cols-3">
                    {METRICS.map((metric) => (
                        <CardDashboardMonitor key={metric.label} {...metric} />
                    ))}
                </section>

                <section className="space-y-3">
                    <h2>Próximas sessões</h2>

                    <div className="space-y-2">
                        {SESSIONS.map((session) => {
                            const isHoje = hoje(session.dataISO)

                            return (
                                <article key={session.id} className="rounded-lg border border-border bg-card shadow-card">
                                    <div
                                        className={`flex flex-col gap-3 rounded-l-lg border-l-4 p-4 md:flex-row md:items-center md:justify-between ${isHoje ? "border-l-[var(--primary-500)]" : "border-l-primary"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="min-w-11 text-center">
                                                <p className="text-2xl leading-none font-bold">{formatHora(session.dataISO)}</p>
                                                <p className="text-xs text-muted-foreground">{formatData(session.dataISO).slice(0, 5)}</p>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold">{session.disciplina}</p>
                                                    {isHoje && (
                                                        <Badge variant="info" className="h-4 px-1.5 text-[10px] font-bold uppercase tracking-wide">
                                                            Hoje
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{session.local}</p>
                                            </div>
                                        </div>

                                        <Button
                                            variant={isHoje ? "default" : "outline"}
                                            size="sm"
                                            disabled={!isHoje}
                                            className={
                                                isHoje
                                                    ? "hover:brightness-95"
                                                    : "cursor-not-allowed border-border text-muted-foreground hover:bg-transparent hover:text-muted-foreground disabled:opacity-100"
                                            }
                                        >
                                            Registrar Frequencia
                                        </Button>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default NextSessions