import { handleRequest, handleArrayRequest } from "@/lib/handle-request";
import type { DocumentResponseDto } from "@/types/document.type";

async function getDocumentsByClass(
  classId: number,
): Promise<DocumentResponseDto[]> {
  return handleArrayRequest<DocumentResponseDto>({
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

type CreateDocumentUploadUrlPayload = {
  class_id: number;
  file_name: string;
  contentType: string;
  size: number;
  description?: string | null;
};

type CreateDocumentUploadUrlResponse = {
  key: string;
  upload_url: string;
};

async function createDocumentUploadUrl(
  data: CreateDocumentUploadUrlPayload,
): Promise<CreateDocumentUploadUrlResponse> {
  return handleRequest<CreateDocumentUploadUrlResponse>({
    method: "POST",
    url: "/document",
    data,
  });
}

type UpdateDocumentPayload = {
  description?: string | null;
};

async function updateDocument(
  id: number,
  data: UpdateDocumentPayload,
): Promise<DocumentResponseDto> {
  return handleRequest<DocumentResponseDto>({
    method: "PATCH",
    url: `/document/${id}`,
    data,
  });
}

async function deleteDocument(id: number): Promise<DocumentResponseDto> {
  return handleRequest<DocumentResponseDto>({
    method: "DELETE",
    url: `/document/${id}`,
  });
}

type SignedDownloadAndPreviewResponse = {
  download_url: string;
  preview_url: string;
};

async function getSignedDownloadAndPreview(
  key: string,
): Promise<SignedDownloadAndPreviewResponse> {
  return handleRequest<SignedDownloadAndPreviewResponse>({
    method: "GET",
    url: `/document/by-key/${encodeURIComponent(key)}/download-and-preview`,
  });
}

export {
  getDocumentsByClass,
  getDocumentById,
  createDocumentUploadUrl,
  updateDocument,
  deleteDocument,
  getSignedDownloadAndPreview,
};
export type {
  CreateDocumentUploadUrlPayload,
  CreateDocumentUploadUrlResponse,
  UpdateDocumentPayload,
  SignedDownloadAndPreviewResponse,
};
