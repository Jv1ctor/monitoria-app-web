type AcademicProfile = {
  major?: {
    id: number;
    name: string;
  };
  classes?: {
    id: number;
    code: string;
    subject_id: number;
  }[];
};

type MeResponse = {
  id: number;
  registration: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  createdAt: string;
  academicProfile?: AcademicProfile;
};

export type { MeResponse, AcademicProfile };
