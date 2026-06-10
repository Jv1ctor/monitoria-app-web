import { handleRequest } from "@/lib/handle-request";

type Major = {
  id: string;
  name: string;
  code?: string;
};

async function getMajors(): Promise<Major[]> {
  return handleRequest<Major[]>({
    method: "GET",
    url: "/major",
  });
}

export { getMajors };
export type { Major };
