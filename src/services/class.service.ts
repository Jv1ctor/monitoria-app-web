import { handleRequest } from "@/lib/handle-request";
import type { ClassResponseDto } from "@/types/class.type";

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

export { getClasses, getClassById, getClassByCode };
