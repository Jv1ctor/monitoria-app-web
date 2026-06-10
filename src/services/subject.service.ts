import { handleRequest } from "@/lib/handle-request";
import type { SubjectResponseDto } from "@/types/subject.type";

async function getSubjects(): Promise<SubjectResponseDto[]> {
  return handleRequest<SubjectResponseDto[]>({
    method: "GET",
    url: "/subject",
  });
}

async function getSubjectById(id: string): Promise<SubjectResponseDto> {
  return handleRequest<SubjectResponseDto>({
    method: "GET",
    url: `/subject/${id}`,
  });
}

export { getSubjects, getSubjectById };
