import { handleRequest } from "@/lib/handle-request";
import type { FrequencysResponseDto } from "@/types/frequencys.type";

async function getFrequenciesByStudent(studentId: number): Promise<FrequencysResponseDto[]> {
  return handleRequest<FrequencysResponseDto[]>({
    method: "GET",
    url: "/frequencys/by-student",
    params: { student_id: studentId },
  });
}

export { getFrequenciesByStudent };
