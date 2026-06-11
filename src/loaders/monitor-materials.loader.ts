import { getMe } from "@/services/user.service";
import { getDocumentsByClass } from "@/services/document.service";
import type { MeResponse } from "@/types/user.type";
import type { ClassResponseDto } from "@/types/class.type";
import type { DocumentResponseDto } from "@/types/document.type";

export type MonitorMaterialsLoaderResult = {
  me: MeResponse;
  classes: ClassResponseDto[];
  documentsByClass: Record<number, DocumentResponseDto[]>;
};

export const monitorMaterialsLoader =
  async (): Promise<MonitorMaterialsLoaderResult> => {
    const me = await getMe();
    const classes: ClassResponseDto[] =
      (me.academicProfile?.classes as ClassResponseDto[] | undefined) ?? [];

    const results = await Promise.all(
      classes.map(async (c) => {
        const documents = await getDocumentsByClass(c.id).catch(() => []);
        return { class_id: c.id, documents };
      }),
    );

    const documentsByClass: Record<number, DocumentResponseDto[]> = {};
    for (const r of results) {
      documentsByClass[r.class_id] = r.documents;
    }

    return { me, classes, documentsByClass };
  };
