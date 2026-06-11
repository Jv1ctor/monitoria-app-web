type DocumentResponseDto = {
  id: number;
  key: string;
  filename: string;
  mime_type: string;
  size: number;
  description: string | null;
  class_id: number;
  createdAt: string;
};

export type { DocumentResponseDto };
