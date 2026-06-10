import { getDocumentsByClass } from "@/services/document.service";
import type { DocumentResponseDto } from "@/types/document.type";

export type MaterialsLoaderResult = {
  documents: DocumentResponseDto[];
};

export const materialsLoader = async ({
  params,
}: {
  params: { id?: string };
}): Promise<MaterialsLoaderResult> => {
  const classId = Number(params.id);
  if (Number.isNaN(classId)) {
    throw new Error("ID da turma inválido.");
  }

  const documents = await getDocumentsByClass(classId);
  return { documents };
};
