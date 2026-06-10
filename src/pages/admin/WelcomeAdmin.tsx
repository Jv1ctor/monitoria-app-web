import {
  BookOpen,
  CalendarDays,
  Link2,
  MessageSquare,
  Star,
  UserPlus,
  Users,
} from "lucide-react"

import { WelcomeHeader } from "@/components/shared/WelcomeHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatGrid } from "@/components/shared/StatGrid"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ShortcutCard } from "@/components/shared/ShortcutCard"
function WelcomeAdmin() {
  return (
    <div className="bg-muted/30 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <WelcomeHeader
          title="Bem-vindo, Gabriela Souza"
          subtitle="Visão geral do programa de monitoria · 2026.1"
        />

        <StatGrid>
          <StatCard
            icon={<CalendarDays className="size-5" />}
            label="Frequências registradas"
            value="324"
            hint="+8% vs semana anterior"
          />
          <StatCard
            icon={<Users className="size-5" />}
            label="Alunos matriculados"
            value="187"
            hint="12 novos esta semana"
          />
          <StatCard
            icon={<MessageSquare className="size-5" />}
            label="Respostas no fórum"
            value="96"
            hint="+23 nos últimos 7 dias"
          />
          <StatCard
            icon={<Star className="size-5" />}
            label="Monitores ativos"
            value="14"
            hint="Em 6 disciplinas"
          />
        </StatGrid>

        <section className="space-y-3">
          <SectionHeading title="Indicadores do programa" meta="2026.1" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* <DonutChart title="Frequência por disciplina" data={FREQUENCIA_DISCIPLINA} />
            <DonutChart title="Avaliação de monitores" data={AVALIACAO_MONITORES} />
            <DonutChart title="Engajamento no fórum" data={ENGAJAMENTO_FORUM} /> */}
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeading title="Atalhos rápidos" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ShortcutCard
              icon={<BookOpen className="size-5" />}
              title="Gerenciar Disciplinas"
              description="Cadastre e edite disciplinas do programa"
              to="#"
            />
            <ShortcutCard
              icon={<Users className="size-5" />}
              title="Turmas"
              description="Organize turmas e seus horários"
              to="#"
            />
            <ShortcutCard
              icon={<UserPlus className="size-5" />}
              title="Monitores"
              description="Acompanhe e gerencie os monitores"
              to="#"
            />
            <ShortcutCard
              icon={<Link2 className="size-5" />}
              title="Vincular"
              description="Associe monitores às turmas"
              to="#"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export { WelcomeAdmin }
