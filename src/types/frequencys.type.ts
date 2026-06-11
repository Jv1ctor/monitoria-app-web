type FrequencysResponseDto = {
  id: number;
  status: "PENDING" | "FINISHED";
  value: boolean;
  student_id: number;
  lesson_id: number;
  createdAt: string;
  unboundAt?: string;
  enrolled: boolean;
  student?: {
    id: number;
    first_name: string;
    last_name: string;
    registration: string;
  };
  lesson?: {
    id: number;
    modality: string;
    date_time: string;
    description: string | null;
    class_id: number;
    createdAt: string;
    class?: { id: number; code: string; subject?: { id: number; name: string }; monitor?: { id: number; first_name: string; last_name: string } };
  };
};

export type { FrequencysResponseDto };
