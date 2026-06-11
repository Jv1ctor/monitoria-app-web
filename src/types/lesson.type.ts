type LessonResponseDto = {
  id: number;
  modality: string;
  date_time: string;
  description: string | null;
  class_id: number;
  createdAt: string;
  class?: {
    id: number;
    code: string;
    subject?: { id: number; name: string };
    monitor?: { id: number; first_name: string; last_name: string };
  };
};

export type { LessonResponseDto };
