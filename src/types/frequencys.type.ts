type FrequencysResponseDto = {
  id: number;
  status: "PENDING" | "FINISHED";
  value: boolean;
  student_id: number;
  lesson_id: number;
  createdAt: string;
  unboundAt?: string;
  enrolled: boolean;
};

export type { FrequencysResponseDto };
