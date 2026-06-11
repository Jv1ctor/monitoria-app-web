import { getMe } from "@/services/user.service";
import { getLessonsByClass } from "@/services/lesson.service";
import type { MeResponse } from "@/types/user.type";
import type { ClassResponseDto } from "@/types/class.type";
import type { LessonResponseDto } from "@/types/lesson.type";

export type LessonWithClass = LessonResponseDto & {
  class?: ClassResponseDto;
};

export type MonitorLessonsLoaderResult = {
  me: MeResponse;
  classes: ClassResponseDto[];
  lessons: LessonWithClass[];
};

export const monitorLessonsLoader =
  async (): Promise<MonitorLessonsLoaderResult> => {
    const me = await getMe();
    const classes: ClassResponseDto[] =
      (me.academicProfile?.classes as ClassResponseDto[] | undefined) ?? [];

    const perClass = await Promise.all(
      classes.map(async (c) => {
        const lessons = await getLessonsByClass(c.id).catch(() => []);
        return { class: c, lessons };
      }),
    );

    const lessons: LessonWithClass[] = perClass.flatMap((p) =>
      p.lessons.map((l) => ({ ...l, class: p.class })),
    );
    lessons.sort(
      (a, b) =>
        new Date(b.date_time).getTime() - new Date(a.date_time).getTime(),
    );

    return { me, classes, lessons };
  };
