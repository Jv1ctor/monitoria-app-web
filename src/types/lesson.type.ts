type LessonResponseDto = {
  id: number;
  modality: string;
  date_time: string;
  description: string | null;
  class_id: number;
  createdAt: string;
};

export type { LessonResponseDto };
