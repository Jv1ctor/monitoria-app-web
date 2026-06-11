import { handleRequest, handleArrayRequest } from "@/lib/handle-request";
import type { LessonResponseDto } from "@/types/lesson.type";

async function getLessonsByClass(classId: number): Promise<LessonResponseDto[]> {
  return handleArrayRequest<LessonResponseDto>({
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
  return handleArrayRequest<LessonResponseDto>({
    method: "GET",
    url: "/lesson/enrolled",
  });
}

type CreateLessonPayload = {
  modality: "REMOTE" | "INPERSON";
  date_time: string;
  description?: string;
  class_id: number;
};

async function createLesson(
  data: CreateLessonPayload,
): Promise<LessonResponseDto> {
  return handleRequest<LessonResponseDto>({
    method: "POST",
    url: "/lesson",
    data,
  });
}

type UpdateLessonPayload = {
  modality?: "REMOTE" | "INPERSON";
  date_time?: string;
  description?: string;
};

async function updateLesson(
  id: number,
  data: UpdateLessonPayload,
): Promise<LessonResponseDto> {
  return handleRequest<LessonResponseDto>({
    method: "PUT",
    url: `/lesson/${id}`,
    data,
  });
}

async function deleteLesson(id: number): Promise<LessonResponseDto> {
  return handleRequest<LessonResponseDto>({
    method: "DELETE",
    url: `/lesson/${id}`,
  });
}

export {
  getLessonsByClass,
  getLessonById,
  enrollLesson,
  unenrollLesson,
  getEnrolledLessons,
  createLesson,
  updateLesson,
  deleteLesson,
};
export type { CreateLessonPayload, UpdateLessonPayload };
