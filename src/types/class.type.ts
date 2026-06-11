type ClassResponseDto = {
  id: number;
  code: string;
  monitor_id: number;
  subject_id: number;
  createdAt: string;
  subject?: { id: number; name: string; code: string };
  monitor?: { id: number; first_name: string; last_name: string };
};

export type { ClassResponseDto };
