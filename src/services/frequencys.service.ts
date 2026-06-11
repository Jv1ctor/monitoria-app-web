import { handleRequest } from "@/lib/handle-request";
import type { FrequencysResponseDto } from "@/types/frequencys.type";

async function getFrequenciesByStudent(
  studentId: number,
): Promise<FrequencysResponseDto[]> {
  return handleRequest<FrequencysResponseDto[]>({
    method: "GET",
    url: "/frequencys/by-student",
    params: { student_id: studentId },
  });
}

async function getFrequenciesByLesson(
  lessonId: number,
): Promise<FrequencysResponseDto[]> {
  return handleRequest<FrequencysResponseDto[]>({
    method: "GET",
    url: "/frequencys/by-lesson",
    params: { lesson_id: lessonId },
  });
}

async function getFrequenciesByClass(
  classId: number,
): Promise<FrequencysResponseDto[]> {
  return handleRequest<FrequencysResponseDto[]>({
    method: "GET",
    url: "/frequencys/by-class",
    params: { class_id: classId },
  });
}

async function updateFrequencyValue(
  id: number,
  value: boolean,
): Promise<FrequencysResponseDto> {
  return handleRequest<FrequencysResponseDto>({
    method: "PATCH",
    url: `/frequencys/${id}`,
    data: { value },
  });
}

export {
  getFrequenciesByStudent,
  getFrequenciesByLesson,
  getFrequenciesByClass,
  updateFrequencyValue,
};
