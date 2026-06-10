import { handleRequest } from "@/lib/handle-request";
import type { DocumentResponseDto } from "@/types/document.type";

async function getDocumentsByClass(classId: number): Promise<DocumentResponseDto[]> {
  return handleRequest<DocumentResponseDto[]>({
    method: "GET",
    url: "/document",
    params: { class_id: classId },
  });
}

async function getDocumentById(id: number): Promise<DocumentResponseDto> {
  return handleRequest<DocumentResponseDto>({
    method: "GET",
    url: `/document/${id}`,
  });
}

export { getDocumentsByClass, getDocumentById };
