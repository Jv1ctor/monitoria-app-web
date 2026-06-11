import { handleRequest } from "@/lib/handle-request";
import type { MeResponse } from "@/types/user.type";

async function getMe(): Promise<MeResponse> {
  return handleRequest<MeResponse>({
    method: "GET",
    url: "/user/me",
  });
}

export { getMe };
