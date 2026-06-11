import { handleRequest } from "@/lib/handle-request";
import type { ClassResponseDto } from "@/types/class.type";

type UpdateClassInput = {
  code?: string;
  monitor_id?: number;
  subject_id?: number;
};

async function getClasses(): Promise<ClassResponseDto[]> {
  return handleRequest<ClassResponseDto[]>({
    method: "GET",
    url: "/class",
  });
}

async function getClassById(id: number): Promise<ClassResponseDto> {
  return handleRequest<ClassResponseDto>({
    method: "GET",
    url: `/class/${id}`,
  });
}

async function getClassByCode(code: string): Promise<ClassResponseDto> {
  return handleRequest<ClassResponseDto>({
    method: "GET",
    url: "/class/by-code",
    params: { code },
  });
}

async function updateClass(
  id: number,
  data: UpdateClassInput
): Promise<ClassResponseDto> {
  return handleRequest<ClassResponseDto>({
    method: "PUT",
    url: `/class/${id}`,
    data,
  });
}

async function deleteClass(id: number): Promise<void> {
  return handleRequest<void>({
    method: "DELETE",
    url: `/class/${id}`,
  });
}

async function assignMonitor(
  id: number,
  monitorId: number
): Promise<ClassResponseDto> {
  return handleRequest<ClassResponseDto>({
    method: "PUT",
    url: `/class/${id}/monitor`,
    data: { monitor_id: monitorId },
  });
}

export {
  getClasses,
  getClassById,
  getClassByCode,
  updateClass,
  deleteClass,
  assignMonitor,
};
export type { UpdateClassInput };
