import { httpClient } from "@/lib/http-client";
import type { AxiosError, AxiosRequestConfig } from "axios";

type FieldError = {
  field: string;
  message: string;
  constraints: string[];
};

type ApiErrorData = {
  code_error: string;
  message: string;
  errors?: Array<{
    field: string;
    constraints: string[];
  }>;
};

class ApiError extends Error {
  codeError: string;
  fieldErrors: FieldError[];

  constructor(codeError: string, message: string, fieldErrors: FieldError[] = []) {
    super(message);
    this.name = "ApiError";
    this.codeError = codeError;
    this.fieldErrors = fieldErrors;
  }
}

async function handleRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await httpClient.request<T>(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorData>;
    const data = axiosError.response?.data;

    if (data) {
      const fieldErrors: FieldError[] =
        data.errors?.map((err) => {
          const constraints = err.constraints ?? [];
          return {
            field: err.field,
            message: constraints.join(" "),
            constraints,
          };
        }) ?? [];

      throw new ApiError(data.code_error, data.message, fieldErrors);
    }

    throw new ApiError("UNKNOWN", axiosError.message || "Unknown error");
  }
}

export { handleRequest, ApiError };
export type { FieldError };
