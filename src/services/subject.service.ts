import { handleRequest } from "@/lib/handle-request";
import type { SubjectResponseDto } from "@/types/subject.type";

type CreateSubjectInput = {
  code: string;
  name: string;
  major_id: number;
};

type UpdateSubjectInput = Partial<CreateSubjectInput>;

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

async function createSubject(
  data: CreateSubjectInput
): Promise<SubjectResponseDto> {
  return handleRequest<SubjectResponseDto>({
    method: "POST",
    url: "/subject",
    data,
  });
}

async function updateSubject(
  id: number,
  data: UpdateSubjectInput
): Promise<SubjectResponseDto> {
  return handleRequest<SubjectResponseDto>({
    method: "PUT",
    url: `/subject/${id}`,
    data,
  });
}

async function deleteSubject(id: number): Promise<void> {
  return handleRequest<void>({
    method: "DELETE",
    url: `/subject/${id}`,
  });
}

export {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
export type { CreateSubjectInput, UpdateSubjectInput };
