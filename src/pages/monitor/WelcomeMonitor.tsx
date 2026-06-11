import { Calendar, FileText, Users, MessageSquare } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatGrid } from "@/components/shared/StatGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScheduleCard } from "@/components/shared/ScheduleCard";
import { ShortcutCard } from "@/components/shared/ShortcutCard";

import { paths, monitorAttendance } from "@/routes/paths";
import { formatData, formatHora } from "@/lib/data-format.lib";
import type { MonitorDashboardLoaderResult } from "@/loaders/monitor-dashboard.loader";

export function WelcomeMonitor() {
  const { me, upcoming, stats } =
    useLoaderData() as MonitorDashboardLoaderResult;
  const navigate = useNavigate();

  const attendanceRatePct = Math.round(stats.attendanceRate * 100);

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full">
      <WelcomeHeader
        title={`Olá, ${me.first_name} ${me.last_name}`.trim()}
        subtitle="Aqui está o resumo das suas monitorias."
      />

      <StatGrid className="mt-6">
        <StatCard
          label="Turmas"
          value={stats.totalClasses}
          icon={<Users className="size-5" />}
        />
        <StatCard
          label="Alunos"
          value={stats.totalStudents}
          icon={<Users className="size-5" />}
        />
        <StatCard
          label="Aulas"
          value={stats.totalLessons}
          icon={<Calendar className="size-5" />}
        />
        <StatCard
          label="Frequência"
          value={`${attendanceRatePct}%`}
          icon={<Calendar className="size-5" />}
        />
      </StatGrid>

      <div className="mt-8 mb-3">
        <SectionHeading title="Próximas Sessões" />
      </div>

      {upcoming.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
          Nenhuma sessão futura. Crie uma aula em{" "}
          <button
            className="underline"
            onClick={() => navigate(paths.monitorLessons)}
          >
            Aulas
          </button>
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcoming.map((s) => {
            return (
              <ScheduleCard
                key={s.id}
                accent={s.isToday}
                badge={
                  s.isToday ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Hoje
                    </span>
                  ) : undefined
                }
                leading={
                  <div className="size-10 rounded bg-primary/10 text-primary flex items-center justify-center">
                    <Calendar className="size-5" />
                  </div>
                }
                title={s.subject_name}
                subtitle={s.modality === "REMOTE" ? "Remota" : "Presencial"}
                meta={[
                  { text: formatData(s.date_time) },
                  { text: formatHora(s.date_time) },
                ]}
                action={
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!s.isToday}
                    onClick={() => navigate(monitorAttendance(s.id))}
                  >
                    Registrar Frequência
                  </Button>
                }
              />
            );
          })}
        </div>
      )}

      <div className="mt-8 mb-3">
        <SectionHeading title="Atalhos" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ShortcutCard
          title="Materiais"
          description="Publique apostilas, listas e slides."
          icon={<FileText className="size-5" />}
          to={paths.monitorMaterials}
        />
        <ShortcutCard
          title="Meus Horários"
          description="Veja e agende aulas por turma."
          icon={<Calendar className="size-5" />}
          to={paths.monitorLessons}
        />
        <ShortcutCard
          title="Fórum"
          description="Tire dúvidas e responda aos alunos."
          icon={<MessageSquare className="size-5" />}
          to={paths.monitorForum}
        />
      </div>
    </div>
  );
}
