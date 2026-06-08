import {
  CalendarDays,
  ClipboardList,
  Clock,
  FileText,
  MapPin,
  MessageSquare,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WelcomeHeader } from "@/components/shared/WelcomeHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatGrid } from "@/components/shared/StatGrid"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ScheduleCard } from "@/components/shared/ScheduleCard"
import { ShortcutCard } from "@/components/shared/ShortcutCard"
import type { Session } from "@/types/monitor/Session.type"
import { formatHora, hoje } from "@/lib/data-format.lib"

const MOCK_SESSOES: Session[] = [
  { id: 1, disciplina: "Cálculo I", local: "Sala C-201", dataISO: "2026-06-05T14:00:00-03:00" },
  { id: 2, disciplina: "Cálculo I", local: "Sala C-201", dataISO: "2026-06-10T14:00:00-03:00" },
  { id: 3, disciplina: "Cálculo I", local: "Online — Google Meet", dataISO: "2026-06-17T14:00:00-03:00" },
]

const formatDiaMes = (dataISO: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(
    new Date(dataISO),
  )

function WelcomeMonitor() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <WelcomeHeader
          title="Bem-vindo, Brenda Lima"
          subtitle="Sexta-feira, 5 de junho de 2026. Você tem 1 sessão hoje."
        />

        <StatGrid>
          <StatCard icon={<Users className="size-5" />} label="Alunos ativos" value="24" hint="Em Cálculo I" />
          <StatCard icon={<CalendarDays className="size-5" />} label="Frequências registradas" value="86" hint="Neste semestre" />
          <StatCard icon={<FileText className="size-5" />} label="Materiais publicados" value="12" hint="4 nas últimas 2 semanas" />
          <StatCard icon={<Clock className="size-5" />} label="Próxima sessão" value="14:00" hint="Cálculo I · Sala C-201" />
        </StatGrid>

        <section className="space-y-3">
          <SectionHeading title="Próximas Sessões" meta="3 agendadas" />
          <div className="space-y-3">
            {MOCK_SESSOES.map((item) => {
              const ehHoje = hoje(item.dataISO)
              return (
                <ScheduleCard
                  key={item.id}
                  accent={ehHoje}
                  leading={
                    <div className="text-center">
                      <p className="text-lg font-bold leading-none">{formatHora(item.dataISO)}</p>
                      <p className="text-xs text-muted-foreground">{formatDiaMes(item.dataISO)}</p>
                    </div>
                  }
                  title={item.disciplina}
                  badge={
                    ehHoje ? (
                      <Badge
                        variant="info"
                        className="h-4 px-1.5 text-[10px] font-bold uppercase tracking-wide"
                      >
                        Hoje
                      </Badge>
                    ) : undefined
                  }
                  subtitle={
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      {item.local}
                    </span>
                  }
                  action={
                    <Button variant={ehHoje ? "default" : "outline"} size="sm">
                      Registrar Frequência
                    </Button>
                  }
                />
              )
            })}
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeading title="Atalhos rápidos" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ShortcutCard icon={<FileText className="size-5" />} title="Publicar Material" description="Disponibilize apostilas, listas e slides" to="/monitor/materials" />
            <ShortcutCard icon={<ClipboardList className="size-5" />} title="Meus Horários" description="Veja salas e horários das suas sessões" to="/monitor/" />
            <ShortcutCard icon={<MessageSquare className="size-5" />} title="Fórum da Monitoria" description="Responda dúvidas e converse com a turma" to="/monitor/forum" />
          </div>
        </section>
      </div>
    </div>
  )
}

export { WelcomeMonitor }
