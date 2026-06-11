import { getDocumentsByClass } from "@/services/document.service";
import { getClassById } from "@/services/class.service";
import { getMyRatings } from "@/services/rating.service";
import type { DocumentResponseDto } from "@/types/document.type";
import type { RatingResponseDto } from "@/types/rating.type";

export type MaterialsLoaderResult = {
  documents: DocumentResponseDto[];
  monitorId: number;
  existingRating?: RatingResponseDto;
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

  const [documents, classInfo, myRatings] = await Promise.all([
    getDocumentsByClass(classId).catch(() => [] as DocumentResponseDto[]),
    getClassById(classId),
    getMyRatings().catch(() => [] as RatingResponseDto[]),
  ]);

  const existingRating = myRatings.find(
    (r) => r.monitor_id === classInfo.monitor_id,
  );

  return { documents, monitorId: classInfo.monitor_id, existingRating };
};
