type Role = {
  role: "student" | "monitor" | "admin";
};

type UserJWT = {
  userId: number;
  firstName: string;
  lastName: string;
  registration: string;
  email: string;
  roles: Role[];
};

type AuthResponse = {
  token: string;
};

type RegisterResponse = {
  id: string;
  firstName: string;
  lastName: string;
  registration: string;
  email: string;
  courseId: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthRequestResult = {
  success: boolean;
  accessToken?: string;
  errorMessage?: string;
  fieldErrors?: Array<{ field: string; message: string; constraints: string[] }>;
};

export type {
  UserJWT,
  AuthResponse,
  RegisterResponse,
  LoginPayload,
  AuthRequestResult,
};
