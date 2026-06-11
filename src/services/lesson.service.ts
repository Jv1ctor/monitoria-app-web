import { handleRequest } from "@/lib/handle-request";
import type { LessonResponseDto } from "@/types/lesson.type";

async function getLessonsByClass(classId: number): Promise<LessonResponseDto[]> {
  return handleRequest<LessonResponseDto[]>({
    method: "GET",
    url: "/lesson/by-class",
    params: { class_id: classId },
  });
}

async function getLessonById(id: number): Promise<LessonResponseDto> {
  return handleRequest<LessonResponseDto>({
    method: "GET",
    url: `/lesson/${id}`,
  });
}

async function enrollLesson(id: number): Promise<void> {
  return handleRequest<void>({
    method: "POST",
    url: `/lesson/${id}/enroll`,
  });
}

async function unenrollLesson(id: number): Promise<void> {
  return handleRequest<void>({
    method: "DELETE",
    url: `/lesson/${id}/enroll`,
  });
}

async function getEnrolledLessons(): Promise<LessonResponseDto[]> {
  return handleRequest<LessonResponseDto[]>({
    method: "GET",
    url: "/lesson/enrolled",
  });
}

export { getLessonsByClass, getLessonById, enrollLesson, unenrollLesson, getEnrolledLessons };
