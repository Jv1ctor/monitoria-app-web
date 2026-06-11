import type { ZodError } from "zod";
import type { FieldError } from "@/lib/handle-request";

export const mapFieldErrors = (err: ZodError): Record<string, string> =>
  Object.fromEntries(
    err.issues.map((i) => [i.path.join("."), i.message]),
  );

export const mapApiFieldErrors = (
  fe: FieldError[],
): Record<string, string> =>
  Object.fromEntries(
    fe.map((f) => [f.field, f.constraints[0] ?? "Inválido"]),
  );
