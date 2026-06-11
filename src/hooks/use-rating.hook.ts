import { useState } from "react";
import { toast } from "sonner";
import { createRating } from "@/services/rating.service";
import type { CreateRatingPayload } from "@/services/rating.service";

function useRating() {
  const [isLoading, setIsLoading] = useState(false);

  async function submitRating(payload: CreateRatingPayload) {
    setIsLoading(true);
    try {
      await createRating(payload);
      toast.success("Avaliação enviada com sucesso");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao enviar avaliação";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { submitRating, isLoading };
}

export { useRating };
