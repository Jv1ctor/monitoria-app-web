import {
  BookOpen,
  Calendar,
  CalendarCheck,
  CalendarDays,
  Clock,
  MessageSquare,
  Search,
} from "lucide-react"

import { WelcomeHeader } from "@/components/shared/WelcomeHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatGrid } from "@/components/shared/StatGrid"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ShortcutCard } from "@/components/shared/ShortcutCard"
import Dashboard from "./pages/dashboard/Dashboard"

function WelcomeStudent() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <WelcomeHeader
          title="Bem-vindo, João Silva"
          subtitle="Sexta-feira, 5 de junho de 2026 · Você tem 1 monitoria hoje."
        />

        <StatGrid>
          <StatCard icon={<CalendarCheck className="size-5" />} label="Frequência geral" value="85%" hint="Acima da meta de 75%" />
          <StatCard icon={<Calendar className="size-5" />} label="Monitorias agendadas" value="3" hint="Nos próximos 7 dias" />
          <StatCard icon={<BookOpen className="size-5" />} label="Disciplinas acompanhadas" value="4" hint="Neste semestre" />
          <StatCard icon={<Clock className="size-5" />} label="Próxima monitoria" value="14:00" hint="Cálculo I · Sala C-201" />
        </StatGrid>

        <section className="space-y-3">
          <Dashboard/>
        </section>

        <section className="space-y-3">
          <SectionHeading title="Atalhos rápidos" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ShortcutCard icon={<Search className="size-5" />} title="Buscar Disciplina" description="Encontre novas monitorias para acompanhar" to="#" />
            <ShortcutCard icon={<CalendarDays className="size-5" />} title="Minha Frequência" description="Acompanhe sua presença nas sessões" to="#" />
            <ShortcutCard icon={<MessageSquare className="size-5" />} title="Fórum da Monitoria" description="Tire dúvidas e converse com a turma" to="/student/forum" />
          </div>
        </section>
      </div>
    </div>
  )
}

export { WelcomeStudent }
