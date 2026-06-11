import { handleRequest } from "@/lib/handle-request";
import type { RatingResponseDto } from "@/types/rating.type";

type CreateRatingPayload = {
  monitor_id: number;
  rate: number;
};

async function createRating(payload: CreateRatingPayload): Promise<RatingResponseDto> {
  return handleRequest<RatingResponseDto>({
    method: "POST",
    url: "/rating",
    data: payload,
  });
}

async function getMyRatings(): Promise<RatingResponseDto[]> {
  return handleRequest<RatingResponseDto[]>({
    method: "GET",
    url: "/rating/me/ratings",
  });
}

export { createRating, getMyRatings };
export type { CreateRatingPayload };
