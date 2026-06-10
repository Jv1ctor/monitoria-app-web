import {
  BookOpen,
  Calendar,
  CalendarCheck,
  CalendarDays,
  Clock,
  MessageSquare,
  Search,
} from "lucide-react"
import { useLoaderData } from "react-router"

import { WelcomeHeader } from "@/components/shared/WelcomeHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatGrid } from "@/components/shared/StatGrid"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ShortcutCard } from "@/components/shared/ShortcutCard"
import Dashboard from "./pages/dashboard/Dashboard"
import { paths } from "@/routes/paths"
import type { StudentDashboardLoaderResult } from "@/loaders/student-dashboard.loader"
import { formatHora } from "@/lib/data-format.lib"

function WelcomeStudent() {
  const { me, enrolledLessons, stats } = useLoaderData<StudentDashboardLoaderResult>()

  const title = `Bem-vindo, ${me.first_name} ${me.last_name}`

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const subtitle =
    stats.upcomingCount > 0
      ? `${today.charAt(0).toUpperCase() + today.slice(1)} · Você tem ${stats.upcomingCount} monitoria(s) agendada(s).`
      : "Nenhuma monitoria agendada."

  const uniqueDisciplines = new Set(enrolledLessons.map((l) => l.class_id)).size

  const nextLessonText =
    enrolledLessons.length > 0
      ? (() => {
          const sorted = [...enrolledLessons].sort(
            (a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
          )
          const first = sorted[0]
          return `${formatHora(first.date_time)} · ${first.modality}`
        })()
      : "--:--"

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <WelcomeHeader title={title} subtitle={subtitle} />

        <StatGrid>
          <StatCard icon={<CalendarCheck className="size-5" />} label="Frequência geral" value={`${stats.attendanceRate}%`} hint="Acima da meta de 75%" />
          <StatCard icon={<Calendar className="size-5" />} label="Monitorias agendadas" value={`${stats.upcomingCount}`} hint="Nos próximos 7 dias" />
          <StatCard icon={<BookOpen className="size-5" />} label="Disciplinas acompanhadas" value={`${uniqueDisciplines}`} hint="Neste semestre" />
          <StatCard icon={<Clock className="size-5" />} label="Próxima monitoria" value={nextLessonText} hint={enrolledLessons.length > 0 ? enrolledLessons[0].modality : "Sem monitorias"} />
        </StatGrid>

        <section className="space-y-3">
          <Dashboard lessons={enrolledLessons} />
        </section>

        <section className="space-y-3">
          <SectionHeading title="Atalhos rápidos" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ShortcutCard icon={<Search className="size-5" />} title="Buscar Disciplina" description="Encontre novas monitorias para acompanhar" to={paths.studentSearch} />
            <ShortcutCard icon={<CalendarDays className="size-5" />} title="Minha Frequência" description="Acompanhe sua presença nas sessões" to={paths.studentFrequency} />
            <ShortcutCard icon={<MessageSquare className="size-5" />} title="Fórum da Monitoria" description="Tire dúvidas e converse com a turma" to={paths.studentForum} />
          </div>
        </section>
      </div>
    </div>
  )
}

export { WelcomeStudent }
