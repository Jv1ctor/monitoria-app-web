import { getMe } from "@/services/user.service";
import { getFrequenciesByStudent } from "@/services/frequencys.service";
import type { FrequencysResponseDto } from "@/types/frequencys.type";
import type { MeResponse } from "@/types/user.type";

export type StudentAttendanceLoaderResult = {
  me: MeResponse;
  frequencies: FrequencysResponseDto[];
};

export const studentAttendanceLoader = async (): Promise<StudentAttendanceLoaderResult> => {
  const me = await getMe();
  const frequencies = await getFrequenciesByStudent(me.id);
  return { me, frequencies };
};
