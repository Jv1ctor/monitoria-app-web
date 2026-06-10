import { useState } from "react";
import { toast } from "sonner";
import { enrollLesson, unenrollLesson } from "@/services/lesson.service";

function useLessonEnrollment() {
  const [isLoading, setIsLoading] = useState(false);

  async function enroll(lessonId: number) {
    setIsLoading(true);
    try {
      await enrollLesson(lessonId);
      toast.success("Inscrição realizada");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao gerenciar inscrição";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function unenroll(lessonId: number) {
    setIsLoading(true);
    try {
      await unenrollLesson(lessonId);
      toast.success("Inscrição cancelada");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao gerenciar inscrição";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { enroll, unenroll, isLoading };
}

export { useLessonEnrollment };
