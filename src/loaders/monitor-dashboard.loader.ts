import { getMe } from "@/services/user.service"
import { getLessonsByClass } from "@/services/lesson.service"
import { getFrequenciesByClass } from "@/services/frequencys.service"
import type { MeResponse } from "@/types/user.type"
import type { ClassResponseDto } from "@/types/class.type"

export type UpcomingSession = {
  id: number
  modality: "REMOTE" | "INPERSON"
  date_time: string
  class_id: number
  subject_name: string
  isToday: boolean
}

export type MonitorDashboardStats = {
  totalClasses: number
  totalStudents: number
  totalLessons: number
  attendanceRate: number
}

export type MonitorDashboardLoaderResult = {
  me: MeResponse
  upcoming: UpcomingSession[]
  stats: MonitorDashboardStats
}

type ClassWithSubject = ClassResponseDto & {
  subject?: { id: number; name: string; code: string }
}

export const monitorDashboardLoader =
  async (): Promise<MonitorDashboardLoaderResult> => {
    const me = await getMe()
    const classes: ClassWithSubject[] = (me.academicProfile?.classes ?? []).map(
      (c) => ({ ...c }) as ClassWithSubject,
    )

    const perClass = await Promise.all(
      classes.map(async (c) => {
        const [lessons, frequencies] = await Promise.all([
          getLessonsByClass(c.id).catch(() => []),
          getFrequenciesByClass(c.id).catch(() => []),
        ])
        return { class: c, lessons, frequencies }
      }),
    )

    const allLessons = perClass.flatMap((p) => p.lessons)
    const allFrequencies = perClass.flatMap((p) => p.frequencies)
    const studentIds = new Set(allFrequencies.map((f) => f.student_id))
    const presentCount = allFrequencies.filter((f) => f.value === true).length

    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const upcomingRaw = allLessons.filter(
      (l) => new Date(l.date_time).getTime() >= startOfToday.getTime(),
    )

    const upcoming: UpcomingSession[] = upcomingRaw
      .map((l) => {
        const klass = classes.find((c) => c.id === l.class_id)
        const lessonDate = new Date(l.date_time)
        const today = new Date()
        const isToday =
          lessonDate.getDate() === today.getDate() &&
          lessonDate.getMonth() === today.getMonth() &&
          lessonDate.getFullYear() === today.getFullYear()
        return {
          id: l.id,
          modality: l.modality as "REMOTE" | "INPERSON",
          date_time: l.date_time,
          class_id: l.class_id,
          subject_name: klass?.code ?? `Turma ${l.class_id}`,
          isToday,
        }
      })
      .sort((a, b) => {
        if (a.isToday && !b.isToday) return -1
        if (!a.isToday && b.isToday) return 1
        return new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
      })
      .slice(0, 10)

    const stats: MonitorDashboardStats = {
      totalClasses: classes.length,
      totalStudents: studentIds.size,
      totalLessons: allLessons.length,
      attendanceRate:
        allFrequencies.length === 0 ? 0 : presentCount / allFrequencies.length,
    }

    return { me, upcoming, stats }
  }
